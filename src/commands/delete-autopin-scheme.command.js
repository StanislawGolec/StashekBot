module.exports = {
  name: "delete-autopin-scheme",
  description: "Komenda usuwa dany schemat autopinu.",
  usage: [ "numer schematu autopinu" ],
  usageChars: "1",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "delete-autopin", "dap" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(msg, args) {
    const { channel, guild, client, mentions } = msg
    const { settings } = client

    const { prefix, autopin } = client.configVariables(client, guild)

    number = args[0]

    if (!autopin.length) return channel.send("Nie ustawiono jeszcze żadnego schematu autopinu! Napisz " + prefix + "set-autopin-scheme, aby to zmienić.")

    if (number > 0 && number <= autopin.length)
    {
      autopin.splice(number - 1, 1)
      client.saveConfig(guild.id)
      channel.send("Usunięto ten schemat autopinu.")
    } else {
      channel.send("Nie znaleziono schematu autopinu o takim numerze! Napisz " + prefix + "autopin-schemes, aby zobaczyć ustawione schematy autopinów.")
    }
  }
}
