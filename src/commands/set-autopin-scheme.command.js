const requireOptions = [ "noting-special", "image-or-gif" ]

module.exports = {
  name: "set-autopin-scheme",
  description: "Komenda ustawia nowy schemat autopinu.",
  usage: [ "\"all\"/wzmianka kanału", "reakcja", "wymagana liczba reakcji", "musi zawierać: \"noting-special\"/\"image-or-gif\"", "czy cofa przypięcie po usunięciu reakcji (\"true\"/\"false\")?" ],
  usageChars: "11111",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "set-autopin", "sap" ],
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(message, args) {
    const { channel, guild, client, mentions } = message
    const { settings } = client

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: [], autopin: [] })
      client.saveConfig(guild.id)
    }

    const channelMention = mentions.channels.first()
    const channelOption = args[0]

    let place = ""

    if (channelOption == "all") place = "all"
    else {
      if (!channelMention) {
        return channel.send("Musisz wspomnieć jakiś kanał!")
      }

      if (!guild.channels.cache.get(channelMention.id)) {
        return channel.send("Nie znaleziono wspomnianego kanału na tym serwerze!")
      }
      place = channelMention.id
    }

    let reaction = args[1]
    if (!reaction) return channel.send("Musisz podać reakcję (pamiętaj o jednej spacji przed reakcją)!")

    const count = args[2]
    if (!count) return channel.send("Musisz podać wymaganą liczbę reakcji!")
    if (count < 1) return channel.send("Musisz podać poprawną wymaganą liczbę reakcji!")

    let required = args[3]
    if (!required || !requireOptions.includes(required)) return channel.send("Musisz podać co musi zawierać (\"noting-special\"/\"image-or-gif\")!")

    const unpin = args[4]
    if (!unpin || (unpin != "true" && unpin != "false")) return channel.send("Musisz napisać, czy przypięcie ma zostać cofnięte po usunięciu reakcji (\"true\"/\"false\")!")

    const { autopin } = client.configVariables(client, guild)

    let push = true

    if (autopin.length) {
      for (let i = 0; i < autopin.length; i++) {
        if (autopin[i][0] == place && autopin[i][1] == reaction) {
          push = false
          autopin[i] = [ place, reaction, count, required, unpin ]
          channel.send("Zaktualizowano schemat autopinu na wspomnianym kanale.")
          break
        }
      }
    }

    if (push) {
      autopin.push([ place, reaction, count, required, unpin ])
      channel.send("Dodano nowy schemat autopinu.")
    }

    client.saveConfig(guild.id)
    console.log(client.configVariables(client, guild).autopin)
  }
}
