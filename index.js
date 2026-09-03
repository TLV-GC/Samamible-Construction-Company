// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const portalRoutes = require("./routes/portal");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true, service: "samamiable-construction-backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/portal", portalRoutes);

// Central error handler: anything thrown/rejected in a route lands here
// instead of leaking a stack trace to the client.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on our end. Please try again." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Samamiable Construction backend listening on port ${PORT}`);
});
