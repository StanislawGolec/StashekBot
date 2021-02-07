module.exports = {
  name: "help",
  description: "Komenda wypisuje listę komend lub informacje o danej z nich.",
  usage: [ "nazwa komendy" ],
  usageChars: "2",
  enabled: true,
  botPermissions: [ "SEND_MESSAGES" ],

  run(msg, args) {
    const { author, guild, channel, client } = msg
    const { commands } = client
    const { prefix, argsChar1, argsChar2, argsChar3, argsChar4, cooldownDefaultAmount, owner } = client.configVariables(client, guild)

    let data = []

    if (!args.length) {
      data.push("Lista wszystkich komend:")

      if ((author.id == owner && guild) || author.id != owner) {
        let commandList = []
        for (let command of commands.map((command) => command)) {
          if (command.ownerOnly) continue
          commandList.push(command.name)
        }
        data.push("-" + commandList.map((commandName) => commandName).join(",\n-") + ".")
        if (author.id == owner) {
          author.send("**Używając komendy \"help\" jako właściciel bota w wiadomości prywatnej możesz dostać dodatkowe komendy i informacje o nich!**")
        }
      } else {
        data.push("-" + commands.map((command) => command.name).join(",\n-") + ".")
      }

      data.push("Użyj tej komendy w taki sposób - \"" + prefix + "help " + argsChar1 + "nazwa komendy" + argsChar2 + "\", aby dowiedzieć się więcej o danej komendzie.")
      data.push("W schemacie użycia danej komendy:")
      data.push("-na początku jest prefix (\"" + prefix + "\"),")
      data.push("-potem jest nazwa komendy,")
      data.push("-na końcu są argumenty (te pomiędzy \"" + argsChar1 + argsChar2 + "\" to argumenty niezbędne, a te pomiędzy \"" + argsChar3 + argsChar4 + "\" to argumenty opcjonalne*).")
      data.push("*Powyżej w tym fragmencie - \"" + prefix + "help " + argsChar1 + "nazwa komendy" + argsChar2 + " \"nazwa komendy\" jest pomiędzy \"" + argsChar1 + argsChar2 + "\", ponieważ tam jest wytłumaczone, jak uzyskać dany efekt, do którego akurat ten argument jest niezbędny.")
      if (cooldownDefaultAmount > 0) data.push("Wszystkie komendy mają włączony cooldown - to czas, który musisz odczekać zanim będziesz mógł ponownie użyć danej komendy.")
      else data.push("Niektóre komendy mogą mieć włączony cooldown - to czas, który musisz odczekać zanim będziesz mógł ponownie użyć danej komendy.")
      channel.send(data, { split: true })
    } else {
      const name = args[0].toLowerCase()
      const command =
        commands.get(name) ||
        commands.find((command) => command.aliases && command.aliases.includes(name))

      if (!command) {
        msg.channel.send("Nie znaleziono takiej komendy! Napisz " + prefix + "help, aby wyświelić listę wszystkich istniejących komend.")
      }
      else {
        if (command.ownerOnly && ((author.id == owner && guild) || author.id != owner)) {
          data.push("Nie znaleziono takiej komendy! Napisz " + prefix + "help, aby wyświelić listę wszystkich istniejących komend.")
          if (author.id == owner) {
            author.send("**\"" + prefix + "help " + command.name + "\" działa tylko w prywatnych wiadomościach, ponieważ \"" + command.name + "\" jest to komenda, którą może używać tylko właściciel bota!**")
          }
        } else {
          data.push("**Nazwa**: " + command.name + ".")
          if (command.aliases) data.push("**Synonimy**: " + command.aliases.join(", ") + ".")
          if (command.description) data.push("**Opis**: " + command.description)

          if (command.usage) {
            let usage = ""
            for (var i = 0; i < command.usageChars.length; i++) {
              if (command.usageChars[i] = "1") {
                usage = usage + " " + argsChar1 + command.usage[i] + argsChar2
              } else if (command.usageChars[i] = "2") {
                usage = usage + " " + argsChar3 + command.usage[i] + argsChar4
              }
            }
            data.push("**Poprawne użycie komendy**: " + prefix + command.name + usage + ".")
          }

          if (command.cooldown) data.push("**Cooldown**: " + command.cooldown + ".")
          if (cooldownDefaultAmount > 0) data.push("**Cooldown**: " + cooldownDefaultAmount + ".")
          if (command.ownerOnly || command.dmOnly) {
            if (command.ownerOnly) {
              data.push("Komenda może być używana tylko przez właściciela bota.")
            }
            data.push("Komenda działa tylko w prywatnych wiadomościach.")
          } else {
            if (command.guildOnly) data.push("Komenda działa tylko na serwerach Discord.")
          }
        }

        msg.channel.send(data, { split: true })
      }
    }
  }
}
