const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { createGame, getGame, updateGame, deleteGame } = require("../controllers/gameController");


router.post("/create", protect, createGame)
router.get("/", protect, getGame)
router.put("/update/:id", protect, updateGame)
router.delete("/delete/:id", protect, deleteGame)

module.exports = router;