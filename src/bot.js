require("dotenv").config();
const mongoose = require("mongoose");
const worldClock = require("./functionalities/worldClock");
const remind = require("./functionalities/remind");

// DATABASE
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

// Discord client
const { Client } = require("discord.js");
const client = new Client();
client.login(process.env.DISCORDJS_BOT_TOKEN);

// Listening for commands
client.on("message", (message) => {
  const command = message.content.split(" ")[0].toLowerCase();

  // We could use switch here
  if (command === "!time") {
    worldClock.entryPoint(message);
  }

  if (command === "!remind") {
    remind.entryPoint(message);
  }
});
