const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "create-autorole-message",
  description: "Tworzy wiadomość autorole'i.",
  usage: [ "wzmianka kanału", "kategoria roli", "wzmianka roli", "reakcja", "opis/nazwa roli", "wzmianka drugiej roli", "reakcja", "opis/nazwa drugiej roli..." ],
  usageChars: "11111111",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "create-autorole", "car", "carm" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  async run(message, args) {
    const { channel, guild, client, mentions } = message
    const { settings } = client

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: [], autopin: [] })
      client.saveConfig(guild.id)
    }

    const channelMention = mentions.channels.first()
    if (!channelMention) {
      return channel.send("Musisz wspomnieć jakiś kanał!")
    }

    const category = args[1]
    if (!category) {
      return channel.send("Musisz podać nazwę kategorii!")
    }

    const roleMentions = []

    const argsLength = args.length
    if (argsLength == 2) if (!roleMentions[0]) return channel.send("Musisz wspomnieć jakąś rolę!")
    else if ((argsLength - 2) % 3 == 0) {
      for (let i = 1; i < (argsLength - 2) / 2; i++) {
        if (!roleMentions[i]) return channel.send("Musisz poprawnie wspomnieć rolę!")
      }
    }
    if ((argsLength - 2) % 3 == 1) return channel.send("Musisz podać jakąś reakcję do ostatniej wspomnianej roli!")
    if ((argsLength - 2) % 3 == 2) return channel.send("Musisz podać jakiś opis ostatniej wzpomnianej roli!")

    const reactions = []
    const descriptions = []

    for (let i = 2; i < argsLength; i += 3) {
      roleMentions.push(args[i].slice(3, -1))
      reactions.push(args[i + 1])
      descriptions.push(args[i + 2])
    }

    const embed = new MessageEmbed()
      .setTitle(category)
      .setColor(0xb348ff)

    const embedDescription = []

    for (let i = 0; i < reactions.length; i++) {
      embedDescription.push(reactions[i] + ": **" + descriptions[i] + "**")
    }
    console.log(embedDescription)
    embed.setDescription(embedDescription.join("\n"))
    console.log(embed)

    var sentMessage = await channelMention.send({ embeds: [ embed ] })

    for (let i = 0; i < reactions.length; i++) {
      await sentMessage.react(reactions[i])
    }

    for (let i = 0; i < reactions.length; i++) {
      client.commands.get("set-autorole-scheme").run(sentMessage, [sentMessage.id, reactions[i], "<@&" + roleMentions[i] + ">", true])
    }
  }
}
