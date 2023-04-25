const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ads')
.then(console.log("DB login Successful"))
.catch(console.error);
