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
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Poster", poster);
