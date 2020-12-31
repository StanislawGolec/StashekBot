module.exports = {
  name: "join-message",
  event: "guildMemberAdd",
  enabled: false,

  run(member) {
    const { client, guild } = member
    if (client.settings.get(guild.id).welcomeChannelId) {
      const { welcomeChannelId } = client.settings.get(guild.id)
      const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId)

      welcomeChannel.send("<@" + member.user.id + "> właśnie dołączył do tego serwera!")
    }
  }
}
