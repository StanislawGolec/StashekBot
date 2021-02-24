module.exports = {
  name: "role-message",
  event: "messageReactionAdd",
  enabled: false,

  async run(reaction, user) {
    if (reaction.partial) await reaction.fetch()

    const { client, message } = reaction
    const { guild, channel } = message

    const autorole = client.configVariables(client, guild).autorole

    if (!autorole) return

    try {
      for (let autoroleScheme of autorole) {
        if (autopinScheme[0] != "all" && channel.id != autopinScheme[0]) continue
        if (reaction.emoji.id == null) {
          if (reaction.emoji.name != autopinScheme[1]) continue
        } else {
          if (reaction.emoji.id != autopinScheme[1].slice(autopinScheme[1].lastIndexOf(":") + 1, -1)) continue
        }

        if (reaction.count != autopinScheme[2]) continue
      //  console.log(message.embeds)
      //  console.log(message.attachments)
        switch (autopinScheme[3]) {
          case "noting-special":
            message.pin()
        //  case "image":
        //    console.log("lol")
        //    for (let attachment of message.attachments) {
      //        if (attachment[1].attachment.endsWith(".png") || attachment[1].attachment.endsWith(".jpeg") || attachment[1].attachment.endsWith(".jpg") || attachment[1].attachment.endsWith(".jpe") || attachment[1].attachment.endsWith(".jfif")) {
      //          message.pin()
      //          break
      //        }
      //      }
            break
          case "image-or-gif":
            if (message.attachments) {
              console.log(message.attachments)
              for (let attachment of message.attachments) {
                if (attachment[1].attachment.endsWith(".png") || attachment[1].attachment.endsWith(".jpeg") || attachment[1].attachment.endsWith(".jpg") || attachment[1].attachment.endsWith(".jpe") || attachment[1].attachment.endsWith(".jfif")) {
                  message.pin()
                  break
                }
              }
            }
            console.log(message.embeds)
            for (let embed of message.embeds) {
              if (embed.type == "image") {
                return message.pin()
              }
            }
            break
      //    case "video":
      //      for (let embed of message.embeds) {
      //        if (embed.type == "video") {
      //          return message.pin()
      //        }
      //      }
      //      break
      //    case "link":
      //      for (let embed of message.embeds) {
      //        if (embed.type == "link") {
      //          return message.pin()
      //        }
      //      }
      //      break
        }
      }
    } catch (error) {
      return console.log(error)
    }
  }
}
