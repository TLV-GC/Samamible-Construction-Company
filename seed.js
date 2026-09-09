// seed.js
// Run once (npm run seed) to create the admin account and load the
// sample portfolio project. Safe to re-run: it skips anything that
// already exists. Deliberately standalone (its own DB connection) so it
// doesn't need to import anything from index.js.
require("dotenv").config();
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and paste in your connection string.");
}
const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
const pool = new Pool({ connectionString, ssl: isLocal ? false : { rejectUnauthorized: false } });

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT, company TEXT,
      password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client','admin')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY, title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning','Ongoing','Completed')),
      sector TEXT, service TEXT, location TEXT, year TEXT, description TEXT, is_sample BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS project_stages (
      id SERIAL PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0, title TEXT NOT NULL, description TEXT, image_url TEXT
    );
    CREATE TABLE IF NOT EXISTS project_reviews (
      id SERIAL PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      author TEXT NOT NULL, role TEXT, rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5), quote TEXT
    );
    CREATE TABLE IF NOT EXISTS client_projects (
      id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, name TEXT NOT NULL,
      type TEXT, status TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning','In progress','Completed')),
      progress INTEGER NOT NULL DEFAULT 0, location TEXT, next_milestone TEXT, last_update TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, service TEXT,
      client_type TEXT, state TEXT, budget TEXT, details TEXT, submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY, job_title TEXT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL,
      message TEXT, submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@samamiableconstruction.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPassword123!";
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length) { console.log(`Admin account already exists (${email}), skipping.`); return; }
  const passwordHash = await bcrypt.hash(password, 12);
  await pool.query("INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,'admin')", ["Site Admin", email, passwordHash]);
  console.log(`Admin account created: ${email} / ${password}`);
  console.log("Log in once, then change this password immediately.");
}

async function seedSampleProject() {
  const existing = await pool.query("SELECT id FROM projects WHERE id = $1", ["sample-1"]);
  if (existing.rows.length) { console.log("Sample portfolio project already exists, skipping."); return; }

  await pool.query(
    `INSERT INTO projects (id, title, status, sector, service, location, year, description, is_sample) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,true)`,
    ["sample-1", "Sample Project \u2014 Ikoyi Waterfront Residence", "Completed", "Residential", "contracting", "Ikoyi, Lagos", "2025",
     "A full-scope build of a 5-bedroom waterfront residence. This is a sample case study \u2014 replace it with a real project from the admin dashboard."]
  );

  const stages = [
    ["Site preparation & survey", "Land clearing, soil testing, and geotechnical survey to confirm the foundation design."],
    ["Foundation & substructure", "Excavation, reinforcement, and pouring of the foundation to the specified depth."],
    ["Structural framing", "Columns, beams, and slab construction carried up to roof level."],
    ["Roofing & envelope", "Roof structure, covering, and the external wall envelope completed."],
    ["Interior finishing", "Plumbing, electrical, plastering, tiling, and fittings installed throughout."],
    ["Handover", "Final inspection, snag list clearance, and formal handover to the client."],
  ];
  for (let i = 0; i < stages.length; i++) {
    await pool.query("INSERT INTO project_stages (project_id, position, title, description) VALUES ($1,$2,$3,$4)", ["sample-1", i, stages[i][0], stages[i][1]]);
  }
  await pool.query("INSERT INTO project_reviews (project_id, author, role, rating, quote) VALUES ($1,$2,$3,$4,$5)",
    ["sample-1", "A. Balogun", "Homeowner", 5, "Sample review placeholder \u2014 replace with real client feedback once available."]);
  await pool.query("INSERT INTO project_reviews (project_id, author, role, rating, quote) VALUES ($1,$2,$3,$4,$5)",
    ["sample-1", "T. Eze", "Project Sponsor", 4, "Sample review placeholder \u2014 edit this from the admin dashboard."]);

  console.log("Sample portfolio project seeded.");
}

(async () => {
  await initDb();
  await seedAdmin();
  await seedSampleProject();
  await pool.end();
})();
