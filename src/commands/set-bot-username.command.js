const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "set-bot-username",
  description: "Komenda ustawia nick bota, może być używana tylko dwa razy w ciągu godziny!",
  usage: [ "nowy nick" ],
  usageChars: "1",
  args: true,
  ownerOnly: true,
  enabled: true,
  aliases: [ "set-bot-nickname", "set-bot-nick", "bot-username", "bot-nickname", "bot-nick" ],

  run(msg, args) {
    const { client, channel } = msg

    const username = args.join(" ")

    if (username == client.user.username) {
      channel.send("Już mam ustawiony taki nick!")
    } else {
      try {
        client.user.setUsername(username)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
