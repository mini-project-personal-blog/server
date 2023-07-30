const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController.js");

router.post("/api/login", UserController.login);

module.exports = router;
