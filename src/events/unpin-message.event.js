module.exports = {
  name: "unpin-message",
  event: "messageReactionRemove",
  enabled: true,

  async run(reaction, user) {
    if (reaction.partial) await reaction.fetch()

    const { client, message } = reaction
    const { guild, channel } = message

    if (!message.pinned) return

    const autopin = client.configVariables(client, guild).autopin

    if (!autopin) return

    for (let i = 0; i < autopin.length; i++) {
      if (autopin[i][0] != "all" && channel.id != autopin[i][0]) continue

      if (reaction.emoji.id == null) {
        if (reaction.emoji.name != autopin[i][1]) continue
      } else {
        if (reaction.emoji.id != autopin[i][1].slice(autopin[i][1].lastIndexOf(":") + 1, -1)) continue
      }

      for (let j = 0; j < autopin.length; j++) {
        if (autopin[j][0] != "all" && channel.id != autopin[j][0]) continue

        for (let messageReaction of message.reactions.cache) {
          if (messageReaction[1].emoji.id == null) {
            if (messageReaction[1].emoji.name != autopin[j][1]) continue
          } else {
            if (messageReaction[1].emoji.id != autopin[j][1].slice(autopin[j][1].lastIndexOf(":") + 1, -1)) continue
          }
          if (messageReaction[1].count >= autopin[j][2]) return
        }
      }

      if (reaction.count < autopin[i][2] && autopin[i][4] == "true") message.unpin()
    }
  }
}
