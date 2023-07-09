const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { createMatch, getMatch, updateMatch, deleteMatch } = require("../controllers/matchController");


router.post("/create", protect, createMatch)
router.get("/", protect, getMatch)
router.put("/update/:id", protect, updateMatch)
router.delete("/delete/:id", protect, deleteMatch)

module.exports = router;