module.exports = {
  name: "reset-prefix",
  description: "Komenda resetuje prefix danego serwera.",
  guildOnly: true,
  enabled: true,
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(message, args) {
    const { channel, guild, client } = message
    const { settings } = client

    const { prefix } = client.configVariables(client, guild)

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: [], autopin: [] })
    }

    settings.get(guild.id).prefix = null
    client.saveConfig(guild.id)

    channel.send("Prefix został zresetowany.")
  }
}
