const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { createTeam, getTeams, updateTeam, deleteTeam } = require("../controllers/teamController");


router.post("/create", protect, createTeam)
router.get("/", protect, getTeams)
router.put("/update/:id", protect, updateTeam)
router.delete("/delete/:id", protect, deleteTeam)

module.exports = router;