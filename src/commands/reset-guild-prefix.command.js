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
    if (guild) {
      const { prefix } = client.settings.get(guild.id)
    } else {
      const { prefix} = require(__dirname + "/../config/config.js")
    }


    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: null, argsChar1: null, argsChar2: null, argsChar3: null, argsChar4: null, language: null, cooldownDefaultAmount: null, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null })
    }

    settings.get(guild.id).prefix = null
    client.saveConfig(guild.id)

    channel.send("Prefix został zresetowany.")
  }
}
