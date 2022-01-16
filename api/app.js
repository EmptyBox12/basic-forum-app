const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const tokenRoute = require("./routes/tokenRoute");

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://ataberktumay:7P4TaLvmQab0Posn@catit.cd88y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
  console.log("mongoose connected")
});
//middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/token", tokenRoute)


app.listen(port, ()=>{
  console.log("Server is alive at port", port);
});