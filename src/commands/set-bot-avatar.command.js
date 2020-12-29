const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "set-bot-avatar",
  description: "Komenda ustawia avatar bota.",
  usage: argsChar1 + "URL/ścieżka do pliku lokalnego" + argsChar2,
  args: true,
  ownerOnly: true,
  enabled: true,
  aliases: [ "bot-avatar" ],

  run(msg, args) {
    const { client } = msg

    const avatar = args.join(" ")

    try {
      client.user.setAvatar(avatar)
    } catch (error) {
      console.log(error)
    }
  }
}
