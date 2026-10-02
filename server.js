const express = require("express");
const bcrypt= require("bcrypt");
const path = require("path");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;
const cache =new Map();

const db = new Database("school.db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/hash-test", async (req, res) => {
    const password = "School@123";
    const passwordHash = await bcrypt.hash(password, 10);

    const correctPassword = await bcrypt.compare("School@123", passwordHash);
    const wrongPassword = await bcrypt.compare("WrongPassword", passwordHash);

    res.json({
        message: "Password security test successful",
        correctPassword: correctPassword,
        wrongPassword: wrongPassword
    });
});


app.get("/api/status", (req, res) => {

    const cachedData = cache.get("status");

    if (cachedData) {
        return res.json({
            ...cachedData,
            source: "cache"
        });
    }

    const data = {
        message: "School Management System is running",
        database: "Connected"
    };

    cache.set("status", data);

    res.json({
        ...data,
        source: "database"
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
