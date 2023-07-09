const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const Game = require("../Models/gameModel");
const User = require("../Models/userModel");


// @desc  POST CREATE GAME
// @route POST /api/games/create
// @access private
const createGame = expressAsyncHandler(async (req, res) => {
    const {name, events} = req.body;

    if(!name && !events){
        res.status(400);
        throw new Error("Please Add All Fields.");
    }

    const game = await Game.create({
        user : req.user.id,
        name,
        events
    })

    if(game){
        res.status(201).json({
            _id : game._id,
            user : game.user,
            name : game.name,
            events : game.events
        })
    }else {
        res.status(400);
        throw new Error("Invalid Game Data.");
    }

})

// @desc  POST GET ALL GAMEs
// @route POST /api/games
// @access private
const getGame = expressAsyncHandler(async(req, res) => {
    const games = await Game.find({});

    if(games){
        res.status(201).json(games)
    }else {
        res.status(400)
        throw new Error("Cannot Get.")
    }
})

// @desc  POST UPDATE SINGLE GAME
// @route POST /api/games/update
// @access private
const updateGame = expressAsyncHandler(async(req, res) => {
    const game = await Game.findById(req.params.id)
    console.log(game)
    if(!game){
        throw new Error("Game Not Found.")
    }

    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401);
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(game.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }

    const updatedGame = await Game.findByIdAndUpdate(game, req.body, {new : true})

    if(updatedGame){
        res.status(201).json(updatedGame)
    }else {
        res.status(400)
        throw new Error("Cannot Update.")
    }
})

// @desc  DELETE game
// @route DELETE /api/game
// @access private
const deleteGame = expressAsyncHandler(async(req, res) => {
    const game = await Game.findById(req.params.id);

    if(!game) {
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

    if(game.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }
    await Game.findByIdAndDelete(req.params.id)
    res.status(200).json({id : req.params.id})
})
module.exports = {
    createGame,
    getGame,
    updateGame,
    deleteGame
}