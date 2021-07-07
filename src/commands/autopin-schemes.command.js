module.exports = {
  name: "autopin-schemes",
  description: "Komenda wyświetla ustawione schematy autopinu.",
  guildOnly: true,
  enabled: true,
  aliases: [ "autopins", "aps" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(message, args) {
    const { channel, guild, client, mentions } = message

    const { prefix, autopin } = client.configVariables(client, guild)

    let data = []

    if (autopin.length) {
      for (let i = 0; i < autopin.length; i++) {
        data.push("Schemat numer " + (i + 1) + ":")
        if (autopin[i][0] == "all") data.push("-działa na całych serwerze,")
        else data.push("-kanał działania: <#" + autopin[i][0] + ">,")
        data.push("-reakcja: " + autopin[i][1] + ",")
        data.push("-wymagana liczba tej reakcji: " + autopin[i][2] + ",")
        data.push("-musi zawierać: \"" + autopin[i][3] + "\".")
        if (autopin[i][4] == "true") data.push("-cofa przypięcie po usunięciu rekacji.\n")
        else data.push("-nie cofa przypięcia po usunięciu rekacji.\n")
      }
    } else data.push("Nie ustawiono jeszcze żadnego schematu autopinu! Napisz " + prefix + "set-autopin-scheme, aby to zmienić.")

    channel.send(data)
  }
}
