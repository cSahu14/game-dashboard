const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { createPlayer, getPlayers, updatePlayer, deletePlayer } = require("../controllers/playerController");


router.post("/create", protect, createPlayer)
router.get("/", protect, getPlayers)
router.put("/update/:id", protect, updatePlayer)
router.delete("/delete/:id", protect, deletePlayer)

module.exports = router;