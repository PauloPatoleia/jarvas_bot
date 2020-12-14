// Dependencies
const Reminder = require("../models/reminder");
const {
  addHoursToCurrentDate,
  addDaysToCurrentDate,
  addMinutesToCurrentDate,
} = require("../methods/calculateReminderOnDate");

// Object
const remind = {
  entryPoint: function (message) {
    let splitInputBySpaces = message.content.split(" ");

    const reminderText = splitInputBySpaces
      .slice(2, splitInputBySpaces.length)
      .join(" ");

    const remindOn = this.calculateRemiderDate(splitInputBySpaces[1]);

    console.log(remindOn);

    const reminder = new Reminder({
      user: message.author,
      reminderText: reminderText,
      remindOn: remindOn,
    });

    reminder.save().then(() => {
      message.channel.send("You got it Boss!");
    });
  },

  calculateRemiderDate: function (timeInput) {
    // Extract letter argument from input
    let timePeriodType = timeInput
      .split("")
      [timeInput.length - 1].toLowerCase();
    // Extract time period from input
    let timePeriodAmount = timeInput.split("").slice(0, -1).join("");
    // Find time type
    switch (timePeriodType) {
      case "m":
        return;
        break;
      case "h":
        return this.addHoursToCurrentDate(timePeriodAmount);
        break;
      case "d":
        return this.addDaysToCurrentDate(timePeriodAmount);
        break;
      default:
        return this.addHoursToCurrentDate(timePeriodAmount);
    }
  },

  addMinutesToCurrentDate: (minutes) => {
    let currentDate = new Date();
    return currentDate.getTime() + minutes * 60 * 1000;
  },

  addHoursToCurrentDate: (hours) => {
    let currentDate = new Date();
    return currentDate.getTime() + hours * 60 * 60 * 1000;
  },

  addDaysToCurrentDate: (days) => {
    let currentDate = new Date();
    return currentDate.getTime() + days * 24 * 60 * 60 * 1000;
  },
};

module.exports = remind;
