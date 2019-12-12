const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          require: true,
          default: 1
        },
        posterId: {
          type: Schema.Types.ObjectId,
          ref: "Poster",
          require: true
        }
      }
    ]
  }
});

module.exports = model("User", userSchema);
