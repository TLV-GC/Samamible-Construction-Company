import React, { useState, useEffect, useRef } from "react";
import {
  Building2, Droplet, KeyRound, MapPin, Phone, Mail, CheckCircle2,
  Menu, X, User, LogOut, ClipboardList, Briefcase, Newspaper,
  ShieldCheck, Award, Users, Loader2, Lock, ChevronRight, ChevronLeft,
  Star, Plus, Trash2, Pencil, LayoutDashboard, Inbox, RefreshCw,
  HardHat, Layers, Hammer, PaintBucket, Key, FileSearch, ArrowLeft, ImagePlus,
} from "lucide-react";

/* ---------------------------------------------------------------- LOGO */

const LOGO_SMALL = "data:image/jpeg;base64,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";

/* ---------------------------------------------------------------- DATA */

const SERVICES = [
  {
    id: "contracting",
    name: "General Contracting",
    icon: Building2,
    summary: "End-to-end construction management for residential, commercial, and public-sector builds, from groundbreaking to handover.",
    points: ["Site preparation & structural works", "Project & construction management", "Renovations and fit-outs", "Civil & infrastructure works"],
  },
  {
    id: "realestate",
    name: "Real Estate & Property Services",
    icon: KeyRound,
    summary: "Property sourcing, sales, and management for clients building, buying, or letting property across Nigeria.",
    points: ["Property sales & acquisition", "Land documentation support", "Property management", "Development consulting"],
  },
  {
    id: "borehole",
    name: "Borehole Drilling & Water Systems",
    icon: Droplet,
    summary: "Reliable water access for homes, estates, and industrial sites, from survey through drilling and maintenance.",
    points: ["Geophysical site survey", "Borehole drilling & casing", "Pump installation & plumbing tie-in", "Maintenance contracts"],
  },
];

const STATS = [
  { value: "5", label: "States covered nationwide" },
  { value: "About 10", label: "Projects delivered" },
  { value: "3", label: "Service lines under one roof" },
];

const JOBS = [
  { id: 1, title: "Investor", status: "open", department: "Investment & Partnerships", location: "Nationwide", type: "Partnership", description: "We're open to investment partners interested in funding upcoming general contracting, real estate, and borehole drilling projects. Get in touch to discuss opportunities and terms." },
  { id: 2, title: "Civil Engineer", status: "closed", department: "Engineering & Design", location: "Lagos", type: "Full-time", description: "Design and oversee civil works including foundations, drainage, and site infrastructure." },
  { id: 3, title: "Structural Engineer", status: "closed", department: "Engineering & Design", location: "Lagos", type: "Full-time", description: "Produce structural designs and calculations, and review them against site conditions during construction." },
  { id: 4, title: "Architect", status: "closed", department: "Engineering & Design", location: "Lagos", type: "Full-time", description: "Develop architectural drawings and concepts for residential, commercial, and government projects." },
  { id: 5, title: "Electrical Engineer (M&E)", status: "closed", department: "Engineering & Design", location: "Rivers", type: "Full-time", description: "Design and supervise electrical installations across active building projects." },
  { id: 6, title: "Mechanical Engineer (M&E)", status: "closed", department: "Engineering & Design", location: "Rivers", type: "Full-time", description: "Design and supervise mechanical systems including HVAC and plumbing infrastructure." },
  { id: 7, title: "Project Manager", status: "closed", department: "Project Management", location: "Lagos", type: "Full-time", description: "Coordinate schedules, budgets, and teams across a portfolio of active construction sites." },
  { id: 8, title: "Quantity Surveyor", status: "closed", department: "Project Management", location: "Rivers", type: "Contract", description: "Prepare cost estimates, manage tender documentation, and track project budgets against actuals." },
  { id: 9, title: "Land Surveyor", status: "closed", department: "Project Management", location: "Abuja (FCT)", type: "Contract", description: "Carry out site and land surveys to support project planning and documentation." },
  { id: 10, title: "Cost Estimator", status: "closed", department: "Project Management", location: "Lagos", type: "Full-time", description: "Develop detailed cost estimates for new projects during the bidding and planning stages." },
  { id: 11, title: "Site Engineer", status: "closed", department: "Site & Trades", location: "Lagos", type: "Full-time", description: "Oversee day-to-day site works, supervise subcontractors, and enforce quality and safety standards on active builds." },
  { id: 12, title: "Site Supervisor / Foreman", status: "closed", department: "Site & Trades", location: "Oyo", type: "Full-time", description: "Manage daily labour, materials, and progress tracking on site." },
  { id: 13, title: "Mason / Bricklayer", status: "closed", department: "Site & Trades", location: "Lagos", type: "Full-time", description: "Carry out block work, plastering, and finishing on residential and commercial sites." },
  { id: 14, title: "Carpenter", status: "closed", department: "Site & Trades", location: "Lagos", type: "Full-time", description: "Construct formwork, roofing structures, and finishing carpentry across active builds." },
  { id: 15, title: "Steel Fixer / Welder", status: "closed", department: "Site & Trades", location: "Rivers", type: "Full-time", description: "Fix reinforcement steel and carry out structural welding on site." },
  { id: 16, title: "Plumber", status: "closed", department: "Site & Trades", location: "Lagos", type: "Full-time", description: "Install and maintain plumbing systems across residential and commercial projects." },
  { id: 17, title: "Crane Operator", status: "closed", department: "Site & Trades", location: "Rivers", type: "Full-time", description: "Operate lifting equipment safely across active construction sites." },
  { id: 18, title: "Drilling Rig Operator", status: "closed", department: "Borehole Drilling", location: "Abuja (FCT)", type: "Full-time", description: "Operate drilling rigs on residential, estate, and industrial borehole projects across the North Central region." },
  { id: 19, title: "Health & Safety Officer", status: "closed", department: "Safety & Compliance", location: "Lagos", type: "Full-time", description: "Maintain safety compliance across all active sites and lead incident reporting and prevention." },
  { id: 20, title: "Security Officer", status: "closed", department: "Safety & Compliance", location: "Lagos", type: "Full-time", description: "Provide site security and access control across company premises and active sites." },
  { id: 21, title: "Property Sales Executive", status: "closed", department: "Real Estate & Property Services", location: "Lagos", type: "Full-time", description: "Manage client relationships for property sales and acquisitions, from first inquiry through documentation." },
  { id: 22, title: "Procurement Officer", status: "closed", department: "Corporate & Admin", location: "Lagos", type: "Full-time", description: "Source and purchase materials and equipment for active projects." },
  { id: 23, title: "Logistics Officer / Driver", status: "closed", department: "Corporate & Admin", location: "Lagos", type: "Full-time", description: "Coordinate transport of materials, equipment, and staff between sites." },
  { id: 24, title: "Human Resources Officer", status: "closed", department: "Corporate & Admin", location: "Lagos", type: "Full-time", description: "Manage recruitment, staff welfare, and HR administration across the company." },
  { id: 25, title: "Accountant", status: "closed", department: "Corporate & Admin", location: "Lagos", type: "Full-time", description: "Manage company accounts, project cost tracking, and financial reporting." },
  { id: 26, title: "IT Placement (Intern)", status: "closed", department: "Corporate & Admin", location: "Lagos", type: "Internship", description: "Support the company's IT systems and infrastructure as part of an internship placement." },
];

const BLOG_POSTS = [
  { id: 1, title: "What a geophysical survey actually tells you before drilling", date: "August 2026", category: "Borehole Drilling", excerpt: "Before any rig touches the ground, a survey maps what's beneath your site, and why skipping it is the most common cause of a dry or low-yield borehole.", body: [
    "A geophysical survey uses electrical resistivity readings to map soil and rock layers beneath a site before drilling begins. It tells our team where water-bearing layers are likely to sit, how deep they run, and how consistent the yield is likely to be.",
    "Skipping this step is the single most common reason a borehole underperforms. A rig can reach depth and still miss the aquifer by a few metres, which is a costly mistake to fix after the fact.",
    "On every project, we run the survey first, share the findings with the client in plain terms, and only then agree on a drilling plan and depth target.",
  ]},
  { id: 2, title: "Land documentation checklist before you build", date: "July 2026", category: "Real Estate", excerpt: "A survey plan and a deed are not enough on their own. Here is what we check before recommending a client proceeds to construction.", body: [
    "Nigerian land transactions carry real documentation risk, and construction should never start on a title that has not been verified. We check the survey plan, the deed of assignment, governor's consent status, and any encumbrance history at the relevant lands registry.",
    "Where a title is incomplete, we advise clients on the realistic path and timeline to regularise it rather than building on uncertain ground, literally.",
  ]},
  { id: 3, title: "Reading a construction progress report as a client", date: "June 2026", category: "General Contracting", excerpt: "Percentage complete alone does not tell the full story. Here is what to actually look for in your project updates.", body: [
    "A progress percentage is a useful summary, but it can hide uneven risk. A project reported at 60% complete might have finished all the easy, fast-moving work and be approaching a slower, higher-risk phase like roofing or M&E installation.",
    "That is why our client portal pairs a progress figure with a plain-language note on what was completed, what is next, and any blockers, updated as the project moves.",
  ]},
  { id: 4, title: "Why we run three service lines under one company", date: "May 2026", category: "Company News", excerpt: "General contracting, real estate, and borehole drilling look like three businesses. On the ground, they solve one problem for the same client.", body: [
    "Most clients building a home or a facility do not need just a contractor. They need land verified, water secured, and a structure built, often in that order, often with the same people accountable throughout.",
    "Operating all three under Samamiable Construction Company, as part of Samamiable Concerns, means one point of accountability instead of three separate vendors who each blame the others when something slips.",
  ]},
];

const API_BASE = "https://samamible-construction-company.onrender.com";
const CLIENT_SESSION_KEY = "samamiable_client_session";
const ADMIN_SESSION_KEY = "samamiable_admin_session";

async function apiFetch(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  let data = null;
  try { data = await res.json(); } catch (e) { /* no JSON body */ }
  if (!res.ok) {
    throw new Error((data && data.error) || "Something went wrong. Please try again.");
  }
  return data;
}

function authHeader(token) {
  return token ? { Authorization: "Bearer " + token } : {};
}

