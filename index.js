const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import Routers
const Internrouter = require("./router/Internrouter");
const helpinghandrouter = require("./router/helpinghandrouter");
const participaterouter = require("./router/participaterouter");
const contactrouter = require("./router/contactrouter");
const ourteamrouter = require("./router/ourteamrouter");

app.use("/api", Internrouter);
app.use("/api", helpinghandrouter);
app.use("/api", participaterouter);
app.use("/api", contactrouter);
app.use("/api", ourteamrouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running properly" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
