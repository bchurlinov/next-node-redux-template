const express = require("express");
const router = express.Router();

const {register, login, checkAuth, getProfile, editProfile} = require("../../../controllers/Auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:id").get(getProfile);
router.route("/profile/:id").patch(editProfile);

module.exports = router;