const mongoose = require("mongoose")

const matchSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    game : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Game"
    },
    category : {
        type : String,
        required : true
    },
    playersAssociated : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Player"
    }],
    teamsAssociated : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Team"
    }],
    score : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Score"
    },
},
{
    timestamps : true
})

module.exports = mongoose.model("Match", matchSchema)
