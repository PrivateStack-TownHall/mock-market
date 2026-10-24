const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 1500;
const dataDir = path.join(__dirname, "data");

// Load all JSON files from the data directory
function loadData() {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  const db = {};
  files.forEach((file) => {
    const key = path.basename(file, ".json");
    const content = fs.readFileSync(path.join(dataDir, file), "utf-8");
    db[key] = JSON.parse(content);
  });
  return db;
}

let db = loadData();
let router = jsonServer.router(db);

// Enable CORS
app.use(cors());

// Express body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Minimal Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`,
    );
  });
  next();
});

// Serve frontend static assets from src folder
app.use(express.static(path.join(__dirname, "src")));
// Serve raw datasets under /data
app.use("/data", express.static(path.join(__dirname, "data")));

// Helper metadata function
function getCatalogData(baseUrl) {
  const keys = Object.keys(db).sort();
  let totalItems = 0;
  const endpoints = {};

  keys.forEach((key) => {
    const count = Array.isArray(db[key]) ? db[key].length : 0;
    totalItems += count;
    endpoints[`/api/${key}`] = {
      name: key,
      itemCount: count,
      url: `${baseUrl}/api/${key}`,
    };
  });

  return {
    name: "Mock Market API",
    description: `Mock RESTful API server with ${keys.length} modular collections and ${totalItems} records. Full CRUD, search, filter, and pagination enabled.`,
    totalEndpoints: keys.length,
    totalItems: totalItems,
    endpoints: endpoints,
    queryFeatures: {
      pagination: "/api/products?_page=1&_limit=10",
      sorting: "/api/products?_sort=price&_order=desc",
      filtering: "/api/users?role=developer",
      rangeFilter: "/api/products?price_gte=100&price_lte=500",
      fullTextSearch: "/api/articles?q=react",
      relationships: "/api/orders?userId=1",
      jsonCatalog: "/api?format=json",
    },
  };
}

// Catalog Handler: Serves JSON catalog if requested or requested via API/format=json, else serves HTML
function catalogHandler(req, res) {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const catalog = getCatalogData(baseUrl);

  // If client prefers JSON or query format=json
  if (req.accepts(["html", "json"]) === "json" || req.query.format === "json") {
    return res.json(catalog);
  }

  // Serve the frontend HTML dashboard
  res.sendFile(path.join(__dirname, "src", "index.html"));
}

// Catalog routes
app.get("/", catalogHandler);
app.get("/api", catalogHandler);
app.get("/catalog", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.json(getCatalogData(baseUrl));
});

// Hot reload route to re-read files from data/ without server restart
app.post("/api/__reload", (req, res) => {
  try {
    db = loadData();
    router = jsonServer.router(db);
    res.json({
      message:
        "All JSON collections successfully reloaded from data/ directory",
      totalEndpoints: Object.keys(db).length,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to reload data", details: err.message });
  }
});

// JSON Server REST router handles /api/*
app.use("/api", (req, res, next) => {
  return router(req, res, next);
});

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}. Check GET /api for available routes.`,
  });
});

// Start listening if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`  🚀 Json Raw Data API Server is running!`);
    console.log(`  🌐 Catalog Dashboard: http://localhost:${PORT}/`);
    console.log(`  📡 API Endpoint Root:  http://localhost:${PORT}/api`);
    console.log(`  📊 Loaded Collections: ${Object.keys(db).length} endpoints`);
    console.log(`=================================================\n`);
  });
}

module.exports = app;
