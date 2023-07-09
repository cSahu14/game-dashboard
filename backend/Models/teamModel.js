const mongoose = require("mongoose")

const teamSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    name : {
        type : String,
        required : [true, "Please provide name field."],
    },
    category : {
        type : String,
        required : [true, "Please provide age field."],
    },
    gamesAssociated : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Game"
    }],
    playersAssociated : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Player"
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

module.exports = mongoose.model("Team", teamSchema)
