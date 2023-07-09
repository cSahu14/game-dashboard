const mongoose = require("mongoose")

const scoreSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    match : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Match"
    },
},
{
    timestamps : true
})

module.exports = mongoose.model("Score", scoreSchema)
