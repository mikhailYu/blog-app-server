const mongoose = require("mongoose");

const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  datePosted: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "BlogPost" },
});

CommentSchema.set("toJSON", { virtuals: true });

CommentSchema.virtual("datePostedFormatted").get(function () {
  return DateTime.fromJSDate(this.datePosted).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
