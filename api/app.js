const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost/forumAPI').then(()=>{
  console.log("mongoose connected")
});
//middlewares
app.use(express.json());

//routes
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(port, ()=>{
  console.log("Server is alive at port", port);
});