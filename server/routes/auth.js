const router = require("express").Router();
const User = require("../models/User_model");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  //not a normal function, it gonna connect to our db, create a new one and returns us a response( basically a controller)
  try {
    //we're gonna try to connect to our db and create a new user and all this process can also be failed, so to catch error we use trycatch
    //we are directly taking req. body because it may contain data(if user has given any) out of the model.
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save(); //we're using new User and save method in place of create method
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
//to test the route, check on Postman

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //when we input username inside body of postman, then it is going to find that username(i.e, username of req) inside mongodb..(basically controller is getting req and playing it with db and sending response)
    //first user is basically found user in mongodb--imp // second User is all users in mongodb wherein controller is going to find req.username
    if (!user) {
      res.status(400).json("Invalid Credentials");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      res.status(400).json("Invalid Credentials");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
