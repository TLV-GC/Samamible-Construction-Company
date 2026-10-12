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
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY, value TEXT
    );
    CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY, title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'closed' CHECK (status IN ('open','closed')),
      department TEXT, location TEXT, type TEXT, description TEXT, position INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY, title TEXT NOT NULL, category TEXT, post_date TEXT, excerpt TEXT, body TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
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

async function seedJobs() {
  const existing = await pool.query("SELECT id FROM jobs LIMIT 1");
  if (existing.rows.length) {
    console.log("Jobs already seeded, skipping.");
    return;
  }

  const jobs = [
    ["Investor", "open", "Investment & Partnerships", "Nationwide", "Partnership", "We're open to investment partners interested in funding upcoming general contracting, real estate, and borehole drilling projects. Get in touch to discuss opportunities and terms."],
    ["Civil Engineer", "closed", "Engineering & Design", "Lagos", "Full-time", "Design and oversee civil works including foundations, drainage, and site infrastructure."],
    ["Structural Engineer", "closed", "Engineering & Design", "Lagos", "Full-time", "Produce structural designs and calculations, and review them against site conditions during construction."],
    ["Architect", "closed", "Engineering & Design", "Lagos", "Full-time", "Develop architectural drawings and concepts for residential, commercial, and government projects."],
    ["Electrical Engineer (M&E)", "closed", "Engineering & Design", "Rivers", "Full-time", "Design and supervise electrical installations across active building projects."],
    ["Mechanical Engineer (M&E)", "closed", "Engineering & Design", "Rivers", "Full-time", "Design and supervise mechanical systems including HVAC and plumbing infrastructure."],
    ["Project Manager", "closed", "Project Management", "Lagos", "Full-time", "Coordinate schedules, budgets, and teams across a portfolio of active construction sites."],
    ["Quantity Surveyor", "closed", "Project Management", "Rivers", "Contract", "Prepare cost estimates, manage tender documentation, and track project budgets against actuals."],
    ["Land Surveyor", "closed", "Project Management", "Abuja (FCT)", "Contract", "Carry out site and land surveys to support project planning and documentation."],
    ["Cost Estimator", "closed", "Project Management", "Lagos", "Full-time", "Develop detailed cost estimates for new projects during the bidding and planning stages."],
    ["Site Engineer", "closed", "Site & Trades", "Lagos", "Full-time", "Oversee day-to-day site works, supervise subcontractors, and enforce quality and safety standards on active builds."],
    ["Site Supervisor / Foreman", "closed", "Site & Trades", "Oyo", "Full-time", "Manage daily labour, materials, and progress tracking on site."],
    ["Mason / Bricklayer", "closed", "Site & Trades", "Lagos", "Full-time", "Carry out block work, plastering, and finishing on residential and commercial sites."],
    ["Carpenter", "closed", "Site & Trades", "Lagos", "Full-time", "Construct formwork, roofing structures, and finishing carpentry across active builds."],
    ["Steel Fixer / Welder", "closed", "Site & Trades", "Rivers", "Full-time", "Fix reinforcement steel and carry out structural welding on site."],
    ["Plumber", "closed", "Site & Trades", "Lagos", "Full-time", "Install and maintain plumbing systems across residential and commercial projects."],
    ["Crane Operator", "closed", "Site & Trades", "Rivers", "Full-time", "Operate lifting equipment safely across active construction sites."],
    ["Drilling Rig Operator", "closed", "Borehole Drilling", "Abuja (FCT)", "Full-time", "Operate drilling rigs on residential, estate, and industrial borehole projects across the North Central region."],
    ["Health & Safety Officer", "closed", "Safety & Compliance", "Lagos", "Full-time", "Maintain safety compliance across all active sites and lead incident reporting and prevention."],
    ["Security Officer", "closed", "Safety & Compliance", "Lagos", "Full-time", "Provide site security and access control across company premises and active sites."],
    ["Property Sales Executive", "closed", "Real Estate & Property Services", "Lagos", "Full-time", "Manage client relationships for property sales and acquisitions, from first inquiry through documentation."],
    ["Procurement Officer", "closed", "Corporate & Admin", "Lagos", "Full-time", "Source and purchase materials and equipment for active projects."],
    ["Logistics Officer / Driver", "closed", "Corporate & Admin", "Lagos", "Full-time", "Coordinate transport of materials, equipment, and staff between sites."],
    ["Human Resources Officer", "closed", "Corporate & Admin", "Lagos", "Full-time", "Manage recruitment, staff welfare, and HR administration across the company."],
    ["Accountant", "closed", "Corporate & Admin", "Lagos", "Full-time", "Manage company accounts, project cost tracking, and financial reporting."],
    ["IT Placement (Intern)", "closed", "Corporate & Admin", "Lagos", "Internship", "Support the company's IT systems and infrastructure as part of an internship placement."],
  ];

  for (let i = 0; i < jobs.length; i++) {
    const [title, status, department, location, type, description] = jobs[i];
    await pool.query(
      "INSERT INTO jobs (title, status, department, location, type, description, position) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [title, status, department, location, type, description, i]
    );
  }
  console.log(`Seeded ${jobs.length} job listings.`);
}

