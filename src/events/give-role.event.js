module.exports = {
  name: "give-role",
  event: "messageReactionAdd",
  enabled: true,

  async run(reaction, user) {
    if (reaction.partial) await reaction.fetch()

    const { client, message } = reaction
    const { guild, channel } = message
    const member = guild.members.cache.get(user.id)

    const autorole = client.configVariables(client, guild).autorole

    if (!autorole) return

    for (let autoroleScheme of autorole) {
      if (message.id != autoroleScheme[0]) continue
      
      if (reaction.emoji.id == null) {
        if (reaction.emoji.name != autoroleScheme[1]) continue
      } else {
        if (reaction.emoji.id != autoroleScheme[1].slice(autoroleScheme[1].lastIndexOf(":") + 1, -1)) continue
      }

      member.roles.add(guild.roles.cache.get(autoroleScheme[2]))
    }
  }
}
