const express = require("express");
const router = express.Router();

const userRouter = require("./user.js");
const categoryRouter = require("./category.js");
const postRouter = require("./post.js");

router.use(userRouter);
router.use(categoryRouter);
router.use(postRouter);

module.exports = router;
