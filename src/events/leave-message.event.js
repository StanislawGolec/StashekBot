module.exports = {
  name: "leave-message",
  event: "guildMemberRemove",
  enabled: false,

  async run(member) {
    console.log("1")
    if (member) {
      console.log("2")
      if (member.partial) await member.fetch()
      console.log("2.5")
      const { client, guild } = member
      console.log("3")
      if (client.configVariables(client, guild).farewellChannelId) {
        const { farewellChannelId } = client.configVariables(client, guild)
        console.log("4")
        const farewellChannel = member.guild.channels.cache.get(farewellChannelId)
        console.log("5")
        farewellChannel.send("<@" + member.user.id + "> właśnie opóścił ten serwer.")
        console.log("6")
      } else console.log(":(")
    }
    console.log("7")
  }
}
