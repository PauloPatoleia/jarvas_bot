require("dotenv").config();
const moment = require("moment-timezone"); // dont use pls
const mongoose = require("mongoose");
const Reminder = require("./models/reminder");
const {
  addHoursToCurrentDate,
  addDaysToCurrentDate,
  addMonthsToCurrentDate,
} = require("./methods/calculateReminderOnDate");

const dbURI =
  "mongodb+srv://dbUser:VhJsEHTgzk3@cluster0.uslxg.mongodb.net/discord-bot?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const { Client } = require("discord.js");

const client = new Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("message", (message) => {
  if (message.content === "!time please") {
    message.channel.send(
      `Belgrade: ${moment().tz("Europe/Belgrade").format("h:mm:ss a")}`
    );
    message.channel.send(
      `Lisbon: ${moment().tz("Europe/Lisbon").format("h:mm:ss a")}`
    );

    message.channel.send(
      `Chicago: ${moment().tz("America/Chicago").format("h:mm:ss a")}`
    );
  }
});

function calculateRemiderDate(timeInput) {
  // Extract letter argument from number
  let timePeriodType = timeInput.split("")[timeInput.length - 1].toLowerCase();
  let timePeriodAmount = timeInput.split("").slice(0, -1).join("");

  const date = new Date();
  console.log();

  switch (timePeriodType) {
    case "h":
      return addHoursToCurrentDate(timePeriodAmount);
      break;
    case "d":
      return addDaysToCurrentDate(timePeriodAmount);
      break;
    case "m":
      return addMonthsToCurrentDate(timePeriodAmount);
      break;
    default:
      return addHoursToCurrentDate(timePeriodAmount);
  }
}

// remind 1d
//date.setDate(date.getDate() + messageArray[+timePeriodAmount]);

client.on("message", (message) => {
  let messageArray = message.content.split(" ");

  const reminderText = messageArray.slice(2, messageArray.length).join(" ");

  const remindOn = calculateRemiderDate(messageArray[1]);

  console.log(remindOn);

  if (messageArray[0] === "!remind") {
    const reminder = new Reminder({
      user: message.author,
      reminderText: reminderText,
      remindOn: remindOn,
    });

    reminder.save().then(() => {
      message.channel.send("You got it Boss!");
    });
  }
});
