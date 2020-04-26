const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const {email, password, firstName, lastName} = req.body;
    const user = await User.findOne({email: email});

    if (user) return res.status(400).json({message: "The user already exists"})

    const newUser = new User({email, password, firstName, lastName});

    await User.register(newUser, password, (err, user) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({message: "User saved successfully", user});
    });
}

exports.login = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {

        if(err) return res.status(500).json(err.message);
        if(!user) return res.status(400).json(info.message);

        req.login(user,err => {
            if(err) return res.status(500).json(err);

            req.session.username = user.email;

            const token = jwt.sign({id: user._id}, process.env.SECRECT_KEY, {expiresIn: 600000}, (err, token) => {
                if(err) throw err;

                req.session.token = token;
                res.json({user: user, token: token});
            });
        });

    })(req, res, next);
}

exports.checkAuth = (req, res, next) => {
    if(!req.session.username) res.redirect("/signin");
    // res.cookie("token", req.session.token, {maxAge: 90000000, httpOnly: true})

    const token = req.session.token;
    const now = Date.now().valueOf() / 1000;
    const verify = jwt.verify(token, process.env.SECRECT_KEY);

    if(now >= verify){
        res.send("Token is invalid")
    }

    next();
}

exports.getProfile = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findOne({_id: userId});

    if(!user) return res.status(400).json({message: "User does not exist"});
    res.status(200).json({user: user})
}

exports.editProfile = async (req,res) => {
    const userId = req.params.id;
    const user = await User.findOneAndUpdate({_id: userId}, {$set: {firstName: Math.random().toString(36).substring(7)}}, {new: true});
    res.status(200).json({message: "User Updated"})
}

