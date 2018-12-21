const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookmarkSchema = new Schema({
  name: String,
  url: String
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
