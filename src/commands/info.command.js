const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Komenda wypisuje informacje o bocie.",
  enabled: false,
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

  run(message) {
    const { channel } = message

    const botName = "SCpl Bot"
    const botDescription = "Uniwersalny Bot"
    const botAuthor = "SCpl"
    const botVersion = "1.0.0"

    const embed = new MessageEmbed()
      .setTitle(botName)
      .setColor(0xff00ff)
      .setDescription(botDescription)
      .addField("Autor", botAuthor, true)
      .addField("Wersja", botVersion, true)

    channel.send(embed)
  }
}
