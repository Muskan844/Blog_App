const { Schema, model } = require("mongoose");

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // so that nobody could create same username
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // it will create createdDate or updatedDate
);

const User = new model("User", UsersSchema);

module.exports = User;
