const express = require("express")
const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const Team = require("../Models/teamModel");


// @desc  POST CREATE TEAM
// @route POST /api/team/create
// @access private
const createTeam = expressAsyncHandler(async (req, res) => {

    const team = await Team.create({
        user : req.user.id,
        ...req.body
    })

    if(team){
        res.status(201).json({
            message : "Team Created Successfully"
        })
    }else {
        res.status(400);
        throw new Error("Invalid Team Data.");
    }

})

// @desc  POST GET ALL Teams
// @route POST /api/team
// @access private
const getTeams = expressAsyncHandler(async(req, res) => {
    const team = await Team.find({});

    if(team){
        res.status(201).json(team)
    }else {
        res.status(400)
        throw new Error("Cannot Get.")
    }
})

// @desc  POST UPDATE SINGLE Team
// @route POST /api/team/update
// @access private
const updateTeam = expressAsyncHandler(async(req, res) => {
    const team = await Team.findById(req.params.id)

    if(!team){
        throw new Error("Player Not Found.")
    }

    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401);
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(team.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }

    const updatedTeam = await Team.findByIdAndUpdate(team, req.body, {new : true})

    if(updatedTeam){
        res.status(201).json(updatedTeam)
    }else {
        res.status(400)
        throw new Error("Cannot Update.")
    }
})

// @desc  DELETE TEAM
// @route DELETE /api/team
// @access private
const deleteTeam = expressAsyncHandler(async(req, res) => {
    const team = await Team.findById(req.params.id);

    if(!team) {
        res.status(400)
        throw new Error("Team not found")
    }


    const user = await User.findById(req.user.id)
    // Check user
    if(!user){
        res.status(401); 
        throw new Error("User Not Found.")
    }

    // Make sure the logged in user matches the goal

    if(team.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not Authorized.")
    }
    await Team.findByIdAndDelete(req.params.id)
    res.status(200).json({id : req.params.id})
})
module.exports = {
    createTeam,
    getTeams,
    updateTeam,
    deleteTeam
}