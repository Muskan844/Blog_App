const router = require("express").Router();
const User = require("../models/User_model");
const Category = require("../models/Category_model");

//CREATE
router.post("/", async (req, res) => {
  const newCateg = new Category(req.body);
  try {
    const savedCateg = await newCateg.save();
    res.status(200).json(savedCateg);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const Categ = await Category.find();
    res.status(200).json(Categ);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
