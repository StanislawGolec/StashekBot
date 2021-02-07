const activityTypes = [ "PLAYING", "STREAMING", "LISTENING", "WATCHING", "CUSTOM_STATUS", "COMPETING" ]

module.exports = {
  name: "set-bot-activity",
  description: "Komenda ustawia aktywność bota.",
  usage: [ "typ aktywności", "aktywność" ],
  usageChars: "11",
  args: true,
  ownerOnly: true,
  enabled: true,
  aliases: [ "bot-activity", "bot-status" ],

  run(msg, args) {
    const { client, channel } = msg

    let type = ""
    let name = ""
    let presence = {}

    args[0] = args[0].toUpperCase()
    if (!activityTypes.includes(args[0])) {
      return channel.send("Musisz podać typ aktywności (\"PLAYING\", \"STREAMING\", \"LISTENING\", \"WATCHING\", \"COMPETING\")!")
    } else {
      type = args[0]
      name = [...args].slice(1).join(" ")
    }

    if (!name) return channel.send("Musisz podać aktywność!")

    presence = { activity: { name: name, type: type }}

    try {
      client.user.setPresence(presence)
    } catch (error) {
      console.log(error)
    }
  }
}
