const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const path = require("path");
var cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const { log } = require("console");

// connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CSV_FILE_PATH = "C:\\Users\\ASUS\\Desktop\\storm_CtrlAltDefeat\\data.csv";
// const CSV_FILE_PATH = windowsFilePath.replace(/\\/g, "/");

app.use("/api/users", require("./routes/userRoutes"));
app.post("/api/addEntry", (req, res) => {
  const { url, isMalacious, maybeMalacious, isSafe } = req.body;

  try {
    // Read the existing CSV file synchronously
    const existingData = fs.readFileSync(CSV_FILE_PATH, "utf8");

    // Parse the CSV data
    const entries = [];
    const lines = existingData.trim().split("\n");

    if (lines.length > 0) {
      // Extract header from the first line
      const headers = lines[0].split(",");

      // Add the existing entries to the 'entries' array
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const entry = {};
        headers.forEach((header, index) => {
          entry[header] = values[index];
        });
        entries.push(entry);
      }
    }

    // Add the new entry
    entries.push({
      url,
      isMalacious,
      maybeMalacious,
      isSafe,
    });

    // Write the updated data back to the CSV file
    const ws = fs.createWriteStream(CSV_FILE_PATH);

    if (entries.length > 0) {
      // Write the header
      const headerRow = Object.keys(entries[0]).join(",");
      ws.write(`${headerRow}\n`);

      // Write the entries
      entries.forEach((entry) => {
        const values = Object.values(entry).join(",");
        ws.write(`${values}\n`);
      });
    }

    ws.end();

    res.json({ success: true, message: "Entry added successfully." });
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ success: false, message: "Error adding entry." });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`server started at port ${port}`));
