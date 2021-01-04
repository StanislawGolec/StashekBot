module.exports = {
  name: "reset-guild-prefix",
  description: "Komenda resetuje prefix danego serwera.",
  guildOnly: true,
  enabled: true,
  aliases: [ "reset-prefix" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(msg, args) {
    const { channel, guild, client } = msg
    const { settings } = client

    const { prefix } = client.configVariables(client, guild)

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: null, autopin: [ {}, [] ] })
    }

    settings.get(guild.id).prefix = null
    client.saveConfig(guild.id)

    channel.send("Prefix został zresetowany.")
  }
}
