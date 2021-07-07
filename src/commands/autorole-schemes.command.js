module.exports = {
  name: "autorole-schemes",
  description: "Komenda wyświetla ustawione schematy autorole'i.",
  guildOnly: true,
  enabled: true,
  aliases: [ "autoroles", "ars" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(message, args) {
    const { channel, guild, client, mentions } = message

    const { prefix, autorole } = client.configVariables(client, guild)

    let data = []

    if (autorole.length) {
      for (let i = 0; i < autorole.length; i++) {
        data.push("Schemat numer " + (i + 1) + ":")
        data.push("-id wiadomości: " + autorole[i][0] + ",")
        data.push("-reakcja: " + autorole[i][1] + ",")
        data.push("-nazwa roli do nadania: " + guild.roles.cache.get(autorole[i][2]).name + ".")
      }
    } else data.push("Nie ustawiono jeszcze żadnego schematu autorole'i! Napisz " + prefix + "set-autorole-scheme, aby to zmienić.")

    channel.send(data)
  }
}
