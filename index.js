// index.js
// The entire backend in one file: database connection + schema, auth
// helpers, and every route. Combined into a single file (instead of the
// more typical multi-file/folder layout) specifically so this can be
// pasted straight into GitHub's web editor with zero folder setup.
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ---------------------------------------------------------------- CONFIG */

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Set it in your hosting platform's environment variables.");
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Set it in your hosting platform's environment variables.");
}

const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
const pool = new Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

/* ------------------------------------------------------------------- DB */

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      name          TEXT NOT NULL,
      email         TEXT NOT NULL UNIQUE,
      phone         TEXT,
      company       TEXT,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS client_projects (
      id             SERIAL PRIMARY KEY,
      user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name           TEXT NOT NULL,
      type           TEXT,
      status         TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning', 'In progress', 'Completed')),
      progress       INTEGER NOT NULL DEFAULT 0,
      location       TEXT,
      next_milestone TEXT,
      last_update    TEXT,
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS projects (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning', 'Ongoing', 'Completed')),
      sector      TEXT,
      service     TEXT,
      location    TEXT,
      year        TEXT,
      description TEXT,
      is_sample   BOOLEAN NOT NULL DEFAULT false,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS project_stages (
      id          SERIAL PRIMARY KEY,
      project_id  TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      position    INTEGER NOT NULL DEFAULT 0,
      title       TEXT NOT NULL,
      description TEXT,
      image_url   TEXT
    );

    CREATE TABLE IF NOT EXISTS project_reviews (
      id         SERIAL PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      author     TEXT NOT NULL,
      role       TEXT,
      rating     INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
      quote      TEXT
    );

    CREATE TABLE IF NOT EXISTS quotes (
      id           SERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      phone        TEXT NOT NULL,
      service      TEXT,
      client_type  TEXT,
      state        TEXT,
      budget       TEXT,
      details      TEXT,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS applications (
      id           SERIAL PRIMARY KEY,
      job_title    TEXT,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      phone        TEXT NOT NULL,
      message      TEXT,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS messages (
      id           SERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      phone        TEXT,
      message      TEXT NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

/* ---------------------------------------------------------------- AUTH */

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
}

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") return res.status(403).json({ error: "Admin access required." });
  next();
}

function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email, phone: row.phone, company: row.company, role: row.role };
}

/* --------------------------------------------------------------- APP */

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "samamiable-construction-backend" }));

/* ---- auth ---- */

app.post("/api/auth/signup", async (req, res, next) => {
  try {
    const { name, email, phone, company, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: "Name, email, and password are required." });
    if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters." });

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
    if (existing.rows.length) return res.status(409).json({ error: "An account with this email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (name, email, phone, company, password_hash, role) VALUES ($1,$2,$3,$4,$5,'client') RETURNING *`,
      [name, normalizedEmail, phone || null, company || null, passwordHash]
    );
    const user = result.rows[0];
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) { next(err); }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
    const normalizedEmail = String(email).trim().toLowerCase();
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
    const user = result.rows[0];
    const hashToCompare = user ? user.password_hash : "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinv";
    const valid = await bcrypt.compare(password, hashToCompare);
    if (!user || !valid) return res.status(401).json({ error: "Email or password is incorrect." });
    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) { next(err); }
});

/* ---- portfolio projects ---- */

async function getFullProject(id) {
  const projectRes = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  const project = projectRes.rows[0];
  if (!project) return null;
  const stagesRes = await pool.query(
    `SELECT title, description, image_url AS "imageUrl" FROM project_stages WHERE project_id = $1 ORDER BY position ASC`,
    [id]
  );
  const reviewsRes = await pool.query("SELECT author, role, rating, quote FROM project_reviews WHERE project_id = $1", [id]);
  return { ...project, isSample: !!project.is_sample, stages: stagesRes.rows, reviews: reviewsRes.rows };
}

async function upsertStagesAndReviews(client, projectId, stages, reviews) {
  await client.query("DELETE FROM project_stages WHERE project_id = $1", [projectId]);
  await client.query("DELETE FROM project_reviews WHERE project_id = $1", [projectId]);
  let position = 0;
  for (const s of stages || []) {
    await client.query(
      "INSERT INTO project_stages (project_id, position, title, description, image_url) VALUES ($1,$2,$3,$4,$5)",
      [projectId, position, s.title || "", s.description || "", s.imageUrl || null]
    );
    position += 1;
  }
  for (const r of reviews || []) {
    await client.query(
      "INSERT INTO project_reviews (project_id, author, role, rating, quote) VALUES ($1,$2,$3,$4,$5)",
      [projectId, r.author || "", r.role || "", Number(r.rating) || 5, r.quote || ""]
    );
  }
}

app.get("/api/projects", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT id FROM projects ORDER BY created_at DESC");
    res.json(await Promise.all(result.rows.map((r) => getFullProject(r.id))));
  } catch (err) { next(err); }
});

