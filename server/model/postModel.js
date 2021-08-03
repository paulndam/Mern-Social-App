const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is requred",
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now() },
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  postedBy: { type: ObjectId, ref: "User" },
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", PostSchema);
