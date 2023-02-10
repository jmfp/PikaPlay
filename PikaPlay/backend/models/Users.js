const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    userName: {
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel