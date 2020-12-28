const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Bot wypisuje informacje o sobie.",
  botPermissions: [ "EMBED_LINKS" ],
  enabled: true,

  run(msg) {
    const { channel } = msg

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
