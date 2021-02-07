module.exports = {
  name: "reset-bot-activity",
  description: "Komenda resetuje aktywność bota.",
  ownerOnly: true,
  enabled: true,
  aliases: [ "reset-bot-status" ],

  run(msg, args) {
    const { client } = msg

    try {
      client.user.setPresence({})
    } catch (error) {
      console.log(error)
    }
  }
}
