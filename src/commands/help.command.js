const { prefix, argsChar1, argsChar2, argsChar3, argsChar4, cooldownDefaultAmount } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "help",
  description: "Bot wypisuje listę komend lub informacje o danej z nich.",
  usage: argsChar3 + "nazwa komendy" + argsChar4,

  run(msg, args) {
    const { commands } = msg.client

    const data = []

    if (!args.length) {
      data.push("Lista wszystkich komend:")
      data.push("-" + commands.map((command) => command.name).join(", \n -") + ".")
      data.push("Użyj tej komendy w taki sposób - \"" + prefix + "help " + argsChar1 + "nazwa komendy" + argsChar2 + "\", aby dowiedzieć się więcej o danej komendzie.")
      data.push("W schemacie użycia danej komendy:")
      data.push("-na początku jest prefix (\"" + prefix + "\"),")
      data.push("-potem jest nazwa komendy,")
      data.push("-na końcu są argumenty (te pomiędzy \"" + argsChar1 + argsChar2 + "\" to argumenty niezbędne, a te pomiędzy \"" + argsChar3 + argsChar4 + "\" to argumenty opcjonalne*).")
      data.push("*Powyżej w tym fragmencie - \"" + prefix + "help " + argsChar1 + "nazwa komendy" + argsChar2 + " \"nazwa komendy\" jest pomiędzy \"" + argsChar1 + argsChar2 + "\", ponieważ tam jest wytłumaczone, jak uzyskać dany efekt, do którego akurat ten argument jest niezbędny.")
      if (cooldownDefaultAmount > 0) data.push("Wszystkie komendy mają włączony cooldown - to czas, który musisz odczekać zanim będziesz mógł ponownie użyć danej komendy.")
      else data.push("Niektóre komendy mogą mieć włączony cooldown - to czas, który musisz odczekać zanim będziesz mógł ponownie użyć danej komendy.")
      msg.channel.send(data, { split: true })
    }
    else {
      const name = args[0].toLowerCase()
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name))

      if (!command) {
        msg.channel.send("Nie znaleziono takiej komendy!")
      }
      else {
        data.push("**Nazwa**: " + command.name)
        if (command.aliases) data.push("**Synonimy**: " + command.aliases.join(", "))
        if (command.description) data.push("**Opis**: " + command.description)
        if (command.usage) data.push("**Poprawne użycie komendy**: " + prefix + command.name + " " + command.usage)
        if (command.cooldown) data.push("**Cooldown**: " + command.cooldown)
        if (cooldownDefaultAmount > 0) data.push("**Cooldown**: " + cooldownDefaultAmount)
        if (command.guildOnly) data.push("Komenda działa tylko na serwerach Discord.")

        msg.channel.send(data, { split: true })
      }
    }
  }
}
