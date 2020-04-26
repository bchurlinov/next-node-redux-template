require("dotenv").config();
const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const connectDB = require("./db");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({dev});
const handle = app.getRequestHandler();
require("./passport");

app.prepare().then(() => {

    const server = express();
    connectDB();

    server.use(express.json({extended: false}));
    server.use(cookieParser());
    server.use(passport.initialize());
    server.use(passport.session());

    server.use(session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
        },
        saveUninitialized: true,
        resave: true,
        store: new MongoStore({
            url: process.env.MONGO_URI,
            ttl: 14 * 24 * 60 * 60 // save session for 14 days
        })
    }))

    //Routes
    server.use("/api/auth", require("./routes/api/auth/index"));

    server.get("*", (req, res) => {
        handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Server running on PORT ${port}`);
    });

});
