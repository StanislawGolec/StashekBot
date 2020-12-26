const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "",

  run(msg) {
    const { channel } = msg

    const botName = "SCTestBotJS1"
    const botDescription = "Uniwersalny Bot!"
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
