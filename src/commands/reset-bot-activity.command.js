module.exports = {
  name: "reset-bot-activity",
  description: "Komenda resetuje aktywność bota.",
  ownerOnly: true,
  enabled: true,
  aliases: [ "reset-bot-status" ],

  run(message, args) {
    const { client } = message

    try {
      client.user.setPresence({})
    } catch (error) {
      console.log(error)
    }
  }
}
