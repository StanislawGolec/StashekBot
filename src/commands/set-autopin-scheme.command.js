const requireOptions = [ "noting-special", "image-or-gif" ]

module.exports = {
  name: "set-autopin-scheme",
  description: "Komenda ustawia nowy schemat autopinu.",
  usage: [ "\"all\"/wzmianka kanału", "reakcja (**pamiętaj o jednej spacji przed reakcją**)", "wymagana liczba reakcji", "musi zawierać: \"noting-special\"/\"image-or-gif\"" ],
  // "czy cofnąć przypięcie po cofnięciu reakcji (\"true\"/\"false\")"
  usageChars: "1111",
  // 1
  args: true,
  guildOnly: true,
  enabled: true,
  botPermissions: [ "SEND_MESSAGES" ],
  userPermissions: [ "ADMINISTRATOR" ],

  run(msg, args) {
    const { channel, guild, client, mentions } = msg
    const { settings } = client

    if (!settings.get(guild.id)) {
      settings.set(guild.id, { prefix: false, argsChar1: false, argsChar2: false, argsChar3: false, argsChar4: false, language: false, cooldownDefaultAmount: false, clockChannelsIds: null, administrationChannelId: null, welcomeChannelId: null, farewellChannelId: null, autorole: null, autopin: [] })
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
    const count = args[2]
    let required = args[3]
  //  const unpin = args[4]

    if (!reaction) return channel.send("Musisz podać reakcję (**pamiętaj o jednej spacji przed reakcją**)!")

    if (!count) return channel.send("Musisz podać wymaganą liczbę reakcji!")

    if (count < 1) return channel.send("Musisz podać poprawną wymaganą liczbę reakcji!")

    if (!required || !requireOptions.includes(required)) return channel.send("Musisz podać co musi zawierać (\"noting-special\"/\"image-or-gif\")!")

    //required = required.toLowerCase().split("/")

    //let good = false

    //for (let requireOption of required) {
    //  if (requireOptions.includes(requireOption)) good = true
  //    else if (good == true) {
    //    good = false
    //    break
  //    }
  //  }

  //  if (!good) return channel.send("Musisz podać poprawny typ lub typy jakie musi mieć (\"noting-special\"/\"image-or-gif\")!")

  //  if (!unpin || (unpin != "true" && unpin != "false")) return channel.send("Musisz podać czy należy cofnąć przypięcie po cofnięciu reakcji (\"true\"/\"false\")!")

    const { autopin } = client.configVariables(client, guild)

    let push = true
    let length = false

    if (autopin.length) {
      length = true
      for (let i = 0; i < autopin.length; i++) {
        if (place == "all") {
          if (autopin.length == 1 && autopin[i][0] == "all") {
            autopin[i] = [ place, reaction, count, required ]
            channel.send("Zaktualizowano schemat autopinu na całym serwerze.")
          } else return channel.send("Żeby ustawić autopin na całym serwerze musisz najpierw usunąć wszystkie schematy autopinów działające na danym kanale!")
        } else {
          if (autopin[i][0] == place) {
            push = false
            autopin[i] = [ place, reaction, count, required ]
            channel.send("Zaktualizowano schemat autopinu na wspomnianym kanale.")
            break
          }
        }
      }
    } else {
      autopin.push([ place, reaction, count, required ])
      channel.send("Dodano nowy schemat autopinu.")
    }

    if (length && place != "all" && push) {
      autopin.push([ place, reaction, count, required ])
      channel.send("Dodano nowy schemat autopinu.")
    }

    client.saveConfig(guild.id)
    console.log(client.configVariables(client, guild).autopin)
  }
}
