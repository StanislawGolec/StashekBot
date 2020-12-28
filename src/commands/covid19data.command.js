const { MessageEmbed } = require("discord.js")
const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "covid19data",
  description: "Bot wysyła dane o Covid 19.",
  args: true,
  usage: argsChar1 + "\"world\"/dany kraj (angielska nazwa)" + argsChar2,
  aliases: [ "covid", "covid19", "coviddata" ],
  enabled: false,

  async run(msg, args) {
    const { channel, client: {axios} } = msg
    const arg = args[0]
    const title = "Covid 19 - dane"

    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(0xb348ff)

    if (arg == "world") {
      //const { data } = await axios.get("all")
      //const { cases, deaths, recovered } = data

      const cases = "1000000"
      const deaths = "1000000"
      const recovered = "1000000"

      embed.setDescription("Globalne statystyki:")
      embed.addField(":thermometer: Przypadki:", cases, true)
      embed.addField(":skull: Śmierci:", deaths, true)
      embed.addField(":hospital: Wyleczeni:", recovered, true)

      channel.send(embed)
    }
    else {
      //const { data } = await axios.get("contries")
      const data = []
      const countryName = arg.toLowerCase()
      const country = data.filter(x => x.country.toLowerCase == countryName)
      if (!country.length) {
        channel.send("Nie znaleziono takiego kraju!")
      }
      else {
        const { cases, todayCases, deaths, todayDeaths, recovered, critical } = country[0]
        embed.setDescription("Statystyki dla wybranego kraju.")
        embed.addField(":thermometer: Przypadki:", cases, true)
        embed.addField(":skull: Śmierci:", deaths, true)
        embed.addField(":hospital: Wyleczeni:", recovered, true)

        channel.send(embed)
      }
    }
  }
}
