const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Virtual for author's livespan
AuthorSchema.virtual("lifespan").get(function () {

  let date_of_birth_formatted = "";
  if (this.date_of_birth) {
    date_of_birth_formatted = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }

  let date_of_death_formatted = "";
  if (this.date_of_death) {
    date_of_death_formatted = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  
  // let date_of_birth_formatted = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  // let date_of_death_formatted = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);



  let lifespan = `${date_of_birth_formatted} - ${date_of_death_formatted}`;
  return lifespan;
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
