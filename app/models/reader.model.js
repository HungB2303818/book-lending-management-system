const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const readerschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Reader = mongoose.model("Reader", readerschema);
module.exports = Reader;