const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "kick",
  description: "Komenda wyrzuca daną osobę z serwera.",
  usage: argsChar1 + "użytkownik" + argsChar2 + " " + argsChar1 + "powód" + argsChar2,
  args: true,
  guildOnly: true,
  enabled: true,
  botPermissions: [ "SEND_MESSAGES", "KICK_MEMBERS" ],
  userPermissions: [ "KICK_MEMBERS" ],

  async run(msg, args) {
    const { channel, guild, author, mentions } = msg

    const user = mentions.users.first()
    const reason = [...args].slice(1).join(" ")

    if (!user) return channel.send("Musisz podać użytkownika do wyrzucenia!")

    if (!reason) return channel.send("Musisz podać powód wyrzucenia!")

    if (user.id == author.id) return channel.send("Nie możesz wyrzucić samego siebie!")

    const member = guild.members.cache.get(user.id)

    if (!member.kickable) return channel.send("Nie mam uprawnień do wyrzucenia tego użytkownika!")

    await member.send("Zostałeś wyrzucony z serwera \"" + guild.name + "\".\nPowód: " + reason + "\nPrzez: " + author.tag)
    member.kick(reason).then(() => {
      channel.send("Użytkownik <@" + user + "> został wyrzucony.\nPowód: " + reason + "\nPrzez: <@" + author + ">")
    })
  }
}
