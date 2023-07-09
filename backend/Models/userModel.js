const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please provide name field."]
    },
    email : {
        type : String,
        required : [true, "Please provide email field."],
        unnique : true
    },
    password : {
        type : String,
        required : [true, "Please provide password field."]
    },
},
{
    timestamps : true
})

module.exports = mongoose.model("User", userSchema)
