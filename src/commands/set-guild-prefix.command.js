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

    const { prefix } = client.configVariables(client, guild)

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: [], autopin: [] })
      client.saveConfig(guild.id)
    }

    const newPrefix = args[0]

    if (newPrefix != settings.get(guild.id).prefix) {
      settings.get(guild.id).prefix = newPrefix
      channel.send("Prefix został zmieniony na \"" + newPrefix + "\".")
    } else {
      channel.send("Prefix jest już ustawiony na \"" + newPrefix + "\".")
    }
    client.saveConfig(guild.id)
  }
}
