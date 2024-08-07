const router = require("express").Router();
const User = require("../models/User_model");
const Post = require("../models/Post_model");

//CREATE POST
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const newPost = new Post(req.body);
      try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      }catch(error){
        res.status(500).json(error);
      }
    } else {
      res.status(404).json("Username should match for creating post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE POST

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Your post has been deleted!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL POSTS
//(on the basis of username or category, else all)
router.get("/", async (req, res) => {
  const username = req.query.user;
  const categName = req.query.categ;
  try {
    let posts; //let because posts can change (means no. and content of posts)
    if (username) {
      posts = await Post.find({ username }); //here, it is uername:username
    } else if (categName) {
      posts = await Post.find({
        categories: {
          $in: [categName], //if categories include categName
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
