module.exports = {
  name: "set-bot-avatar",
  description: "Komenda ustawia avatar bota.",
  usage: [ "URL/ścieżka do pliku lokalnego" ],
  usageChars: "1",
  args: true,
  ownerOnly: true,
  enabled: true,
  aliases: [ "bot-avatar" ],

  run(msg, args) {
    const { client } = msg

    const avatar = args.join(" ")

    try {
      client.user.setAvatar(avatar)
    } catch (error) {
      console.log(error)
    }
  }
}
