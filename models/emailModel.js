const mongoose = require("mongoose");
const validator = require("validator");
// var uniqueValidator = require("mongoose-unique-validator");

const emailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    select: false
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company"
  },
  operateEmail: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: false
  },
  operatePassword: {
    type: String
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

emailSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name email company"
  }).populate({
    path: "company",
    select: "companyName"
  })

  next();
});

emailSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// emailSchema.plugin(uniqueValidator);

module.exports = Email = mongoose.model("Email", emailSchema);
