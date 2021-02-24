module.exports = {
  name: "set-autorole-scheme",
  description: "Komenda ustawia nowy schemat autorole'a.",
  usage: [ "id wiadomości", "reakcja", "wzmianka roli" ],
  // "czy cofnąć danie roli po cofnięciu reakcji (\"true\"/\"false\")"
  usageChars: "111",
  args: true,
  guildOnly: true,
  enabled: false,
  aliases: [ "set-autorole", "sar" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(msg, args) {
    const { channel, guild, client, mentions } = msg
    const { settings } = client

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: [], autopin: [] })
      client.saveConfig(guild.id)
    }

    const messageId = args[0]
    if (!messageId) return channel.send("Musisz podać id wiadomości!")

    const reaction = args[1]
    if (!reaction) return channel.send("Musisz podać reakcję (pamiętaj o jednej spacji przed reakcją)!")

    const roleMention = mentions.roles.first()
    if (!roleMention) return channel.send("Musisz wspomnieć jakąś rolę!")

    const { autorole } = client.configVariables(client, guild)

    let push = true
    let length = false

    if (autorole.length) {
      length = true
      for (let i = 0; i < autorole.length; i++) {
        if (autorole[i][0] == messageId && autorole[i][1] == reaction) {
            push = false
            autorole[i] = [ messageId, reaction, roleMention.id ]
            channel.send("Zaktualizowano schemat autorole'i.")
            break
        }
      }
    } else {
      autorole.push([ messageId, reaction, roleMention.id ])
      channel.send("Dodano nowy schemat autorole'i.")
    }

    if (length && push) {
      autorole.push([ messageId, reaction, roleMention.id ])
      channel.send("Dodano nowy schemat autorole'i.")
    }

    client.saveConfig(guild.id)
    console.log(client.configVariables(client, guild).autopin)
  }
}
