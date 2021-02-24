module.exports = {
  name: "pin-message",
  event: "messageReactionAdd",
  enabled: true,

  async run(reaction, user) {
    if (reaction.partial) await reaction.fetch()

    const { client, message } = reaction
    const { guild, channel } = message

    if (message.pinned) return

    const autopin = client.configVariables(client, guild).autopin

    if (!autopin) return

    for (let i = 0; i < autopin.length; i++) {
      if (autopin[i][0] != "all" && channel.id != autopin[i][0]) continue
      if (reaction.emoji.id == null) {
        if (reaction.emoji.name != autopin[i][1]) continue
      } else {
        if (reaction.emoji.id != autopin[i][1].slice(autopin[i][1].lastIndexOf(":") + 1, -1)) continue
      }

      if (reaction.count < autopin[i][2]) continue

      switch (autopin[i][3]) {
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
            for (let attachment of message.attachments) {
              if (attachment[1].attachment.endsWith(".png") || attachment[1].attachment.endsWith(".jpeg") || attachment[1].attachment.endsWith(".jpg") || attachment[1].attachment.endsWith(".jpe") || attachment[1].attachment.endsWith(".jfif")) {
                message.pin()
                break
              }
            }
          }

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
  }
}
