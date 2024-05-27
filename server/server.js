const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path= require("path");

dotenv.config();
app.use(express.json()); //to send res in json format (via controller)
app.use("/images",express.static(path.join(__dirname,"/images")));// to show images in posts on frontend which is posted

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
//creating storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb is callback function
    cb(null, "images"); //it will take file and save it in images
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // we're going to send this file to client, so req.body.name as it will give the saved file name, given by user
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);

const PORT = process.env.port || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up on port 5000");
  });
});
