const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const Match = require("../Models/matchModel");


// @desc  POST CREATE MATCH
// @route POST /api/match/create
// @access private
const createMatch = expressAsyncHandler(async (req, res) => {

    const match = await Match.create({
        user : req.user.id,
        ...req.body
    })

    if(match){
        res.status(201).json({
            message : "Match Created Successfully"
        })
    }else {
        res.status(400);
        throw new Error("Invalid Match Data.");
    }

})

// @desc  POST GET ALL MATCHES
// @route POST /api/match
// @access private
const getMatch = expressAsyncHandler(async(req, res) => {
    const match = await Match.find({});

    if(match){
        res.status(201).json(match)
    }else {
        res.status(400)
        throw new Error("Cannot Get.")
    }
})

// @desc  POST UPDATE SINGLE Match
// @route POST /api/match/update
// @access private
const updateMatch = expressAsyncHandler(async(req, res) => {
    const match = await Match.findById(req.params.id)

    if(!match){
        throw new Error("Match Not Found.")
    }

    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401);
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(match.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }

    const updatedMatch = await Match.findByIdAndUpdate(match, req.body, {new : true})

    if(updatedMatch){
        res.status(201).json(updatedMatch)
    }else {
        res.status(400)
        throw new Error("Cannot Update.")
    }
})

// @desc  DELETE Match
// @route DELETE /api/match
// @access private
const deleteMatch = expressAsyncHandler(async(req, res) => {
    const match = await Match.findById(req.params.id);

    if(!match) {
        res.status(400)
        throw new Error("Match not found")
    }


    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401); 
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(match.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }
    await Match.findByIdAndDelete(req.params.id)
    res.status(200).json({id : req.params.id})
})
module.exports = {
    createMatch,
    getMatch,
    updateMatch,
    deleteMatch
}