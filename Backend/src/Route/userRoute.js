const express = require("express");
const { signUp, signIn, getAllUser } = require("../Controller/user");

const router = express.Router();

router.post("/signup-user", signUp);

router.post("/signin-user", signIn);

router.get("/getalluser", getAllUser);

module.exports = router;