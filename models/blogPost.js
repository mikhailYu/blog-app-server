const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  mainText: { type: String, required: true, maxLength: 5000 },
  published: { type: String, required: true },
  datePosted: { type: Date, required: true },
  dateUpdated: { type: Date },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

BlogPostSchema.set("toJSON", { virtuals: true });

BlogPostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

BlogPostSchema.virtual("datePostedFormatted").get(function () {
  return DateTime.fromJSDate(this.datePosted).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

BlogPostSchema.virtual("dateUpdatedFormatted").get(function () {
  return DateTime.fromJSDate(this.dateUpdated).toLocaleString(
    DateTime.DATETIME_SHORT_WITH_SECONDS
  );
});

// Export model
module.exports = mongoose.model("blogPost", BlogPostSchema);
