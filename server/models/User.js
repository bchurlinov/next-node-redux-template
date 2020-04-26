const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: [true, "Please enter a valid e-mail address"],
            unique: true,
            match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
        },
        password: {
            type: String,
            minLength: 4,
            maxLength: 10,
            required: [true, "Please enter a password"]
        },
        firstName: {
            type: String,
            required: [true, "Please enter your name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter your last name"]
        },
    },
    {timestamps: true}
);

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

UserSchema.plugin(mongodbErrorHandler);

module.exports = User = mongoose.model("user", UserSchema);