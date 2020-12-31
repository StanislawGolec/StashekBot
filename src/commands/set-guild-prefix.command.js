module.exports = {
  name: "set-guild-prefix",
  description: "Komenda ustawia prefix danego serwera.",
  usage: [ "nowy prefix" ],
  usageChars: "1",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "guild-prefix", "prefix" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(msg, args) {
    const { channel, guild, client } = msg
    const { settings } = client

    const { prefix } = guild ? client.settings.get(guild.id) : require(__dirname + "/../config/config.js")


    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: null, argsChar1: null, argsChar2: null, argsChar3: null, argsChar4: null, language: null, cooldownDefaultAmount: null, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null })
    }

    const newPrefix = args[0]

    if (newPrefix != settings.get(guild.id).prefix) {
      settings.get(guild.id).prefix = newPrefix
      client.saveConfig(guild.id)

      channel.send("Prefix został zmieniony na \"" + newPrefix + "\".")
    } else {
      channel.send("Prefix jest już ustawiony na \"" + newPrefix + "\".")
    }
  }
}
