module.exports = {
  name: "set-autorole-scheme",
  description: "Komenda ustawia nowy schemat autorole'a.",
  usage: [ "id wiadomości", "reakcja", "wzmianka roli" ],
  usageChars: "111",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "set-autorole", "sar" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(message, args) {
    const { channel, guild, client } = message
    const { settings } = client

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: [], autopin: [] })
      client.saveConfig(guild.id)
    }

    const messageId = args[0]
    if (!messageId && !args[3]) return channel.send("Musisz podać id wiadomości!")

    const reaction = args[1]
    if (!reaction && !args[3]) return channel.send("Musisz podać reakcję (pamiętaj o jednej spacji przed reakcją)!")

    const roleMention = args[2].slice(3, -1)
    if (!roleMention && !args[3]) return channel.send("Musisz wspomnieć jakąś rolę!")

    const { autorole } = client.configVariables(client, guild)

    let push = true

    if (autorole.length) {
      for (let i = 0; i < autorole.length; i++) {
        if (autorole[i][0] == messageId && autorole[i][1] == reaction) {
            push = false
            autorole[i] = [ messageId, reaction, roleMention ]
            if (!args[3]) channel.send("Zaktualizowano schemat autorole'i.")
            break
        }
      }
    }

    if (push) {
      autorole.push([ messageId, reaction, roleMention ])
      if (!args[3]) channel.send("Dodano nowy schemat autorole'i.")
    }

    client.saveConfig(guild.id)
  }
}
