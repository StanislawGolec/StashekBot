const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "ban",
  description: "Komenda banuje daną osobę.",
  usage: argsChar1 + "użytkownik" + argsChar2 + " " + argsChar1 + "okres czasu, z którego wiadomości tego użytkownika mają zostać usunięte" + argsChar2 + " " + argsChar1 + "powód" + argsChar2,
  args: true,
  guildOnly: true,
  enabled: true,
  botPermissions: [ "SEND_MESSAGES", "BAN_MEMBERS" ],
  userPermissions: [ "BAN_MEMBERS" ],

  async run(msg, args) {
    const { channel, guild, author, mentions } = msg

    const user = mentions.users.first()
    const days = parseInt(args[1])
    const reason = [...args].slice(2).join(" ")

    if (!user) return channel.send("Musisz podać użytkownika do zbanowania!")

    if (isNaN(days)) return channel.send("Musisz podać okres czasu, z którego mam usunąć wiadomości podanego użytkownika (0-7 dni)!")

    if (days < 0 || days > 7) return channel.send("Okres czasu, z którego wiadomości podanego użytkownika mają zostać usuniętę musi mieścić się w przedziele 0-7 dni!")

    if (!reason) return channel.send("Musisz podać powód bana!")

    if (user.id == author.id) return channel.send("Nie możesz zbanować samego siebie!")

    if (guild.members.partial) await guild.members.fetch()

    const member = guild.members.cache.get(user.id)

    if (!member.bannable) return channel.send("Nie mam uprawnień do zbanowania tego użytkownika!")

    await member.send("Zostałeś zbanowany na serwerze \"" + guild.name + "\".\nOkres czasu, z którego twoje wiadomości zostały usunięte (w dniach): " + days + "\nPowód: " + reason + "\nPrzez: " + author.tag)
    member.ban({ days: days, reason: reason }).then(() => {
      channel.send("Użytkowni0k <@" + user.id + "> został zbanowany.\nOkres czasu, z którego wiadomości tego użytkownika zostały usunięte (w dniach): " + days + "\nPowód: " + reason + "\nPrzez: <@" + author + ">")
    })
  }
}
