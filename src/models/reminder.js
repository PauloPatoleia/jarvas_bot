const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, 'Userename is requrired']
    },
    reminderText: {
      type: String,
      required: [true, 'reminder Text is required']
    },
    remindOn: {
      type: Number,
      required: [true, 'time value is requried']
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;
