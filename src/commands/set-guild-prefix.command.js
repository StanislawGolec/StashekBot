const { prefix, argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "set-guild-prefix",
  description: "Komenda ustawia prefix danego serwera.",
  usage: argsChar1 + "nowy prefix" + argsChar2,
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "guild-prefix", "prefix" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(msg, args) {
    const { channel, guild, client } = msg
    const { settings } = client

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { clockChannels: [], administrationChannels: [], prefix: prefix })
    }

    const newPrefix = args[0]

    if (newPrefix != client.settings.get(guild.id).prefix) {
      client.settings.get(guild.id).prefix = newPrefix
      client.saveConfig(guild.id)

      channel.send("Prefix został zmieniony na \"" + newPrefix + "\".")
    } else {
      channel.send("Prefix jest już ustawiony na \"" + newPrefix + "\".")
    }
  }
}
