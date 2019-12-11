const { Schema, model } = require("mongoose");

const poster = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String
});

module.exports = model("Poster", poster);
