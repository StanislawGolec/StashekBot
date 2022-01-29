module.exports = {
  name: "delete-autorole-scheme",
  description: "Komenda usuwa dany schemat autorole'i.",
  usage: [ "numer schematu autorole'i" ],
  usageChars: "1",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "delete-autorole", "dar" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(message, args) {
    const { channel, guild, client } = message
    const { settings } = client

    const { prefix, autorole } = client.configVariables(client, guild)

    number = args[0]

    if (!autorole.length && !args[1]) return channel.send("Nie ustawiono jeszcze żadnego schematu autorole'i! Napisz " + prefix + "set-autorole-scheme, aby to zmienić.")

    if (number > 0 && number <= autorole.length)
    {
      autorole.splice(number - 1, 1)
      client.saveConfig(guild.id)
      if (!args[1]) channel.send("Usunięto ten schemat autorole'i.")
    } else {
      if (!args[1]) channel.send("Nie znaleziono schematu autorole'i o takim numerze! Napisz " + prefix + "autorole-schemes, aby zobaczyć ustawione schematy autorole'i.")
    }
  }
}
