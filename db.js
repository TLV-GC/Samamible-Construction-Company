// db.js
// Opens (and creates, on first run) a local SQLite database file and
// defines the full schema for the site. SQLite is used here because a
// national contractor site of this size does not need a separate
// database server to run reliably; swap this file for a Postgres/MySQL
// connection later if you outgrow it, without touching the routes.

const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, "samamiable.db");
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    phone         TEXT,
    company       TEXT,
    password_hash TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS client_projects (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name           TEXT NOT NULL,
    type           TEXT,
    status         TEXT NOT NULL DEFAULT 'Planning' CHECK (status IN ('Planning', 'In progress', 'Completed')),
    progress        INTEGER NOT NULL DEFAULT 0,
    location       TEXT,
    next_milestone TEXT,
    last_update    TEXT,
    updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
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
    is_sample   INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS project_stages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id  TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    position    INTEGER NOT NULL DEFAULT 0,
    title       TEXT NOT NULL,
    description TEXT,
    image_url   TEXT
  );

  CREATE TABLE IF NOT EXISTS project_reviews (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    author     TEXT NOT NULL,
    role       TEXT,
    rating     INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    quote      TEXT
  );

  CREATE TABLE IF NOT EXISTS quotes (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT NOT NULL,
    service      TEXT,
    client_type  TEXT,
    state        TEXT,
    budget       TEXT,
    details      TEXT,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS applications (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title    TEXT,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT NOT NULL,
    message      TEXT,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    email        TEXT NOT NULL,
    phone        TEXT,
    message      TEXT NOT NULL,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = db;
