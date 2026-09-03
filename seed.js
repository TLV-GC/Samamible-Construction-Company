// seed.js
// Run once after first install (npm run seed) to create the admin
// account and load the sample portfolio project. Safe to re-run: it
// skips anything that already exists.
require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("./db");

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@samamiableconstruction.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPassword123!";

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    console.log(`Admin account already exists (${email}), skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  db.prepare(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')"
  ).run("Site Admin", email, passwordHash);

  console.log(`Admin account created: ${email} / ${password}`);
  console.log("Log in once, then change this password immediately.");
}

function seedSampleProject() {
  const existing = db.prepare("SELECT id FROM projects WHERE id = ?").get("sample-1");
  if (existing) {
    console.log("Sample portfolio project already exists, skipping.");
    return;
  }

  db.prepare(
    `INSERT INTO projects (id, title, status, sector, service, location, year, description, is_sample)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`
  ).run(
    "sample-1",
    "Sample Project \u2014 Ikoyi Waterfront Residence",
    "Completed",
    "Residential",
    "contracting",
    "Ikoyi, Lagos",
    "2025",
    "A full-scope build of a 5-bedroom waterfront residence. This is a sample case study \u2014 replace it with a real project from the admin dashboard."
  );

  const stages = [
    ["Site preparation & survey", "Land clearing, soil testing, and geotechnical survey to confirm the foundation design."],
    ["Foundation & substructure", "Excavation, reinforcement, and pouring of the foundation to the specified depth."],
    ["Structural framing", "Columns, beams, and slab construction carried up to roof level."],
    ["Roofing & envelope", "Roof structure, covering, and the external wall envelope completed."],
    ["Interior finishing", "Plumbing, electrical, plastering, tiling, and fittings installed throughout."],
    ["Handover", "Final inspection, snag list clearance, and formal handover to the client."],
  ];
  const insertStage = db.prepare(
    "INSERT INTO project_stages (project_id, position, title, description) VALUES (?, ?, ?, ?)"
  );
  stages.forEach(([title, description], i) => insertStage.run("sample-1", i, title, description));

  const insertReview = db.prepare(
    "INSERT INTO project_reviews (project_id, author, role, rating, quote) VALUES (?, ?, ?, ?, ?)"
  );
  insertReview.run("sample-1", "A. Balogun", "Homeowner", 5, "Sample review placeholder \u2014 replace with real client feedback once available.");
  insertReview.run("sample-1", "T. Eze", "Project Sponsor", 4, "Sample review placeholder \u2014 edit this from the admin dashboard.");

  console.log("Sample portfolio project seeded.");
}

(async () => {
  await seedAdmin();
  seedSampleProject();
  process.exit(0);
})();
