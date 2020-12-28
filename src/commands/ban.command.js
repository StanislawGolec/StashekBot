const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "ban",
  description: "Bot banuję daną osobę.",
  args: true,
  usage: argsChar1 + "użytkownik" + argsChar2 + " " + argsChar1 + "okres czasu, z którego wiadomości tego użytkownika mają zostać usunięte  -  0-7 dni" + argsChar2 + " " + argsChar1 + "powód" + argsChar2,
  guildOnly: true,
  botPermissions: [ "BAN_MEMBERS" ],
  userPermissions: [ "BAN_MEMBERS" ],
  enabled: true,

  async run(msg, args) {
    const { channel, guild, author, mentions } = msg

    const user = mentions.users.first()
    const days = parseInt(args[1])
    const reason = [...args].slice(2).join(" ")

    if (!user) return channel.send("Musisz podać użytkownika do zbanowania!")

    if (isNaN(days) || days < 0 || days > 7) return channel.send("Musisz podać okres czasu, z którego mam usunąć wiadomości podanego użytkownika (0-7 dni)!")

    if (!reason) return channel.send("Musisz podać powód bana!")

    if (user.id == author.id) return channel.send("Nie możesz zbanować samego siebie!")

    if (guild.members.partial) await guild.members.fetch()

    const member = guild.members.cache.get(user.id)

    if (!member.bannable) return channel.send("Nie mam uprawnień do zbanowania tego użytkownika!")

    await member.send("Zostałeś zbanowany na serwerze \"" + guild.name + "\".\nOkres czasu, z którego twoje wiadomości zostały usunięte (w dniach): " + days + "\nPowód: " + reason + "\nPrzez: <@" + author + ">")
    member.ban({ days: days, reason: reason }).then(() => {
      channel.send("Użytkowni0k <@" + user.id + "> został zbanowany.\nOkres czasu, z którego wiadomości tego użytkownika zostały usunięte (w dniach): " + days + "\nPowód: " + reason + "\nPrzez: <@" + author + ">")
    })
  }
}
