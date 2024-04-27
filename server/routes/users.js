const router = require("express").Router();
const User = require("../models/User_model");
const Post = require("../models/Post_model");
const bcrypt = require("bcrypt"); //we can update our password also

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      //if there is password also to update
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //updating user
        },
        { new: true }
      ); // new updated user is sent as response
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account");
  }
});

//DELETE USER

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id); // now we can delete its posts
      try {
        await Post.deleteMany({ username: user.username }); // checking if (first username is field of post model)username contains this user's(which we have got using id(second user))username(i.e, username of second user which we have found)......if it is found, then it's post will be deleted from db
        await User.findByIdAndDelete(req.params.id); //after deleting user, we'll still see user's post....o first find user, find all posts, delete all and delete user
        res.status(200).json("User has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
