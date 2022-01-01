const router = require("express").Router();
const path = require("path");

// GET route to root (homepage) that responds by sending the correct html file (index.html)
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// GET route to /stats that responds by sending the correct html file (stats.html)
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// GET route to /exercise that responds by sending the correct html file (exercise.html)
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});



module.exports = router;