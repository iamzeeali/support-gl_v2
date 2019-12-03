const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company"
  },
  activity: {
    type: String,
    required: [true, "You must enter an activity"]
  },
  subActivity: {
    type: String,
    required: [true, "You must enter a sub activity"]
  },
  operateEmail: {
    type: String
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  openStatus: {
    type: Boolean,
    default: true
  },
  priority: {
    type: String,
    enum: ["low", "moderate", "high"],
    default: "low"
  },
  closeDate: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// activityLogSchema.pre("save", function(next) {
//   this.user = req.user.id;
//   next();
// });

activityLogSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name email company"
  });

  next();
});

activityLogSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
