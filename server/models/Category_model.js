const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } // it will create createdDate or updatedDate
);

const Category = new model("Category", CategorySchema);

module.exports = Category;
