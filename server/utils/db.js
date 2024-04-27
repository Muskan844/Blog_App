const mongoose= require("mongoose");

const connectDb= async(req,res)=>{
    try {
       await mongoose.connect(process.env.MONGO_URL);
       console.log("Connection successfull to database")
    } catch (error) {
       console.log("Database connection failed")
       process.exit(0);
    }
}
module.exports= connectDb;