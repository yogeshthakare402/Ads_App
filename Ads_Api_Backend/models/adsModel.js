const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adsSchema = new schema({

})
const adsModel = mongoose.model("ads", adsSchema);
module.exports = adsModel;