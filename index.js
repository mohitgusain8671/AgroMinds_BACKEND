require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "*", // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
  app.use(cors(corsOptions));
app.use(express.json())
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

require("./routes/predicterRoutes")(app)
require("./routes/authRoutes")(app)
require("./routes/cropRoutes")(app)
require("./routes/fertilizerRoutes")(app)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});