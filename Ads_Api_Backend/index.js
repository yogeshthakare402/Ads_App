const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connect = require("./connection/connect");
const adsRoute = require("./routes/adsRoute")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/ads",adsRoute)


app.listen(8000,()=>console.log("App is running on port 8000"));