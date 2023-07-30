const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController.js");
const authentication = require("../middlewares/authentication.js");

router.get("/api/guest/posts", PostController.findPosts);
router.get("/api/guest/posts/:postId", PostController.findPost);

router.get("/api/posts", authentication, PostController.findPosts);
router.get("/api/posts/:postId", authentication, PostController.findPost);
router.post("/api/posts", authentication, PostController.createPost);
router.put("/api/posts/:postId", authentication, PostController.updatePost);
router.delete("/api/posts/:postId", authentication, PostController.deletePost);

router.post("/api/posts/:postId/comment", PostController.addComment);
router.delete(
  "/api/posts/:postId/comment/:commentId",
  PostController.deleteComment
);

module.exports = router;