app.get("/api/projects/:id", async (req, res, next) => {
  try {
    const project = await getFullProject(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch (err) { next(err); }
});

app.post("/api/projects", authenticate, requireAdmin, async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { id, title, status, sector, service, location, year, description, stages, reviews } = req.body || {};
    if (!id || !title || !location) return res.status(400).json({ error: "id, title, and location are required." });
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO projects (id, title, status, sector, service, location, year, description, is_sample) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,false)`,
      [id, title, status || "Planning", sector || null, service || null, location, year || null, description || null]
    );
    await upsertStagesAndReviews(client, id, stages, reviews);
    await client.query("COMMIT");
    res.status(201).json(await getFullProject(id));
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    next(err);
  } finally { client.release(); }
});

app.put("/api/projects/:id", authenticate, requireAdmin, async (req, res, next) => {
  const client = await pool.connect();
  try {
    const existing = await client.query("SELECT id FROM projects WHERE id = $1", [req.params.id]);
    if (!existing.rows.length) return res.status(404).json({ error: "Project not found." });
    const { title, status, sector, service, location, year, description, stages, reviews } = req.body || {};
    await client.query("BEGIN");
    await client.query(
      `UPDATE projects SET title=$1, status=$2, sector=$3, service=$4, location=$5, year=$6, description=$7, updated_at=now() WHERE id=$8`,
      [title, status, sector, service, location, year, description, req.params.id]
    );
    await upsertStagesAndReviews(client, req.params.id, stages, reviews);
    await client.query("COMMIT");
    res.json(await getFullProject(req.params.id));
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    next(err);
  } finally { client.release(); }
});

app.delete("/api/projects/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const result = await pool.query("DELETE FROM projects WHERE id = $1", [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Project not found." });
    res.status(204).send();
  } catch (err) { next(err); }
});

/* ---- client portal + public inquiry forms ---- */

app.get("/api/portal/projects", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "client") return res.status(403).json({ error: "Client account required." });
    const result = await pool.query("SELECT * FROM client_projects WHERE user_id = $1 ORDER BY updated_at DESC", [req.user.id]);
    res.json(result.rows);
  } catch (err) { next(err); }
});

app.post("/api/portal/clients/:userId/projects", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, type, status, progress, location, nextMilestone, lastUpdate } = req.body || {};
    if (!name) return res.status(400).json({ error: "Project name is required." });
    const result = await pool.query(
      `INSERT INTO client_projects (user_id, name, type, status, progress, location, next_milestone, last_update) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [req.params.userId, name, type || null, status || "Planning", progress || 0, location || null, nextMilestone || null, lastUpdate || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
});

app.put("/api/portal/client-projects/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, type, status, progress, location, nextMilestone, lastUpdate } = req.body || {};
    const result = await pool.query(
      `UPDATE client_projects SET name=$1, type=$2, status=$3, progress=$4, location=$5, next_milestone=$6, last_update=$7, updated_at=now() WHERE id=$8 RETURNING *`,
      [name, type, status, progress, location, nextMilestone, lastUpdate, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Client project not found." });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

app.post("/api/portal/quotes", async (req, res, next) => {
  try {
    const { name, email, phone, service, clientType, state, budget, details } = req.body || {};
    if (!name || !email || !phone || !service || !details) return res.status(400).json({ error: "Name, email, phone, service, and details are required." });
    await pool.query(
      `INSERT INTO quotes (name, email, phone, service, client_type, state, budget, details) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [name, email, phone, service, clientType || null, state || null, budget || null, details]
    );
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
});

app.post("/api/portal/applications", async (req, res, next) => {
  try {
    const { job, name, email, phone, message } = req.body || {};
    if (!name || !email || !phone) return res.status(400).json({ error: "Name, email, and phone are required." });
    await pool.query("INSERT INTO applications (job_title, name, email, phone, message) VALUES ($1,$2,$3,$4,$5)", [job || null, name, email, phone, message || null]);
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
});

app.post("/api/portal/messages", async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: "Name, email, and message are required." });
    await pool.query("INSERT INTO messages (name, email, phone, message) VALUES ($1,$2,$3,$4)", [name, email, phone || null, message]);
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
});

app.get("/api/portal/quotes", authenticate, requireAdmin, async (req, res, next) => {
  try { res.json((await pool.query("SELECT * FROM quotes ORDER BY submitted_at DESC")).rows); } catch (err) { next(err); }
});
app.get("/api/portal/applications", authenticate, requireAdmin, async (req, res, next) => {
  try { res.json((await pool.query("SELECT * FROM applications ORDER BY submitted_at DESC")).rows); } catch (err) { next(err); }
});
app.get("/api/portal/messages", authenticate, requireAdmin, async (req, res, next) => {
  try { res.json((await pool.query("SELECT * FROM messages ORDER BY submitted_at DESC")).rows); } catch (err) { next(err); }
});

/* ---- error handler + startup ---- */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on our end. Please try again." });
});

const PORT = process.env.PORT || 4000;
initDb()
  .then(() => app.listen(PORT, () => console.log(`Samamiable Construction backend listening on port ${PORT}`)))
  .catch((err) => { console.error("Failed to set up the database:", err.message); process.exit(1); });
