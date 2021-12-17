const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3001;

mongoose.connect('mongodb://localhost/forumAPI').then(()=>{
  console.log("mongoose connected")
});

app.get("/", (req, res)=> {
  res.send("Home Page");
});

app.listen(port, ()=>{
  console.log("Server is alive at port", port);
});