async function seedBlogPosts() {
  const existing = await pool.query("SELECT id FROM blog_posts LIMIT 1");
  if (existing.rows.length) {
    console.log("Blog posts already seeded, skipping.");
    return;
  }

  const posts = [
    [
      "What a geophysical survey actually tells you before drilling",
      "Borehole Drilling", "August 2026",
      "Before any rig touches the ground, a survey maps what's beneath your site, and why skipping it is the most common cause of a dry or low-yield borehole.",
      "A geophysical survey uses electrical resistivity readings to map soil and rock layers beneath a site before drilling begins. It tells our team where water-bearing layers are likely to sit, how deep they run, and how consistent the yield is likely to be.\n\nSkipping this step is the single most common reason a borehole underperforms. A rig can reach depth and still miss the aquifer by a few metres, which is a costly mistake to fix after the fact.\n\nOn every project, we run the survey first, share the findings with the client in plain terms, and only then agree on a drilling plan and depth target.",
    ],
    [
      "Land documentation checklist before you build",
      "Real Estate", "July 2026",
      "A survey plan and a deed are not enough on their own. Here is what we check before recommending a client proceeds to construction.",
      "Nigerian land transactions carry real documentation risk, and construction should never start on a title that has not been verified. We check the survey plan, the deed of assignment, governor's consent status, and any encumbrance history at the relevant lands registry.\n\nWhere a title is incomplete, we advise clients on the realistic path and timeline to regularise it rather than building on uncertain ground, literally.",
    ],
    [
      "Reading a construction progress report as a client",
      "General Contracting", "June 2026",
      "Percentage complete alone does not tell the full story. Here is what to actually look for in your project updates.",
      "A progress percentage is a useful summary, but it can hide uneven risk. A project reported at 60% complete might have finished all the easy, fast-moving work and be approaching a slower, higher-risk phase like roofing or M&E installation.\n\nThat is why our client portal pairs a progress figure with a plain-language note on what was completed, what is next, and any blockers, updated as the project moves.",
    ],
    [
      "Why we run three service lines under one company",
      "Company News", "May 2026",
      "General contracting, real estate, and borehole drilling look like three businesses. On the ground, they solve one problem for the same client.",
      "Most clients building a home or a facility do not need just a contractor. They need land verified, water secured, and a structure built, often in that order, often with the same people accountable throughout.\n\nOperating all three under Samamiable Construction Company, as part of Samamiable Concerns, means one point of accountability instead of three separate vendors who each blame the others when something slips.",
    ],
  ];

  for (const [title, category, postDate, excerpt, body] of posts) {
    await pool.query(
      "INSERT INTO blog_posts (title, category, post_date, excerpt, body) VALUES ($1,$2,$3,$4,$5)",
      [title, category, postDate, excerpt, body]
    );
  }
  console.log(`Seeded ${posts.length} blog posts.`);
}

(async () => {
  await initDb();
  await seedAdmin();
  await seedSampleProject();
  await seedJobs();
  await seedBlogPosts();
  await pool.end();
})();
