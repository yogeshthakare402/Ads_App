const mongoose = require("mongoose");
const schema = mongoose.Schema;

const comanySchema = new schema({

})
const companyModel = mongoose.model("company", comanySchema);
module.exports = companyModel;