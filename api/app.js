const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const tokenRoute = require("./routes/tokenRoute");

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost/forumAPI').then(()=>{
  console.log("mongoose connected")
});
//middlewares
app.use(express.json());

//routes
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/token", tokenRoute)


app.listen(port, ()=>{
  console.log("Server is alive at port", port);
});