const { Op } = require("sequelize");
const { User, Post, Comment, Category } = require("../models");

class PostController {
  static async findPosts(req, res, next) {
    try {
      const { title } = req.query;
      const where = {};

      if (title) {
        where.title = { [Op.iLike]: `%${title}%` };
      }

      const data = await Post.findAll({
        where,
        include: [
          {
            model: Category,
          },
        ],
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findPost(req, res, next) {
    try {
      const { postId } = req.params;
      const data = await Post.findOne({
        where: { id: postId },
        include: [
          {
            model: Category,
          },
          {
            model: Comment,
          },
          {
            model: User,
          },
        ],
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { category_id, title, content } = req.body;

      const data = await Post.create({
        user_id: id,
        category_id,
        title,
        content,
      });

      res.status(201).json({ message: "Successfully create post!" });
    } catch (err) {
      next(err);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { postId } = req.params;
      const { category_id, title, content } = req.body;

      const findPost = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (findPost) {
        const data = await Post.update(
          {
            category_id,
            title,
            content,
          },
          {
            where: { id: postId },
          }
        );
        res.status(200).json({ message: "Successfully update post!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      const findPost = await Post.findOne({
        where: {
          id: postId,
        },
      });
      if (findPost) {
        const data = await Post.destroy({
          where: { id: postId },
        });
        res.status(200).json({ message: "Successfully delete post!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  // comment
  static async addComment(req, res, next) {
    try {
      const { postId } = req.params;
      const { comment } = req.body;

      const findPost = await Post.findOne({ where: { id: postId } });

      if (findPost) {
        const data = await Comment.create({
          post_id: postId,
          comment,
        });
        res.status(201).json({ message: "Successfully add comment!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { postId, commentId } = req.params;

      const findComment = await Comment.findOne({ where: { id: commentId } });

      const findPost = await Post.findOne({ where: { id: postId } });

      if (findComment && findPost) {
        const data = await Comment.destroy({ where: { id: commentId } });
        res.status(200).json({ message: "Successfully delete comment!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PostController;
