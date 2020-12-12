const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reads = new Schema({
  title: String,
  category: [],
  content: String,
  createdDate: { type: Date, default: new Date() },
  imgPath: String,
  imageUrl: String,
  code: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  favorited: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  comments: [
    {
      name: String,
      message: String,
      createdDate: Date,
      ratings: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        favorited: { type: Number, default: 0 },
        repliesCount: { type: Number, default: 0 },
        replies: [
          { replyMsg: String }
        ],
      },
    },
  ],
});

module.exports = mongoose.model("reads", Reads);
