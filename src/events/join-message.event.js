module.exports = {
  name: "join-message",
  event: "guildMemberAdd",
  enabled: false,

  async run(member) {
    console.log("1")
    if (member) {
      console.log("2")
      if (member.partial) await member.fetch()
      console.log("2.5")
      const { client, guild } = member
      console.log("3")
      if (client.configVariables(client, guild).welcomeChannelId) {
        const { welcomeChannelId } = client.configVariables(client, guild)
        console.log("4")
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId)
        console.log("5")
        welcomeChannel.send("<@" + member.user.id + "> właśnie dołączył do tego serwera.")
        console.log("6")
      } else console.log(":(")
    }
    console.log("7")
  }
}
