// Dependencies
const Reminder = require("../models/reminder");

// Object
class remind {
  constructor(message) {
    this.message = message;
    this.splitInputBySpaces = message.content.split(" ");
    this.reminderText = this.splitInputBySpaces
      .slice(2, this.splitInputBySpaces.length)
      .join(" ");
    this.currentDate = new Date();
  }
  entryPoint() {
    const remindOn = this.calculateRemiderDate(this.splitInputBySpaces[1]);

    console.log(remindOn);

    const reminder = new Reminder({
      user: this.message.author,
      reminderText: this.reminderText,
      remindOn: remindOn,
    });

    reminder.save().then(() => {
      this.message.channel.send("You got it Boss!");
    });
  }

  calculateRemiderDate(timeInput) {
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
  }

  addMinutesToCurrentDate(minutes) {
    return this.currentDate.getTime() + minutes * 60 * 1000;
  }

  addHoursToCurrentDate(hours) {
    return this.currentDate.getTime() + hours * 60 * 60 * 1000;
  }

  addDaysToCurrentDate(days) {
    return this.currentDate.getTime() + days * 24 * 60 * 60 * 1000;
  }
}

module.exports = remind;
