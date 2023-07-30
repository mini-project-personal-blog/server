const { Category } = require("../models");

class CategoryController {
  static async findCategories(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async findCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const data = await Category.findOne({
        where: {
          id: categoryId,
        },
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

  static async createCategory(req, res, next) {
    try {
      const { category } = req.body;
      const data = await Category.create({
        category,
      });
      res.status(201).json({ message: "Successfully create category!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { category } = req.body;

      const findCategory = await Category.findOne({
        where: { id: categoryId },
      });

      if (findCategory) {
        const data = await Category.update(
          { category },
          { where: { id: categoryId } }
        );
        res.status(200).json({ message: "Successfully update category!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;

      const findCategory = await Category.findOne({
        where: { id: categoryId },
      });

      if (findCategory) {
        const data = await Category.destroy({ where: { id: categoryId } });
        res.status(200).json({ message: "Successfully delete category!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
