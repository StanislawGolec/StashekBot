const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "clear-bot-activity",
  description: "Komenda resetuje aktywność bota.",
  ownerOnly: true,
  enabled: true,
  aliases: [ "clean-bot-activity", "cls-bot-activity", "clr-bot-activity", "reset-bot-activity", "clear-bot-status", "clean-bot-status", "cls-bot-status", "clr-bot-status", "reset-bot-status" ],

  run(msg, args) {
    const { client, channel } = msg

    try {
      client.user.setPresence({})
    } catch (error) {
      console.log(error)
    }
  }
}
