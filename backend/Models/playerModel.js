const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    name : {
        type : String,
        required : [true, "Please provide name field."],
    },
    age : {
        type : Number,
        required : [true, "Please provide age field."],
    },
    gender : {
        type : String,
        required : [true, "Please provide gender field."],
    },
    gamesAssociated : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Game"
    }],
    TeamsAssociated : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Team"
    }],
    TotalPoints : {
        type : Number,
    },
    MatchesPlayed : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Match"
    }],
    MatchesWon : {
        type : Number
    },
    MatchesLose : {
        type : Number
    }
},
{
    timestamps : true
})

module.exports = mongoose.model("Player", playerSchema)
