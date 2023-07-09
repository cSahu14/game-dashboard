const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const Player = require("../Models/playerModel");
const User = require("../Models/userModel");


// @desc  POST CREATE PLAYER
// @route POST /api/player/create
// @access private
const createPlayer = expressAsyncHandler(async (req, res) => {

    const player = await Player.create({
        user : req.user.id,
        ...req.body
    })

    if(player){
        res.status(201).json({
            message : "Player Created Successfully"
        })
    }else {
        res.status(400);
        throw new Error("Invalid Player Data.");
    }

})

// @desc  POST GET ALL PLAYERS
// @route POST /api/players
// @access private
const getPlayers = expressAsyncHandler(async(req, res) => {
    const players = await Player.find({});

    if(players){
        res.status(201).json(players)
    }else {
        res.status(400)
        throw new Error("Cannot Get.")
    }
})

// @desc  POST UPDATE SINGLE Player
// @route POST /api/player/update
// @access private
const updatePlayer = expressAsyncHandler(async(req, res) => {
    const player = await Player.findById(req.params.id)

    if(!player){
        throw new Error("Player Not Found.")
    }

    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401);
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(player.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }

    const updatedPlayer = await Player.findByIdAndUpdate(player, req.body, {new : true})

    if(updatedPlayer){
        res.status(201).json(updatedPlayer)
    }else {
        res.status(400)
        throw new Error("Cannot Update.")
    }
})

// @desc  DELETE player
// @route DELETE /api/player
// @access private
const deletePlayer = expressAsyncHandler(async(req, res) => {
    const player = await Player.findById(req.params.id);

    if(!player) {
        res.status(400)
        throw new Error("Game not found")
    }


    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401); 
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(player.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }
    await Player.findByIdAndDelete(req.params.id)
    res.status(200).json({id : req.params.id})
})
module.exports = {
    createPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer
}