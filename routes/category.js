const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication.js");
const CategoryController = require("../controllers/CategoryController.js");

router.get(
  "/api/categories",
  authentication,
  CategoryController.findCategories
);

router.get(
  "/api/categories/:categoryId",
  authentication,
  CategoryController.findCategory
);

router.post(
  "/api/categories",
  authentication,
  CategoryController.createCategory
);

router.put(
  "/api/categories/:categoryId",
  authentication,
  CategoryController.updateCategory
);

router.delete(
  "/api/categories/:categoryId",
  authentication,
  CategoryController.deleteCategory
);

module.exports = router;
