require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000;

// connect to database
mongoose.connect(process.env.DATABASE_URL);
let db = mongoose.connection;
db.on("error", (err) => console.log(`Error connecting to Database:` + err));
db.once("open", ()=>{
    // print connected message
    console.log("Connected to MongoDB!");
});

app.get('/', (req,res)=>{
    res.send('AgroMinds');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});