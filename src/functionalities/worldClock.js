const moment = require("moment-timezone");

const worldClock = {
  entryPoint: (message) => {
    message.channel.send(
      `Belgrade: ${moment().tz("Europe/Belgrade").format("h:mm:ss a")}`
    );
    message.channel.send(
      `Lisbon: ${moment().tz("Europe/Lisbon").format("h:mm:ss a")}`
    );

    message.channel.send(
      `Chicago: ${moment().tz("America/Chicago").format("h:mm:ss a")}`
    );
  },
};

module.exports = worldClock;