function loadSession(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function saveSession(key, session) {
  try { localStorage.setItem(key, JSON.stringify(session)); } catch (e) {}
}
function clearSession(key) {
  try { localStorage.removeItem(key); } catch (e) {}
}

const STAGE_ICONS = [FileSearch, Layers, Building2, HardHat, PaintBucket, Key];

const NAV_ITEMS = [
  { id: "home", label: "Home" }, { id: "about", label: "About" }, { id: "services", label: "Services" },
  { id: "portfolio", label: "Projects" }, { id: "careers", label: "Careers" }, { id: "blog", label: "News" }, { id: "contact", label: "Contact" },
];

const NIGERIAN_STATES = ["Lagos", "Abuja (FCT)", "Rivers", "Oyo", "Kano", "Ogun", "Delta", "Enugu", "Kaduna", "Edo", "Anambra", "Other"];

const STATUS_STYLE = { Planning: "status-planning", Ongoing: "status-ongoing", Completed: "status-completed" };



/* ------------------------------------------------------------- STYLES */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap');

    .sac-root {
      --blue-deep: #17324B; --blue: #2E5D89; --blue-soft: #E8EFF5;
      --red: #B23B2E; --red-dark: #8E2E23;
      --white: #FFFFFF; --offwhite: #F4F6F8; --ink: #1C232C; --muted: #5B6672; --line: #E1E6EA;
      --font-display: 'Zilla Slab', serif; --font-body: 'Work Sans', sans-serif;
      --radius: 10px; --shadow: 0 2px 14px rgba(23,50,75,0.09);
      font-family: var(--font-body); color: var(--ink); background: var(--white); line-height: 1.55; -webkit-font-smoothing: antialiased;
    }
    .sac-root * { box-sizing: border-box; }
    .sac-root h1, .sac-root h2, .sac-root h3, .sac-root h4 { font-family: var(--font-display); color: var(--blue-deep); line-height: 1.15; margin: 0; font-weight: 700; }
    .sac-root p { margin: 0; } .sac-root a { color: inherit; text-decoration: none; }
    .sac-root button { font-family: var(--font-body); cursor: pointer; }
    .sac-root :focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }
    .sac-wrap { max-width: 1140px; margin: 0 auto; padding: 0 24px; }
    .sac-shell { min-height: 100%; display: flex; flex-direction: column; }
    .sac-main { flex: 1; }

    /* header */
    .sac-header { position: sticky; top: 0; z-index: 40; background: var(--blue-deep); }
    .sac-header-inner { display: flex; align-items: center; justify-content: space-between; height: 78px; }
    .sac-logo { display: flex; align-items: center; gap: 12px; background: none; border: none; padding: 0; }
    .sac-logo img { height: 46px; width: auto; border-radius: 4px; }
    .sac-logo-word { display: flex; flex-direction: column; align-items: flex-start; }
    .sac-logo-name { font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--white); }
    .sac-logo-sub { font-size: 10.5px; color: rgba(255,255,255,0.65); margin-top: 1px; }
    .sac-nav-desktop { display: flex; align-items: center; gap: 26px; }
    .sac-nav-link { font-size: 14.5px; font-weight: 500; color: rgba(255,255,255,0.82); padding: 6px 0; border-bottom: 2px solid transparent; background: none; border-top: none; border-left: none; border-right: none; }
    .sac-nav-link.active { border-bottom-color: var(--red); color: var(--white); }
    .sac-header-actions { display: flex; align-items: center; gap: 14px; }
    .sac-portal-link { display: flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 500; background: none; border: none; color: rgba(255,255,255,0.85); }
    .sac-menu-btn { display: none; background: none; border: none; color: var(--white); }

    /* buttons */
    .sac-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 14.5px; font-weight: 600; padding: 13px 24px; border-radius: 8px; border: 1px solid transparent; transition: all 0.15s ease; }
    .sac-btn-primary { background: var(--red); color: var(--white); }
    .sac-btn-primary:hover { background: var(--red-dark); }
    .sac-btn-secondary { background: var(--white); color: var(--blue-deep); border-color: var(--line); box-shadow: var(--shadow); }
    .sac-btn-secondary:hover { border-color: var(--blue); }
    .sac-btn-ghost-white { background: transparent; color: var(--white); border-color: rgba(255,255,255,0.55); }
    .sac-btn-ghost-white:hover { background: rgba(255,255,255,0.12); }
    .sac-btn-block { width: 100%; } .sac-btn-sm { padding: 9px 16px; font-size: 13.5px; }
    .sac-btn:disabled { opacity: 0.55; cursor: not-allowed; }
    .sac-btn-icon { display: inline-flex; align-items: center; justify-content: center; padding: 8px; border-radius: 6px; border: 1px solid var(--line); background: var(--white); color: var(--blue-deep); }

    /* sections */
    .sac-section { padding: 84px 0; }
    .sac-section.offwhite { background: var(--offwhite); }
    .sac-section-head { max-width: 640px; margin: 0 auto 48px; text-align: center; }
    .sac-kicker { font-size: 13.5px; font-weight: 700; color: var(--red); margin-bottom: 10px; letter-spacing: 0.02em; }
    .sac-section-head h2 { font-size: 32px; margin-bottom: 14px; }
    .sac-section-head p { color: var(--muted); font-size: 16px; }
    .sac-section-head.left { text-align: left; margin: 0 0 40px; }

    /* hero */
    .sac-hero { background: linear-gradient(160deg, var(--blue-deep) 0%, #0F2438 100%); padding: 108px 0 96px; text-align: center; position: relative; overflow: hidden; }
    .sac-hero-bg-anim { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
    .sac-hero-photo-bg { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
    .sac-hero-photo-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 1.2s ease; }
    .sac-hero-photo-bg img.active { opacity: 1; }
    .sac-hero-photo-overlay { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(15,36,56,0.88) 0%, rgba(15,36,56,0.72) 100%); z-index: 0; }
    .sac-hero-photo-dots { position: absolute; bottom: 18px; left: 0; right: 0; display: flex; justify-content: center; gap: 8px; z-index: 1; }
    .sac-hero-photo-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; padding: 0; cursor: pointer; }
    .sac-hero-photo-dot.active { background: var(--white); }
    .sac-hero-bg-anim span { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.32; }
    .sac-hero-bg-anim span:nth-child(1) { width: 380px; height: 380px; background: #B23B2E; top: -90px; left: -60px; animation: sac-drift1 19s ease-in-out infinite; }
    .sac-hero-bg-anim span:nth-child(2) { width: 340px; height: 340px; background: #3E6D9C; bottom: -110px; right: -50px; animation: sac-drift2 23s ease-in-out infinite; }
    .sac-hero-bg-anim span:nth-child(3) { width: 260px; height: 260px; background: #6C93BB; top: 35%; right: 18%; animation: sac-drift3 27s ease-in-out infinite; }
    @keyframes sac-drift1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(70px, 45px); } }
    @keyframes sac-drift2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-55px, -35px); } }
    @keyframes sac-drift3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(35px, -55px) scale(1.15); } }
    .sac-hero .sac-wrap { position: relative; z-index: 1; }
    @media (prefers-reduced-motion: reduce) { .sac-hero-bg-anim span { animation: none !important; } }

    .sac-carousel { position: relative; border-radius: var(--radius); overflow: hidden; margin-bottom: 32px; background: var(--offwhite); border: 1px solid var(--line); }
    .sac-carousel-track { position: relative; width: 100%; aspect-ratio: 16 / 9; }
    .sac-carousel-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.9s ease; }
    .sac-carousel-img.active { opacity: 1; }
    .sac-carousel-dots { position: absolute; bottom: 14px; left: 0; right: 0; display: flex; justify-content: center; gap: 8px; }
    .sac-carousel-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.55); border: none; padding: 0; cursor: pointer; }
    .sac-carousel-dot.active { background: var(--white); }
    .sac-eyebrow-line { display: inline-flex; align-items: center; gap: 10px; font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.85); margin-bottom: 20px; background: rgba(255,255,255,0.08); padding: 7px 16px; border-radius: 20px; }
    .sac-rotating-tagline-wrap { height: 30px; margin-bottom: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .sac-rotating-tagline { display: inline-block; font-family: var(--font-display); font-weight: 700; font-size: 19px; color: #E8776A; letter-spacing: 0.01em; animation: sac-tagline-in 0.55s ease; }
    @keyframes sac-tagline-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .sac-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .sac-reveal-visible { opacity: 1; transform: translateY(0); }
    @media (prefers-reduced-motion: reduce) {
      .sac-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
      .sac-rotating-tagline { animation: none !important; }
    }
    .sac-eyebrow-line .dot { width: 6px; height: 6px; background: var(--red); border-radius: 50%; }
    .sac-hero h1 { font-size: 46px; line-height: 1.1; max-width: 20ch; margin: 0 auto 20px; color: var(--white); }
    .sac-hero-sub { font-size: 17.5px; color: rgba(255,255,255,0.78); max-width: 52ch; margin: 0 auto 34px; }
    .sac-hero-ctas { display: flex; gap: 14px; justify-content: center; margin-bottom: 56px; flex-wrap: wrap; }
    .sac-hero-stats { display: flex; gap: 0; justify-content: center; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; max-width: 640px; margin: 0 auto; overflow: hidden; }
    .sac-hero-stat { flex: 1; padding: 22px; border-left: 1px solid rgba(255,255,255,0.14); }
    .sac-hero-stat:first-child { border-left: none; }
    .sac-hero-stat-value { font-family: var(--font-display); font-size: 27px; font-weight: 700; color: var(--white); }
    .sac-hero-stat-label { font-size: 12.5px; color: rgba(255,255,255,0.68); margin-top: 3px; }

    /* trust bar */
    .sac-trustbar { background: var(--white); border-bottom: 1px solid var(--line); padding: 16px 0; }
    .sac-trustbar-inner { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; color: var(--blue-deep); text-align: center; }

    /* services */
    .sac-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .sac-service-card { background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 30px 26px; display: flex; flex-direction: column; gap: 14px; border-top: 3px solid var(--blue); }
    .sac-service-icon { width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; background: var(--blue-soft); color: var(--red); border-radius: 10px; }
    .sac-service-card h3 { font-size: 19px; } .sac-service-card p { color: var(--muted); font-size: 14.5px; }
    .sac-service-points { list-style: none; padding: 0; margin: 4px 0 0; display: flex; flex-direction: column; gap: 8px; }
    .sac-service-points li { display: flex; align-items: flex-start; gap: 8px; font-size: 13.8px; color: var(--ink); }
    .sac-service-points svg { flex-shrink: 0; margin-top: 2px; color: var(--red); }
    .sac-service-link { margin-top: auto; font-size: 13.8px; font-weight: 600; color: var(--blue); display: inline-flex; align-items: center; gap: 4px; background: none; border: none; padding: 0; align-self: flex-start; }

    /* portfolio */
    .sac-filter-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; justify-content: center; }
    .sac-filter-chip { font-size: 13.5px; font-weight: 600; padding: 9px 18px; border: 1px solid var(--line); background: var(--white); color: var(--blue-deep); border-radius: 20px; }
    .sac-filter-chip.active { background: var(--blue-deep); color: var(--white); border-color: var(--blue-deep); }
    .sac-portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .sac-portfolio-card { background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; text-align: left; display: flex; flex-direction: column; }
    .sac-portfolio-card-top { height: 8px; background: var(--blue); }
    .sac-portfolio-card-body { padding: 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .sac-status-badge { font-size: 11px; font-weight: 700; padding: 5px 11px; border-radius: 20px; letter-spacing: 0.02em; display: inline-flex; width: fit-content; }
    .status-planning { background: #F3E8D2; color: #8A6A1E; }
    .status-ongoing { background: var(--blue-soft); color: var(--blue); }
    .status-completed { background: #DFF1E1; color: #2E7D42; }
    .sac-portfolio-card h3 { font-size: 17px; }
    .sac-portfolio-card p.desc { color: var(--muted); font-size: 13.8px; }
    .sac-project-meta { display: flex; gap: 14px; font-size: 12.5px; color: var(--muted); margin-top: 2px; flex-wrap: wrap; }
    .sac-project-meta span { display: flex; align-items: center; gap: 5px; }
    .sac-sample-tag { font-size: 11px; font-weight: 700; color: var(--red); border: 1px dashed var(--red); border-radius: 20px; padding: 3px 10px; width: fit-content; }

    /* portfolio detail */
    .sac-timeline { display: flex; flex-direction: column; gap: 0; margin-top: 12px; }
    .sac-timeline-item { display: grid; grid-template-columns: 52px 1fr; gap: 20px; }
    .sac-timeline-rail { display: flex; flex-direction: column; align-items: center; }
    .sac-timeline-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--blue-soft); color: var(--blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .sac-timeline-line { width: 2px; flex: 1; background: var(--line); margin: 4px 0; }
    .sac-timeline-content { padding-bottom: 32px; }
    .sac-timeline-content h4 { font-size: 16.5px; margin-bottom: 6px; }
    .sac-timeline-content p { font-size: 14px; color: var(--muted); }
    .sac-timeline-img { margin-top: 10px; width: 100%; max-width: 420px; border-radius: 8px; border: 1px solid var(--line); }

    .sac-review-card { background: var(--offwhite); border-radius: var(--radius); padding: 22px; display: flex; flex-direction: column; gap: 10px; }
    .sac-star-row { display: flex; gap: 2px; color: #D9A441; }
    .sac-star-row svg.empty { color: var(--line); }
    .sac-review-quote { font-size: 14.5px; color: var(--ink); }
    .sac-review-author { font-size: 13px; color: var(--muted); font-weight: 600; }

    /* stat strip */
    .sac-stat-strip { display: grid; grid-template-columns: repeat(3, 1fr); background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); border: 1px solid var(--line); overflow: hidden; }
    .sac-stat-cell { padding: 30px; border-left: 1px solid var(--line); text-align: center; }
    .sac-stat-cell:first-child { border-left: none; }
    .sac-stat-cell .num { font-family: var(--font-display); font-size: 30px; font-weight: 700; color: var(--blue-deep); }
    .sac-stat-cell .lbl { font-size: 13.5px; color: var(--muted); margin-top: 4px; }

    /* forms */
    .sac-form { display: flex; flex-direction: column; gap: 20px; }
    .sac-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .sac-field { display: flex; flex-direction: column; gap: 7px; }
    .sac-field label { font-size: 13.5px; font-weight: 600; color: var(--blue-deep); }
    .sac-field .req { color: var(--red); }
    .sac-field input, .sac-field select, .sac-field textarea { font-family: var(--font-body); font-size: 14.5px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 8px; background: var(--white); color: var(--ink); }
    .sac-field input:focus, .sac-field select:focus, .sac-field textarea:focus { border-color: var(--blue); }
    .sac-field textarea { resize: vertical; min-height: 110px; }
    .sac-field-hint { font-size: 12.5px; color: var(--muted); }
    .sac-form-error { font-size: 13.5px; color: var(--red-dark); background: #FBEAE8; border: 1px solid #F0C9C4; padding: 10px 14px; border-radius: 8px; }
    .sac-success-panel { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 40px; border: 1px solid var(--line); background: var(--offwhite); border-radius: var(--radius); }
    .sac-success-panel svg { color: var(--red); }
    .sac-form-panel { border: 1px solid var(--line); background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); padding: 40px; }

    /* portal & admin shared shell */
    .sac-auth-shell { display: grid; grid-template-columns: 0.9fr 1.1fr; min-height: 540px; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); border: 1px solid var(--line); }
    .sac-auth-side { background: var(--blue-deep); color: var(--white); padding: 48px; display: flex; flex-direction: column; justify-content: space-between; }
    .sac-auth-side h2 { color: var(--white); font-size: 24px; margin-bottom: 14px; }
    .sac-auth-side p { color: rgba(255,255,255,0.75); font-size: 14.5px; max-width: 34ch; }
    .sac-demo-box { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); padding: 16px 18px; font-size: 13px; margin-top: 28px; border-radius: 8px; }
    .sac-demo-box code { font-family: monospace; background: rgba(255,255,255,0.14); padding: 1px 5px; border-radius: 3px; }
    .sac-auth-main { padding: 48px; display: flex; flex-direction: column; justify-content: center; }
    .sac-auth-tabs { display: flex; gap: 24px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }
    .sac-auth-tab { padding: 10px 0; font-size: 14.5px; font-weight: 600; color: var(--muted); background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -1px; }
    .sac-auth-tab.active { color: var(--blue-deep); border-bottom-color: var(--red); }

    .sac-dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 12px; }
    .sac-dash-welcome { color: var(--muted); font-size: 15px; margin-bottom: 40px; }
    .sac-logout-btn { display: flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 600; color: var(--muted); background: none; border: none; }
    .sac-tracker-card { border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 26px; margin-bottom: 18px; background: var(--white); }
    .sac-tracker-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
    .sac-progress-track { height: 8px; background: var(--offwhite); border-radius: 20px; margin: 12px 0; overflow: hidden; }
    .sac-progress-fill { height: 100%; background: var(--red); border-radius: 20px; }
    .sac-tracker-meta { display: flex; gap: 24px; font-size: 12.8px; color: var(--muted); margin-bottom: 10px; flex-wrap: wrap; }
    .sac-tracker-update { font-size: 13.8px; color: var(--ink); background: var(--offwhite); padding: 12px 14px; border-radius: 8px; border-left: 3px solid var(--blue); }

    /* admin */
    .sac-admin-tabs { display: flex; gap: 8px; margin-bottom: 32px; }
    .sac-admin-tab { padding: 11px 20px; font-size: 14px; font-weight: 600; border-radius: 8px; border: 1px solid var(--line); background: var(--white); color: var(--blue-deep); display: flex; align-items: center; gap: 8px; }
    .sac-admin-tab.active { background: var(--blue-deep); color: var(--white); border-color: var(--blue-deep); }
    .sac-admin-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--white); margin-bottom: 12px; }
    .sac-admin-row-actions { display: flex; gap: 8px; flex-shrink: 0; }
    .sac-inquiry-card { border: 1px solid var(--line); border-radius: var(--radius); padding: 18px 20px; margin-bottom: 12px; background: var(--white); }
    .sac-inquiry-meta { font-size: 12.5px; color: var(--muted); margin-top: 6px; }
    .sac-stage-row, .sac-review-row { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start; border: 1px solid var(--line); border-radius: 8px; padding: 16px; margin-bottom: 10px; background: var(--offwhite); }
    .sac-photo-upload-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; color: var(--blue); background: var(--white); border: 1px dashed var(--blue); border-radius: 8px; padding: 10px 16px; cursor: pointer; width: fit-content; }
    .sac-photo-upload-btn:hover { background: var(--blue-soft); }
    .sac-photo-preview { display: flex; align-items: center; gap: 12px; }
    .sac-photo-preview img { width: 84px; height: 84px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line); flex-shrink: 0; }
    .sac-add-row-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 600; color: var(--blue); background: none; border: 1px dashed var(--blue); border-radius: 8px; padding: 10px 16px; align-self: flex-start; }

    /* careers */
    .sac-job-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px; border: 1px solid var(--line); border-radius: var(--radius); margin-bottom: 14px; background: var(--white); box-shadow: var(--shadow); }
    .sac-job-title { font-size: 17px; font-weight: 700; color: var(--blue-deep); font-family: var(--font-display); }
    .sac-job-meta { display: flex; gap: 14px; font-size: 13px; color: var(--muted); margin-top: 6px; flex-wrap: wrap; }
    .sac-job-desc { font-size: 14px; color: var(--muted); margin-top: 8px; max-width: 60ch; }

    /* blog */
    .sac-blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .sac-blog-card { border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px; display: flex; flex-direction: column; gap: 10px; text-align: left; background: var(--white); border-top: 3px solid var(--red); }
    .sac-blog-meta { display: flex; gap: 10px; align-items: center; font-size: 12.5px; color: var(--red); font-weight: 600; }
    .sac-blog-card h3 { font-size: 19px; } .sac-blog-card p { color: var(--muted); font-size: 14.5px; }
    .sac-back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13.8px; font-weight: 600; color: var(--blue); background: none; border: none; padding: 0; margin-bottom: 28px; }
    .sac-post-body p { font-size: 16.5px; color: var(--ink); margin-bottom: 20px; max-width: 68ch; line-height: 1.7; }

    /* about */
    .sac-value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .sac-value-card { padding: 26px; border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); background: var(--white); }
    .sac-value-card svg { color: var(--red); margin-bottom: 14px; }
    .sac-value-card h3 { font-size: 16.5px; margin-bottom: 8px; } .sac-value-card p { font-size: 13.8px; color: var(--muted); }

    /* contact */
    .sac-contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; }
    .sac-office-list { display: flex; flex-direction: column; gap: 22px; }
    .sac-office-item { display: flex; gap: 14px; }
    .sac-office-item svg { color: var(--red); flex-shrink: 0; margin-top: 3px; }
    .sac-office-item h4 { font-size: 15px; margin-bottom: 3px; } .sac-office-item p { font-size: 13.8px; color: var(--muted); }

    /* footer */
    .sac-footer { background: var(--blue-deep); color: rgba(255,255,255,0.85); padding: 56px 0 24px; }
    .sac-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
    .sac-footer h4 { color: var(--white); font-size: 13px; letter-spacing: 0.04em; margin-bottom: 16px; }
    .sac-footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
    .sac-footer-links button { background: none; border: none; color: rgba(255,255,255,0.75); font-size: 14px; padding: 0; text-align: left; }
    .sac-footer-links button:hover { color: var(--white); }
    .sac-footer-about { font-size: 13.8px; color: rgba(255,255,255,0.65); max-width: 34ch; }
    .sac-footer-bottom { border-top: 1px solid rgba(255,255,255,0.15); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; color: rgba(255,255,255,0.5); flex-wrap: wrap; gap: 10px; }
    .sac-admin-tiny-link { background: none; border: none; color: rgba(255,255,255,0.55); font-size: 12.5px; padding: 4px 0; text-decoration: underline; text-underline-offset: 3px; }
    .sac-admin-tiny-link:hover { color: rgba(255,255,255,0.85); }

    /* cta banner */
    .sac-cta-banner { background: var(--red); padding: 64px 0; }
    .sac-cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
    .sac-cta-inner h2 { color: var(--white); font-size: 28px; max-width: 22ch; }

    .sac-spin { animation: sac-spin 0.8s linear infinite; } @keyframes sac-spin { to { transform: rotate(360deg); } }

    @media (max-width: 860px) {
      .sac-nav-desktop { display: none; } .sac-menu-btn { display: flex; }
      .sac-hero h1 { font-size: 32px; }
      .sac-services-grid, .sac-portfolio-grid, .sac-stat-strip, .sac-contact-grid, .sac-footer-grid, .sac-value-grid, .sac-blog-grid, .sac-form-row, .sac-auth-shell, .sac-hero-stats {
        grid-template-columns: 1fr;
      }
      .sac-hero-stats { display: flex; flex-direction: column; }
      .sac-hero-stat { border-left: none; border-top: 1px solid rgba(255,255,255,0.14); }
      .sac-hero-stat:first-child { border-top: none; }
      .sac-section { padding: 56px 0; }
      .sac-auth-side, .sac-auth-main { padding: 32px; }
      .sac-mobile-nav { display: flex !important; }
      .sac-timeline-img { max-width: 100%; }
    }
    .sac-mobile-nav { display: none; flex-direction: column; padding: 8px 24px 20px; gap: 4px; background: var(--blue-deep); }
    .sac-mobile-nav button { text-align: left; padding: 12px 0; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); font-size: 15px; font-weight: 500; color: var(--white); }
    .sac-mobile-nav button:last-child { border-bottom: none; }
  `}</style>
);

/* ------------------------------------------------------------ HELPERS */

function Logo({ onClick, logoUrl }) {
  return (
    <button className="sac-logo" onClick={onClick} aria-label="Samamiable Construction Company, home">
      <img src={logoUrl || LOGO_SMALL} alt="Samamiable Construction Company emblem" />
      <span className="sac-logo-word">
        <span className="sac-logo-name">Samamiable Construction</span>
        <span className="sac-logo-sub">A division of Samamiable Concerns</span>
      </span>
    </button>
  );
}

function Header({ page, setPage, currentUser, adminUser, logoUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (id) => { setPage(id); setMenuOpen(false); };
  return (
    <header className="sac-header">
      <div className="sac-wrap sac-header-inner">
        <Logo onClick={() => go("home")} logoUrl={logoUrl} />
        <nav className="sac-nav-desktop">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} className={"sac-nav-link" + (page === item.id ? " active" : "")} onClick={() => go(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="sac-header-actions">
          <button className="sac-portal-link" onClick={() => go("portal")}>
            <User size={16} /><span>{currentUser ? "My portal" : "Client portal"}</span>
          </button>
          <a className="sac-btn sac-btn-primary" href="#" onClick={(e) => { e.preventDefault(); go("quote"); }}>Request a quote</a>
          <button className="sac-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="sac-mobile-nav">
          {NAV_ITEMS.map((item) => (<button key={item.id} onClick={() => go(item.id)}>{item.label}</button>))}
          <button onClick={() => go("portal")}>Client portal</button>
        </div>
      )}
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="sac-footer">
      <div className="sac-wrap">
        <div className="sac-footer-grid">
          <div>
            <h4>SAMAMIABLE CONSTRUCTION</h4>
            <p className="sac-footer-about">A national general contracting, real estate, and borehole drilling company, operating as a division of Samamiable Concerns.</p>
          </div>
          <div><h4>COMPANY</h4><ul className="sac-footer-links">
            <li><button onClick={() => setPage("about")}>About us</button></li>
            <li><button onClick={() => setPage("portfolio")}>Our projects</button></li>
            <li><button onClick={() => setPage("careers")}>Careers</button></li>
            <li><button onClick={() => setPage("blog")}>News</button></li>
          </ul></div>
          <div><h4>SERVICES</h4><ul className="sac-footer-links">
            <li><button onClick={() => setPage("services")}>General contracting</button></li>
            <li><button onClick={() => setPage("services")}>Real estate & property</button></li>
            <li><button onClick={() => setPage("services")}>Borehole drilling</button></li>
          </ul></div>
          <div><h4>GET IN TOUCH</h4><ul className="sac-footer-links">
            <li><button onClick={() => setPage("quote")}>Request a quote</button></li>
            <li><button onClick={() => setPage("contact")}>Contact us</button></li>
            <li><button onClick={() => setPage("portal")}>Client portal</button></li>
          </ul></div>
        </div>
        <div className="sac-footer-bottom">
          <span>&copy; 2026 Samamiable Construction Company. Part of Samamiable Concerns.</span>
          <button className="sac-admin-tiny-link" onClick={() => setPage("admin")}>Admin</button>
        </div>
      </div>
    </footer>
  );
}

function Field({ label, required, hint, children }) {
  return (<div className="sac-field"><label>{label}{required && <span className="req"> *</span>}</label>{children}{hint && <span className="sac-field-hint">{hint}</span>}</div>);
}

function StarRow({ rating }) {
  return (<div className="sac-star-row">{[1, 2, 3, 4, 5].map((n) => (<Star key={n} size={15} fill={n <= rating ? "currentColor" : "none"} className={n <= rating ? "" : "empty"} />))}</div>);
}

function StatusBadge({ status }) {
  return <span className={"sac-status-badge " + (STATUS_STYLE[status] || "status-planning")}>{String(status).toUpperCase()}</span>;
}

// Counts up from 0 to the target value once it scrolls into view. Accepts
// strings like "140+" or "12+" and animates the numeric part, keeping any
// suffix. Falls back to showing the value as-is if it isn't numeric.
function AnimatedNumber({ value, duration = 1500 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const match = String(value).match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : "0" + suffix);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setDisplay(value); return; }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(target * eased).toLocaleString() + suffix);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref}>{display}</span>;
}

// Fades and slides a section's content into place the first time it
// scrolls into view. Respects prefers-reduced-motion via CSS.
function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={"sac-reveal" + (visible ? " sac-reveal-visible" : "") + (className ? " " + className : "")}
      style={delay ? { transitionDelay: delay + "ms" } : undefined}
    >
      {children}
    </Tag>
  );
}

const HERO_TAGLINES = ["We are Samamiable.", "We are experienced.", "We are accountable.", "We are nationwide."];

// Cycles through a short list of taglines, fading each one in.
function RotatingTagline() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_TAGLINES.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="sac-rotating-tagline-wrap">
      <span className="sac-rotating-tagline" key={index}>{HERO_TAGLINES[index]}</span>
    </div>
  );
}

// Reads an image file chosen by the admin, shrinks it so it doesn't
// bloat storage, and returns a data URL that can be used directly as
// an <img src>, saved, and re-displayed later, without needing any
// separate file hosting.
function readAndCompressImage(file, maxDimension = 1000, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("That file doesn't look like a valid image."));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) { height = Math.round((height * maxDimension) / width); width = maxDimension; }
          else { width = Math.round((width * maxDimension) / height); height = maxDimension; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* --------------------------------------------------------------- HOME */

// Rotating full-bleed background photos behind the hero, with a dark
// overlay for text legibility and click-to-jump dots, matching the
// slideshow pattern from the reference site. Falls back to the plain
// animated background (in HomePage below) when no photos are set.
function HeroPhotoBackground({ images, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <>
      <div className="sac-hero-photo-bg">
        {images.map((src, i) => (
          <img key={i} src={src} alt="" className={i === index ? "active" : ""} />
        ))}
      </div>
      <div className="sac-hero-photo-overlay" />
      {images.length > 1 && (
        <div className="sac-hero-photo-dots">
          {images.map((_, i) => (
            <button key={i} className={"sac-hero-photo-dot" + (i === index ? " active" : "")} onClick={() => setIndex(i)} aria-label={"Show background photo " + (i + 1)} />
          ))}
        </div>
      )}
    </>
  );
}

function HomePage({ setPage, portfolio, logoUrl, heroImages }) {
  const featured = (portfolio || []).slice(0, 3);
  return (
    <>
      <section className="sac-hero">
        {heroImages && heroImages.length > 0 ? (
          <HeroPhotoBackground images={heroImages} />
        ) : (
          <div className="sac-hero-bg-anim"><span></span><span></span><span></span></div>
        )}
        <div className="sac-wrap">
          <RotatingTagline />
          <div className="sac-eyebrow-line"><span className="dot" /> A division of Samamiable Concerns</div>
          <h1>Building, land, and water, handled by one accountable team.</h1>
          <p className="sac-hero-sub">Samamiable Construction Company delivers general contracting, real estate services, and borehole drilling for residential, commercial, and government clients across Nigeria.</p>
          <div className="sac-hero-ctas">
            <a className="sac-btn sac-btn-primary" href="#" onClick={(e) => { e.preventDefault(); setPage("quote"); }}>Request a quote</a>
            <a className="sac-btn sac-btn-ghost-white" href="#" onClick={(e) => { e.preventDefault(); setPage("portfolio"); }}>View our projects</a>
          </div>
          <div className="sac-hero-stats">
            {STATS.map((s) => (<div className="sac-hero-stat" key={s.label}><div className="sac-hero-stat-value"><AnimatedNumber value={s.value} /></div><div className="sac-hero-stat-label">{s.label}</div></div>))}
          </div>
        </div>
      </section>

      <div className="sac-trustbar"><div className="sac-wrap sac-trustbar-inner"><ShieldCheck size={18} color="#B23B2E" /><span>Operating nationally as part of <strong>Samamiable Concerns</strong>, serving residential, commercial, and government clients.</span></div></div>

      <section className="sac-section">
        <div className="sac-wrap">
          <Reveal><div className="sac-section-head">
            <div className="sac-kicker">What we do</div>
            <h2>Three service lines, one point of contact</h2>
            <p>Most projects touch more than one of these. We keep them under a single team so nothing gets lost between vendors.</p>
          </div></Reveal>
          <div className="sac-services-grid">
            {SERVICES.map((s, i) => (
              <Reveal as="div" delay={i * 100} key={s.id} className="sac-service-card">
                <div className="sac-service-icon"><s.icon size={22} /></div>
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
                <ul className="sac-service-points">{s.points.slice(0, 3).map((pt) => (<li key={pt}><CheckCircle2 size={14} />{pt}</li>))}</ul>
                <button className="sac-service-link" onClick={() => setPage("services")}>Learn more <ChevronRight size={14} /></button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sac-section offwhite">
        <div className="sac-wrap">
          <Reveal><div className="sac-section-head"><div className="sac-kicker">Our work</div><h2>Projects, from planning to handover</h2></div></Reveal>
          <div className="sac-portfolio-grid">
            {featured.map((p, i) => (
              <Reveal as="div" delay={i * 100} key={p.id} className="sac-portfolio-card">
                <div className="sac-portfolio-card-top" />
                <div className="sac-portfolio-card-body">
                  <StatusBadge status={p.status} />
                  <h3>{p.title}</h3>
                  <p className="desc">{p.description}</p>
                  <div className="sac-project-meta"><span><MapPin size={13} />{p.location}</span><span>{p.year}</span></div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 36, textAlign: "center" }}>
            <a className="sac-btn sac-btn-secondary" href="#" onClick={(e) => { e.preventDefault(); setPage("portfolio"); }}>See all projects</a>
          </div>
        </div>
      </section>

      <div className="sac-cta-banner">
        <Reveal as="div" className="sac-wrap sac-cta-inner">
          <h2>Have a site, a plot, or a plan? Let's talk about what it needs.</h2>
          <a className="sac-btn sac-btn-ghost-white" href="#" onClick={(e) => { e.preventDefault(); setPage("quote"); }}>Request a quote</a>
        </Reveal>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- ABOUT */

function AboutPage() {
  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-section-head">
          <div className="sac-kicker">About us</div>
          <h2>Part of Samamiable Concerns, built for the field</h2>
          <p>Samamiable Construction Company was established as the construction, property, and water-access arm of Samamiable Concerns, bringing general contracting, real estate services, and borehole drilling together under one accountable team.</p>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto 56px" }}>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 18, lineHeight: 1.7 }}>
            We work with residential clients building or renovating a home, commercial clients delivering warehouses and offices, and government bodies executing public infrastructure. Each of those clients needs a different kind of proof before they hand over a project, and we structure our process around that: clear documentation for government work, transparent progress reporting for commercial clients, and a straightforward, plain-language process for homeowners.
          </p>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
            Being part of Samamiable Concerns means projects are backed by a larger organisation's resources and accountability, while still being run by a team that specialises specifically in construction, property, and water access.
          </p>
        </div>
        <div className="sac-value-grid">
          <div className="sac-value-card"><ShieldCheck size={24} /><h3>Accountability</h3><p>One team responsible end-to-end, backed by Samamiable Concerns.</p></div>
          <div className="sac-value-card"><Award size={24} /><h3>Documented process</h3><p>Surveys, permits, and progress records kept for every project, available to the client.</p></div>
          <div className="sac-value-card"><Users size={24} /><h3>National reach</h3><p>Field teams and contractor networks across multiple states, not one regional office.</p></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- SERVICES */

function ServicesPage({ setPage }) {
  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-section-head"><div className="sac-kicker">Services</div><h2>What we deliver, in detail</h2></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {SERVICES.map((s) => (
            <div key={s.id} className="sac-form-panel" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start" }}>
              <div className="sac-service-icon" style={{ width: 52, height: 52 }}><s.icon size={24} /></div>
              <div>
                <h3 style={{ fontSize: 22, marginBottom: 10 }}>{s.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 18, maxWidth: "60ch" }}>{s.summary}</p>
                <ul className="sac-service-points" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {s.points.map((pt) => (<li key={pt}><CheckCircle2 size={14} />{pt}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a className="sac-btn sac-btn-primary" href="#" onClick={(e) => { e.preventDefault(); setPage("quote"); }}>Request a quote for one of these</a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ PORTFOLIO */

// Auto-advancing photo carousel with fade transitions and click-to-jump dots.
function ImageCarousel({ images, interval = 4000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className="sac-carousel">
      <div className="sac-carousel-track">
        {images.map((src, i) => (
          <img key={i} src={src} alt="" className={"sac-carousel-img" + (i === index ? " active" : "")} />
        ))}
      </div>
      {images.length > 1 && (
        <div className="sac-carousel-dots">
          {images.map((_, i) => (
            <button key={i} className={"sac-carousel-dot" + (i === index ? " active" : "")} onClick={() => setIndex(i)} aria-label={"Show photo " + (i + 1)} />
          ))}
        </div>
      )}
    </div>
  );
}

function PortfolioDetail({ project, onBack }) {
  const galleryImages = (project.stages || []).map((s) => s.imageUrl).filter(Boolean);
  return (
    <section className="sac-section">
      <div className="sac-wrap" style={{ maxWidth: 760 }}>
        <button className="sac-back-link" onClick={onBack}><ArrowLeft size={15} /> Back to projects</button>
        {project.isSample && <div className="sac-sample-tag" style={{ marginBottom: 14 }}>Sample project &mdash; edit from admin</div>}
        <StatusBadge status={project.status} />
        <h2 style={{ fontSize: 30, margin: "12px 0 10px" }}>{project.title}</h2>
        <div className="sac-project-meta" style={{ marginBottom: 20 }}>
          <span><MapPin size={13} />{project.location}</span>
          <span>{project.year}</span>
          <span>{project.sector}</span>
        </div>
        <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, marginBottom: 32, maxWidth: "65ch" }}>{project.description}</p>

        {galleryImages.length > 0 && <ImageCarousel images={galleryImages} />}

        {project.stages && project.stages.length > 0 && (
          <>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Project stages</h3>
            <div className="sac-timeline">
              {project.stages.map((stage, i) => {
                const StageIcon = STAGE_ICONS[i % STAGE_ICONS.length];
                const isLast = i === project.stages.length - 1;
                return (
                  <div className="sac-timeline-item" key={i}>
                    <div className="sac-timeline-rail">
                      <div className="sac-timeline-icon"><StageIcon size={18} /></div>
                      {!isLast && <div className="sac-timeline-line" />}
                    </div>
                    <div className="sac-timeline-content">
                      <h4>{stage.title}</h4>
                      <p>{stage.description}</p>
                      {stage.imageUrl && <img className="sac-timeline-img" src={stage.imageUrl} alt={stage.title} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {project.reviews && project.reviews.length > 0 && (
          <>
            <h3 style={{ fontSize: 20, marginBottom: 16, marginTop: 20 }}>Client reviews</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {project.reviews.map((r, i) => (
                <div className="sac-review-card" key={i}>
                  <StarRow rating={r.rating} />
                  <p className="sac-review-quote">&ldquo;{r.quote}&rdquo;</p>
                  <p className="sac-review-author">{r.author}{r.role ? ` \u2014 ${r.role}` : ""}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function QuotePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", clientType: "", state: "", budget: "", details: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service || !form.details) { setError("Please fill in all required fields before submitting."); return; }
    setError(""); setSaving(true);
    try {
      await apiFetch("/api/portal/quotes", { method: "POST", body: JSON.stringify(form) });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not submit your request. Please check your connection and try again.");
    }
    setSaving(false);
  };

  if (submitted) {
    return (
      <section className="sac-section">
        <div className="sac-wrap" style={{ maxWidth: 640 }}>
          <div className="sac-success-panel">
            <CheckCircle2 size={30} />
            <h2 style={{ fontSize: 22 }}>Quote request received</h2>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>Thanks, {form.name.split(" ")[0]}. A member of our team will review your project details and reach out to {form.email} or {form.phone} within two working days.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sac-section">
      <div className="sac-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56 }}>
        <div>
          <div className="sac-kicker">Get a quote</div>
          <h2 style={{ fontSize: 30, marginBottom: 16 }}>Tell us about your project</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 24, maxWidth: "40ch" }}>Share a few details and we'll come back with next steps, whether that's a site visit, a survey, or a direct estimate.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 12 }}><Phone size={17} style={{ color: "var(--red)", flexShrink: 0, marginTop: 2 }} /><div><div style={{ fontSize: 13.5, fontWeight: 600 }}>Prefer to call?</div><div style={{ fontSize: 13.5, color: "var(--muted)" }}>Our team can talk through your project directly.</div></div></div>
            <div style={{ display: "flex", gap: 12 }}><ClipboardList size={17} style={{ color: "var(--red)", flexShrink: 0, marginTop: 2 }} /><div><div style={{ fontSize: 13.5, fontWeight: 600 }}>What happens next</div><div style={{ fontSize: 13.5, color: "var(--muted)" }}>We review your request, and follow up to scope a site visit or survey where needed.</div></div></div>
          </div>
        </div>
        <form className="sac-form-panel sac-form" onSubmit={submit}>
          {error && <div className="sac-form-error">{error}</div>}
          <div className="sac-form-row">
            <Field label="Full name" required><input value={form.name} onChange={update("name")} placeholder="Your name" /></Field>
            <Field label="Phone number" required><input value={form.phone} onChange={update("phone")} placeholder="080..." /></Field>
          </div>
          <Field label="Email address" required><input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" /></Field>
          <div className="sac-form-row">
            <Field label="Service needed" required><select value={form.service} onChange={update("service")}><option value="">Select a service</option>{SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}<option value="Not sure">Not sure yet</option></select></Field>
            <Field label="Client type"><select value={form.clientType} onChange={update("clientType")}><option value="">Select type</option><option>Residential</option><option>Commercial</option><option>Government</option></select></Field>
          </div>
          <div className="sac-form-row">
            <Field label="State / location"><select value={form.state} onChange={update("state")}><option value="">Select a state</option>{NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Estimated budget range" hint="Optional, helps us scope the right response">
              <select value={form.budget} onChange={update("budget")}>
                <option value="">Prefer not to say</option>
                <option>Under ₦5 million</option>
                <option>₦5 million – ₦25 million</option>
                <option>₦25 million – ₦100 million</option>
                <option>Above ₦100 million</option>
              </select>
            </Field>
          </div>
          <Field label="Project details" required><textarea value={form.details} onChange={update("details")} placeholder="Tell us what you're building, buying, or drilling for, and any timeline." /></Field>
          <button className="sac-btn sac-btn-primary sac-btn-block" type="submit" disabled={saving}>{saving ? "Submitting..." : "Request a quote"}</button>
        </form>
      </div>
    </section>
  );
}

function PortfolioPage({ portfolio, loading }) {
  const [sector, setSector] = useState("all");
  const [selected, setSelected] = useState(null);
  const sectors = ["all", "Residential", "Commercial", "Government"];

  if (loading) {
    return <section className="sac-section"><div className="sac-wrap" style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}><Loader2 size={22} className="sac-spin" /></div></section>;
  }

  if (selected) {
    return <PortfolioDetail project={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = sector === "all" ? portfolio : portfolio.filter((p) => p.sector === sector);

  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-section-head">
          <div className="sac-kicker">Projects</div>
          <h2>A working record, not a highlight reel</h2>
          <p>Browse ongoing and completed work. Select a project to see its stages and client feedback.</p>
        </div>
        <div className="sac-filter-row">
          {sectors.map((s) => (<button key={s} className={"sac-filter-chip" + (sector === s ? " active" : "")} onClick={() => setSector(s)}>{s === "all" ? "All sectors" : s}</button>))}
        </div>
        <div className="sac-portfolio-grid">
          {filtered.map((p) => (
            <button className="sac-portfolio-card" key={p.id} onClick={() => setSelected(p)} style={{ cursor: "pointer" }}>
              <div className="sac-portfolio-card-top" />
              <div className="sac-portfolio-card-body">
                <StatusBadge status={p.status} />
                {p.isSample && <span className="sac-sample-tag">Sample project</span>}
                <h3>{p.title}</h3>
                <p className="desc">{p.description}</p>
                <div className="sac-project-meta"><span><MapPin size={13} />{p.location}</span><span>{p.year}</span></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ CAREERS */

function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { setError("Please fill in your name, email, and phone number."); return; }
    setError(""); setSaving(true);
    try {
      await apiFetch("/api/portal/applications", { method: "POST", body: JSON.stringify({ job: selectedJob?.title, ...form }) });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not submit your application. Please check your connection and try again.");
    }
    setSaving(false);
  };

  if (selectedJob && !submitted) {
    return (
      <section className="sac-section">
        <div className="sac-wrap" style={{ maxWidth: 640 }}>
          <button className="sac-back-link" onClick={() => setSelectedJob(null)}><ChevronLeft size={15} /> Back to openings</button>
          <div className="sac-kicker">{selectedJob.department}</div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>{selectedJob.title}</h2>
          <div className="sac-job-meta" style={{ marginBottom: 20 }}><span><MapPin size={13} style={{ display: "inline", marginRight: 4 }} />{selectedJob.location}</span><span>{selectedJob.type}</span></div>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 32, maxWidth: "60ch" }}>{selectedJob.description}</p>
          <form className="sac-form" onSubmit={submit}>
            {error && <div className="sac-form-error">{error}</div>}
            <div className="sac-form-row">
              <Field label="Full name" required><input value={form.name} onChange={update("name")} /></Field>
              <Field label="Phone number" required><input value={form.phone} onChange={update("phone")} /></Field>
            </div>
            <Field label="Email address" required><input type="email" value={form.email} onChange={update("email")} /></Field>
            <Field label="Message" hint="A short note is fine"><textarea value={form.message} onChange={update("message")} placeholder="Tell us briefly about your interest." /></Field>
            <button className="sac-btn sac-btn-primary" type="submit" disabled={saving}>{saving ? "Submitting..." : "Submit"}</button>
          </form>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="sac-section">
        <div className="sac-wrap" style={{ maxWidth: 640 }}>
          <div className="sac-success-panel">
            <CheckCircle2 size={30} />
            <h2 style={{ fontSize: 22 }}>Application received</h2>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>Thanks for applying to {selectedJob?.title}. We'll review your application and follow up at {form.email} if there's a fit.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-section-head"><div className="sac-kicker">Careers</div><h2>Roles across the company</h2><p>Most positions below aren't actively hiring right now, but we're always open to hearing from people who fit our line of work. Roles marked open are accepting applications today.</p></div>
        <div>
          {JOBS.map((j) => (
            <div className="sac-job-row" key={j.id}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div className="sac-job-title">{j.title}</div>
                  {j.status === "open" ? (
                    <span className="sac-status-badge status-ongoing">OPEN</span>
                  ) : (
                    <span className="sac-status-badge" style={{ background: "var(--offwhite)", color: "var(--muted)" }}>NOT HIRING</span>
                  )}
                </div>
                <div className="sac-job-meta"><span><Briefcase size={13} style={{ display: "inline", marginRight: 4 }} />{j.department}</span><span><MapPin size={13} style={{ display: "inline", marginRight: 4 }} />{j.location}</span><span>{j.type}</span></div>
                <div className="sac-job-desc">{j.description}</div>
              </div>
              {j.status === "open" ? (
                <button className="sac-btn sac-btn-secondary" onClick={() => setSelectedJob(j)} style={{ flexShrink: 0 }}>Apply</button>
              ) : (
                <span style={{ flexShrink: 0, fontSize: 13, color: "var(--muted)" }}>Not hiring</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- BLOG */

function BlogPage() {
  const [selected, setSelected] = useState(null);
  if (selected) {
    return (
      <section className="sac-section">
        <div className="sac-wrap" style={{ maxWidth: 720 }}>
          <button className="sac-back-link" onClick={() => setSelected(null)}><ChevronLeft size={15} /> Back to news</button>
          <div className="sac-blog-meta"><Newspaper size={13} />{selected.category} &middot; {selected.date}</div>
          <h2 style={{ fontSize: 30, margin: "12px 0 28px" }}>{selected.title}</h2>
          <div className="sac-post-body">{selected.body.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </section>
    );
  }
  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-section-head"><div className="sac-kicker">News &amp; insights</div><h2>Notes from the field</h2></div>
        <div className="sac-blog-grid">
          {BLOG_POSTS.map((post) => (
            <button className="sac-blog-card" key={post.id} onClick={() => setSelected(post)}>
              <div className="sac-blog-meta">{post.category} &middot; {post.date}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ CONTACT */

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) { setError("Please fill in all fields before sending."); return; }
    setError(""); setSaving(true);
    try {
      await apiFetch("/api/portal/messages", { method: "POST", body: JSON.stringify(form) });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not send your message. Please check your connection and try again.");
    }
    setSaving(false);
  };

  return (
    <section className="sac-section">
      <div className="sac-wrap sac-contact-grid">
        <div>
          <div className="sac-kicker">Contact</div>
          <h2 style={{ fontSize: 30, marginBottom: 20 }}>Reach our team</h2>
          <div className="sac-office-list">
            <div className="sac-office-item"><Phone size={18} /><div><h4>Phone</h4><p>Available for calls during business hours, nationwide.</p></div></div>
            <div className="sac-office-item"><Mail size={18} /><div><h4>Email</h4><p>info@samamiableconstruction.com (placeholder, to be confirmed)</p></div></div>
            <div className="sac-office-item"><MapPin size={18} /><div><h4>Head office</h4><p>Lagos, with field teams operating across 12+ states.</p></div></div>
          </div>
        </div>
        {submitted ? (
          <div className="sac-success-panel"><CheckCircle2 size={28} /><h3 style={{ fontSize: 18 }}>Message sent</h3><p style={{ color: "var(--muted)", fontSize: 14 }}>Thanks, {form.name.split(" ")[0]}. We'll get back to you at {form.email} soon.</p></div>
        ) : (
          <form className="sac-form" onSubmit={submit}>
            {error && <div className="sac-form-error">{error}</div>}
            <div className="sac-form-row">
              <Field label="Full name" required><input value={form.name} onChange={update("name")} placeholder="Your name" /></Field>
              <Field label="Phone number" required><input value={form.phone} onChange={update("phone")} placeholder="080..." /></Field>
            </div>
            <Field label="Email address" required><input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" /></Field>
            <Field label="Message" required><textarea value={form.message} onChange={update("message")} placeholder="How can we help?" /></Field>
            <button className="sac-btn sac-btn-primary" type="submit" disabled={saving}>{saving ? "Sending..." : "Send message"}</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- PORTAL */

function PortalPage({ currentUser, setCurrentUser, token, setToken }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!currentUser || !token) return;
    setLoadingProjects(true);
    apiFetch("/api/portal/projects", { headers: authHeader(token) })
      .then((rows) => setProjects(rows))
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false));
  }, [currentUser, token]);

  const login = async (e) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const data = await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: form.email, password: form.password }) });
      if (data.user.role !== "client") { setError("This account doesn't have client access."); setSubmitting(false); return; }
      setCurrentUser(data.user); setToken(data.token);
      saveSession(CLIENT_SESSION_KEY, { user: data.user, token: data.token });
    } catch (err) {
      setError(err.message || "Could not log in. Please try again.");
    }
    setSubmitting(false);
  };

  const signup = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in your name, email, and a password."); return; }
    setError(""); setSubmitting(true);
    try {
      const data = await apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify(form) });
      setCurrentUser(data.user); setToken(data.token);
      saveSession(CLIENT_SESSION_KEY, { user: data.user, token: data.token });
    } catch (err) {
      setError(err.message || "Could not create your account. Please try again.");
    }
    setSubmitting(false);
  };

  const logout = () => {
    setCurrentUser(null); setToken(null); setProjects(null);
    clearSession(CLIENT_SESSION_KEY);
    setForm({ name: "", email: "", phone: "", company: "", password: "" });
    setMode("login");
  };

  if (currentUser) {
    return (
      <section className="sac-section">
        <div className="sac-wrap">
          <div className="sac-dash-header">
            <h2 style={{ fontSize: 26 }}>Welcome back, {currentUser.name.split(" ")[0]}</h2>
            <button className="sac-logout-btn" onClick={logout}><LogOut size={15} /> Log out</button>
          </div>
          <p className="sac-dash-welcome">Here is the current status of your projects with Samamiable Construction.</p>
          {loadingProjects ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}><Loader2 size={22} className="sac-spin" /></div>
          ) : (!projects || projects.length === 0) ? (
            <div className="sac-success-panel">
              <ClipboardList size={26} />
              <h3 style={{ fontSize: 18 }}>No projects linked yet</h3>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>Once your first project is scoped, its status and progress will appear here.</p>
            </div>
          ) : (
            projects.map((p) => (
              <div className="sac-tracker-card" key={p.id}>
                <div className="sac-tracker-top">
                  <div>
                    <h3 style={{ fontSize: 18 }}>{p.name}</h3>
                    <div className="sac-tracker-meta" style={{ marginTop: 6 }}><span><MapPin size={13} style={{ display: "inline", marginRight: 4 }} />{p.location}</span><span>{p.type}</span></div>
                  </div>
                  <StatusBadge status={p.status === "In progress" ? "Ongoing" : p.status} />
                </div>
                <div className="sac-progress-track"><div className="sac-progress-fill" style={{ width: p.progress + "%" }} /></div>
                <div className="sac-tracker-meta"><span>{p.progress}% complete</span><span>Next: {p.next_milestone}</span></div>
                <div className="sac-tracker-update">{p.last_update}</div>
              </div>
            ))
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-auth-shell">
          <div className="sac-auth-side">
            <div>
              <h2>Client portal</h2>
              <p>Log in to see live status, progress, and updates on your project with Samamiable Construction.</p>
            </div>
            <div className="sac-demo-box">This is connected to a real, permanent account system. Create an account below to try it out.</div>
          </div>
          <div className="sac-auth-main">
            <div className="sac-auth-tabs">
              <button className={"sac-auth-tab" + (mode === "login" ? " active" : "")} onClick={() => { setMode("login"); setError(""); }}>Log in</button>
              <button className={"sac-auth-tab" + (mode === "signup" ? " active" : "")} onClick={() => { setMode("signup"); setError(""); }}>Create account</button>
            </div>
            {error && <div className="sac-form-error" style={{ marginBottom: 18 }}>{error}</div>}
            {mode === "login" ? (
              <form className="sac-form" onSubmit={login}>
                <Field label="Email address" required><input type="email" value={form.email} onChange={update("email")} /></Field>
                <Field label="Password" required><input type="password" value={form.password} onChange={update("password")} /></Field>
                <button className="sac-btn sac-btn-primary" type="submit" disabled={submitting}><Lock size={15} /> {submitting ? "Logging in..." : "Log in"}</button>
              </form>
            ) : (
              <form className="sac-form" onSubmit={signup}>
                <div className="sac-form-row">
                  <Field label="Full name" required><input value={form.name} onChange={update("name")} /></Field>
                  <Field label="Phone number"><input value={form.phone} onChange={update("phone")} /></Field>
                </div>
                <Field label="Email address" required><input type="email" value={form.email} onChange={update("email")} /></Field>
                <Field label="Company (optional)"><input value={form.company} onChange={update("company")} /></Field>
                <Field label="Password" required hint="At least 8 characters"><input type="password" value={form.password} onChange={update("password")} /></Field>
                <button className="sac-btn sac-btn-primary" type="submit" disabled={submitting}>{submitting ? "Creating account..." : "Create account"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- ADMIN */

function emptyProject() {
  return { id: "p_" + Date.now(), title: "", status: "Planning", sector: "Residential", service: "contracting", location: "", year: String(new Date().getFullYear()), description: "", stages: [], reviews: [], isSample: false };
}

function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState(project);
  const [photoError, setPhotoError] = useState("");
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const updateStage = (i, k, v) => setForm((f) => { const stages = [...f.stages]; stages[i] = { ...stages[i], [k]: v }; return { ...f, stages }; });
  const addStage = () => setForm((f) => ({ ...f, stages: [...f.stages, { title: "", description: "", imageUrl: "" }] }));
  const removeStage = (i) => setForm((f) => ({ ...f, stages: f.stages.filter((_, idx) => idx !== i) }));

  const handleStagePhoto = async (i, file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setPhotoError("Please choose an image file (JPG, PNG, etc.)."); return; }
    try {
      const dataUrl = await readAndCompressImage(file);
      updateStage(i, "imageUrl", dataUrl);
      setPhotoError("");
    } catch (err) {
      setPhotoError(err.message || "Could not process that photo. Try a different file.");
    }
  };

  const updateReview = (i, k, v) => setForm((f) => { const reviews = [...f.reviews]; reviews[i] = { ...reviews[i], [k]: v }; return { ...f, reviews }; });
  const addReview = () => setForm((f) => ({ ...f, reviews: [...f.reviews, { author: "", role: "", rating: 5, quote: "" }] }));
  const removeReview = (i) => setForm((f) => ({ ...f, reviews: f.reviews.filter((_, idx) => idx !== i) }));

  const submit = (e) => { e.preventDefault(); if (!form.title || !form.location) return; onSave(form); };

  return (
    <form className="sac-form-panel sac-form" onSubmit={submit}>
      <div className="sac-form-row">
        <Field label="Project title" required><input value={form.title} onChange={update("title")} /></Field>
        <Field label="Status" required><select value={form.status} onChange={update("status")}><option>Planning</option><option>Ongoing</option><option>Completed</option></select></Field>
      </div>
      <div className="sac-form-row">
        <Field label="Sector"><select value={form.sector} onChange={update("sector")}><option>Residential</option><option>Commercial</option><option>Government</option></select></Field>
        <Field label="Service"><select value={form.service} onChange={update("service")}>{SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
      </div>
      <div className="sac-form-row">
        <Field label="Location" required><input value={form.location} onChange={update("location")} /></Field>
        <Field label="Year"><input value={form.year} onChange={update("year")} /></Field>
      </div>
      <Field label="Description"><textarea value={form.description} onChange={update("description")} /></Field>

      <div>
        <label style={{ fontSize: 13.5, fontWeight: 600, color: "var(--blue-deep)", marginBottom: 10, display: "block" }}>Project stages</label>
        {photoError && <div className="sac-form-error" style={{ marginBottom: 12 }}>{photoError}</div>}
        {form.stages.map((s, i) => (
          <div className="sac-stage-row" key={i}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input placeholder="Stage title" value={s.title} onChange={(e) => updateStage(i, "title", e.target.value)} />
              <textarea placeholder="Stage description" value={s.description} onChange={(e) => updateStage(i, "description", e.target.value)} style={{ minHeight: 60 }} />
              {s.imageUrl ? (
                <div className="sac-photo-preview">
                  <img src={s.imageUrl} alt="Stage" />
                  <button type="button" className="sac-btn sac-btn-secondary sac-btn-sm" onClick={() => updateStage(i, "imageUrl", "")}>Remove photo</button>
                </div>
              ) : (
                <label className="sac-photo-upload-btn">
                  <ImagePlus size={15} /> Add a photo
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleStagePhoto(i, e.target.files[0])} />
                </label>
              )}
            </div>
            <button type="button" className="sac-btn-icon" onClick={() => removeStage(i)}><Trash2 size={15} /></button>
          </div>
        ))}
        <button type="button" className="sac-add-row-btn" onClick={addStage}><Plus size={15} /> Add stage</button>
      </div>

      <div>
        <label style={{ fontSize: 13.5, fontWeight: 600, color: "var(--blue-deep)", marginBottom: 10, display: "block" }}>Client reviews</label>
        {form.reviews.map((r, i) => (
          <div className="sac-review-row" key={i}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input placeholder="Author name" value={r.author} onChange={(e) => updateReview(i, "author", e.target.value)} style={{ flex: 1 }} />
                <input placeholder="Role (optional)" value={r.role} onChange={(e) => updateReview(i, "role", e.target.value)} style={{ flex: 1 }} />
                <select value={r.rating} onChange={(e) => updateReview(i, "rating", Number(e.target.value))}>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <textarea placeholder="Review quote" value={r.quote} onChange={(e) => updateReview(i, "quote", e.target.value)} style={{ minHeight: 50 }} />
            </div>
            <button type="button" className="sac-btn-icon" onClick={() => removeReview(i)}><Trash2 size={15} /></button>
          </div>
        ))}
        <button type="button" className="sac-add-row-btn" onClick={addReview}><Plus size={15} /> Add review</button>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="sac-btn sac-btn-primary" type="submit">Save project</button>
        <button className="sac-btn sac-btn-secondary" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const data = await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email: form.email, password: form.password }) });
      if (data.user.role !== "admin") { setError("This account doesn't have admin access."); setSubmitting(false); return; }
      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.message || "Could not sign in. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <section className="sac-section">
      <div className="sac-wrap" style={{ maxWidth: 420 }}>
        <div className="sac-form-panel">
          <div className="sac-kicker">Admin</div>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>Admin sign in</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Restricted area, company use only.</p>
          {error && <div className="sac-form-error" style={{ marginBottom: 16 }}>{error}</div>}
          <form className="sac-form" onSubmit={submit}>
            <Field label="Email address" required><input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></Field>
            <Field label="Password" required><input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} /></Field>
            <button className="sac-btn sac-btn-primary" type="submit" disabled={submitting}><Lock size={15} /> {submitting ? "Signing in..." : "Sign in"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function LogoSettings({ token, currentLogo, onLogoUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please choose an image file (JPG, PNG, etc.)."); return; }
    setError(""); setSuccess(false); setUploading(true);
    try {
      const dataUrl = await readAndCompressImage(file, 700, 0.85);
      await apiFetch("/api/settings/logo", { method: "PUT", headers: authHeader(token), body: JSON.stringify({ value: dataUrl }) });
      onLogoUpdated(dataUrl);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Could not update the logo. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="sac-form-panel" style={{ marginBottom: 24, maxWidth: 520 }}>
      <h3 style={{ fontSize: 18, marginBottom: 6 }}>Site logo</h3>
      <p style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 18 }}>
        Used in the header and homepage across the whole site. Upload a new image any time to replace it &mdash; no code changes needed.
      </p>
      {error && <div className="sac-form-error" style={{ marginBottom: 16 }}>{error}</div>}
      {success && <div className="sac-success-panel" style={{ padding: 16, marginBottom: 16, flexDirection: "row", alignItems: "center", gap: 10 }}><CheckCircle2 size={18} /><span style={{ fontSize: 13.5 }}>Logo updated across the site.</span></div>}
      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <img src={currentLogo || LOGO_SMALL} alt="Current site logo" style={{ height: 64, borderRadius: 8, border: "1px solid var(--line)" }} />
        <label className="sac-photo-upload-btn">
          <ImagePlus size={15} /> {uploading ? "Uploading..." : "Change logo"}
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

function HeroImagesSettings({ token, images, onImagesUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const saveImages = async (updated) => {
    await apiFetch("/api/settings/heroImages", { method: "PUT", headers: authHeader(token), body: JSON.stringify({ value: JSON.stringify(updated) }) });
    onImagesUpdated(updated);
  };

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please choose an image file."); return; }
    setError(""); setUploading(true);
    try {
      const dataUrl = await readAndCompressImage(file, 1400, 0.78);
      await saveImages([...images, dataUrl]);
    } catch (err) {
      setError(err.message || "Could not add this photo. Please try again.");
    }
    setUploading(false);
  };

  const removeImage = async (i) => {
    setError("");
    try {
      await saveImages(images.filter((_, idx) => idx !== i));
    } catch (err) {
      setError(err.message || "Could not remove this photo.");
    }
  };

  return (
    <div className="sac-form-panel" style={{ marginBottom: 24, maxWidth: 640 }}>
      <h3 style={{ fontSize: 18, marginBottom: 6 }}>Homepage background photos</h3>
      <p style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 18 }}>
        A rotating photo slideshow behind the homepage headline. Add real site or project photos any time.
        With none added, a plain animated background is shown instead of a broken slideshow.
      </p>
      {error && <div className="sac-form-error" style={{ marginBottom: 16 }}>{error}</div>}
      {images.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          {images.map((src, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={src} alt="" style={{ width: 110, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid var(--line)" }} />
              <button type="button" className="sac-btn-icon" style={{ position: "absolute", top: -8, right: -8, background: "var(--white)" }} onClick={() => removeImage(i)} aria-label="Remove photo"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      )}
      <label className="sac-photo-upload-btn">
        <ImagePlus size={15} /> {uploading ? "Uploading..." : "Add a photo"}
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} disabled={uploading} />
      </label>
    </div>
  );
}

function AdminDashboard({ portfolio, refreshPortfolio, token, onLogout, logoUrl, onLogoUpdated, heroImages, onHeroImagesUpdated }) {
  const [tab, setTab] = useState("projects");
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState("");
  const [inquiries, setInquiries] = useState(null);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const saveProject = async (proj) => {
    const exists = portfolio.some((p) => p.id === proj.id);
    setActionError("");
    try {
      if (exists) {
        await apiFetch("/api/projects/" + encodeURIComponent(proj.id), { method: "PUT", headers: authHeader(token), body: JSON.stringify(proj) });
      } else {
        await apiFetch("/api/projects", { method: "POST", headers: authHeader(token), body: JSON.stringify(proj) });
      }
      await refreshPortfolio();
      setEditing(null);
    } catch (err) {
      setActionError(err.message || "Could not save this project.");
    }
  };

  const deleteProject = async (id) => {
    setActionError("");
    try {
      await apiFetch("/api/projects/" + encodeURIComponent(id), { method: "DELETE", headers: authHeader(token) });
      await refreshPortfolio();
    } catch (err) {
      setActionError(err.message || "Could not delete this project.");
    }
  };

  const loadInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const [quotes, applications, messages] = await Promise.all([
        apiFetch("/api/portal/quotes", { headers: authHeader(token) }),
        apiFetch("/api/portal/applications", { headers: authHeader(token) }),
        apiFetch("/api/portal/messages", { headers: authHeader(token) }),
      ]);
      setInquiries({ quotes, applications, messages });
    } catch (err) {
      setInquiries({ quotes: [], applications: [], messages: [] });
    }
    setLoadingInquiries(false);
  };

  useEffect(() => { if (tab === "inquiries" && inquiries === null) loadInquiries(); }, [tab]);

  if (editing) {
    return (
      <section className="sac-section">
        <div className="sac-wrap" style={{ maxWidth: 720 }}>
          <button className="sac-back-link" onClick={() => setEditing(null)}><ArrowLeft size={15} /> Back to admin</button>
          <h2 style={{ fontSize: 24, marginBottom: 20 }}>{portfolio.some((p) => p.id === editing.id) ? "Edit project" : "Add project"}</h2>
          {actionError && <div className="sac-form-error" style={{ marginBottom: 16 }}>{actionError}</div>}
          <ProjectForm project={editing} onSave={saveProject} onCancel={() => setEditing(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="sac-section">
      <div className="sac-wrap">
        <div className="sac-dash-header">
          <h2 style={{ fontSize: 26 }}>Admin dashboard</h2>
          <button className="sac-logout-btn" onClick={onLogout}><LogOut size={15} /> Log out</button>
        </div>
        <div className="sac-admin-tabs">
          <button className={"sac-admin-tab" + (tab === "projects" ? " active" : "")} onClick={() => setTab("projects")}><LayoutDashboard size={15} /> Portfolio projects</button>
          <button className={"sac-admin-tab" + (tab === "inquiries" ? " active" : "")} onClick={() => setTab("inquiries")}><Inbox size={15} /> Inquiries</button>
          <button className={"sac-admin-tab" + (tab === "logo" ? " active" : "")} onClick={() => setTab("logo")}><ImagePlus size={15} /> Homepage</button>
        </div>

        {tab === "logo" && (
          <>
            <LogoSettings token={token} currentLogo={logoUrl} onLogoUpdated={onLogoUpdated} />
            <HeroImagesSettings token={token} images={heroImages || []} onImagesUpdated={onHeroImagesUpdated} />
          </>
        )}

        {tab === "projects" && (
          <>
            {actionError && <div className="sac-form-error" style={{ marginBottom: 16 }}>{actionError}</div>}
            <button className="sac-btn sac-btn-primary" style={{ marginBottom: 24 }} onClick={() => setEditing(emptyProject())}><Plus size={16} /> Add new project</button>
            {portfolio.map((p) => (
              <div className="sac-admin-row" key={p.id}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                    <strong style={{ fontFamily: "var(--font-display)", color: "var(--blue-deep)" }}>{p.title}</strong>
                    <StatusBadge status={p.status} />
                    {p.isSample && <span className="sac-sample-tag">Sample</span>}
                  </div>
                  <div className="sac-inquiry-meta">{p.sector} &middot; {p.location} &middot; {p.year} &middot; {(p.stages || []).length} stages &middot; {(p.reviews || []).length} reviews</div>
                </div>
                <div className="sac-admin-row-actions">
                  <button className="sac-btn-icon" onClick={() => setEditing(p)}><Pencil size={15} /></button>
                  <button className="sac-btn-icon" onClick={() => deleteProject(p.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "inquiries" && (
          <>
            <button className="sac-btn sac-btn-secondary sac-btn-sm" style={{ marginBottom: 24 }} onClick={loadInquiries}><RefreshCw size={14} /> Refresh</button>
            {loadingInquiries || inquiries === null ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}><Loader2 size={20} className="sac-spin" /></div>
            ) : (
              <>
                <h3 style={{ fontSize: 17, marginBottom: 12 }}>Quote requests ({inquiries.quotes.length})</h3>
                {inquiries.quotes.length === 0 && <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>None yet.</p>}
                {inquiries.quotes.map((q) => (
                  <div className="sac-inquiry-card" key={q.id}>
                    <strong>{q.name}</strong> &mdash; {q.service} ({q.client_type || "n/a"})
                    <div className="sac-inquiry-meta">{q.email} &middot; {q.phone} &middot; {q.state || "n/a"} &middot; {q.budget || "no budget given"}</div>
                    <p style={{ fontSize: 13.5, marginTop: 8 }}>{q.details}</p>
                  </div>
                ))}

                <h3 style={{ fontSize: 17, margin: "32px 0 12px" }}>Job applications ({inquiries.applications.length})</h3>
                {inquiries.applications.length === 0 && <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>None yet.</p>}
                {inquiries.applications.map((a) => (
                  <div className="sac-inquiry-card" key={a.id}>
                    <strong>{a.name}</strong> &mdash; applying for {a.job_title || "n/a"}
                    <div className="sac-inquiry-meta">{a.email} &middot; {a.phone}</div>
                    {a.message && <p style={{ fontSize: 13.5, marginTop: 8 }}>{a.message}</p>}
                  </div>
                ))}

                <h3 style={{ fontSize: 17, margin: "32px 0 12px" }}>Contact messages ({inquiries.messages.length})</h3>
                {inquiries.messages.length === 0 && <p style={{ color: "var(--muted)", fontSize: 14 }}>None yet.</p>}
                {inquiries.messages.map((c) => (
                  <div className="sac-inquiry-card" key={c.id}>
                    <strong>{c.name}</strong>
                    <div className="sac-inquiry-meta">{c.email} &middot; {c.phone}</div>
                    <p style={{ fontSize: 13.5, marginTop: 8 }}>{c.message}</p>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function AdminPage({ portfolio, refreshPortfolio, adminUser, setAdminUser, adminToken, setAdminToken, logoUrl, onLogoUpdated, heroImages, onHeroImagesUpdated }) {
  if (!adminUser) {
    return (
      <AdminLogin
        onLogin={(user, token) => {
          setAdminUser(user);
          setAdminToken(token);
          saveSession(ADMIN_SESSION_KEY, { user, token });
        }}
      />
    );
  }
  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    clearSession(ADMIN_SESSION_KEY);
  };
  return <AdminDashboard portfolio={portfolio} refreshPortfolio={refreshPortfolio} token={adminToken} onLogout={logout} logoUrl={logoUrl} onLogoUpdated={onLogoUpdated} heroImages={heroImages} onHeroImagesUpdated={onHeroImagesUpdated} />;
}

/* ---------------------------------------------------------------- APP */

export default function App() {
  const [page, setPage] = useState("home");

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  const [portfolio, setPortfolio] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);

  const [logoUrl, setLogoUrl] = useState(null);

  const refreshPortfolio = async () => {
    try {
      const data = await apiFetch("/api/projects");
      setPortfolio(data);
    } catch (e) {
      setPortfolio([]);
    }
  };

  useEffect(() => {
    const clientSession = loadSession(CLIENT_SESSION_KEY);
    if (clientSession && clientSession.user && clientSession.token) {
      setCurrentUser(clientSession.user);
      setToken(clientSession.token);
    }
    const adminSession = loadSession(ADMIN_SESSION_KEY);
    if (adminSession && adminSession.user && adminSession.token) {
      setAdminUser(adminSession.user);
      setAdminToken(adminSession.token);
    }

    (async () => {
      setLoadingPortfolio(true);
      await refreshPortfolio();
      setLoadingPortfolio(false);
    })();

    apiFetch("/api/settings/logo")
      .then((data) => setLogoUrl(data.value))
      .catch(() => {}); // no custom logo set yet — the built-in default is used
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div className="sac-root sac-shell">
      <GlobalStyles />
      <Header page={page} setPage={setPage} currentUser={currentUser} logoUrl={logoUrl} />
      <main className="sac-main">
        {page === "home" && <HomePage setPage={setPage} portfolio={portfolio} logoUrl={logoUrl} />}
        {page === "about" && <AboutPage />}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "portfolio" && <PortfolioPage portfolio={portfolio} loading={loadingPortfolio} />}
        {page === "quote" && <QuotePage />}
        {page === "careers" && <CareersPage />}
        {page === "blog" && <BlogPage />}
        {page === "contact" && <ContactPage />}
        {page === "portal" && (
          <PortalPage currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setToken={setToken} />
        )}
        {page === "admin" && (
          <AdminPage
            portfolio={portfolio}
            refreshPortfolio={refreshPortfolio}
            adminUser={adminUser}
            setAdminUser={setAdminUser}
            adminToken={adminToken}
            setAdminToken={setAdminToken}
            logoUrl={logoUrl}
            onLogoUpdated={setLogoUrl}
          />
        )}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
