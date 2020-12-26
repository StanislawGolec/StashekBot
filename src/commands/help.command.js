const { prefix } = require(__dirname + "/../config/config.js")
const { argsChar1 } = require(__dirname + "/../config/config.js")
const { argsChar2 } = require(__dirname + "/../config/config.js")
const { cooldownDefaultAmount } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "help",
  description: "",

  run(msg, args) {
    const { commands } = msg.client

    const data = []

    if (!args.length) {
      data.push("Lista wszystkich komend:")
      data.push(commands.map((command) => command.name).join(", "))
      data.push("Użyj tej komendy w taki sposób: \"" + prefix + "help " + argsChar1 + "command name" + argsChar2 + "\", aby dowiedzieć się więcej o danej komendzie.")
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
        data.push("Nazwa: " + command.name)
        if (command.aliases) data.push("Synonimy: " + command.aliases.join(". "))
        if (command.description) data.push("Opis: " + command.description)
        if (command.usage) {
          var usage
          for (var i = 0; i < command.usage.length; i++) usage = usage + " " + argsChar1 + command.usage[i] + argsChar2
        }
        data.push("Poprawne użycie komendy: " + prefix + command.name + usage)
        data.push("Cooldown: " + '${command.cooldown || cooldownDefaultAmount}')

        msg.channel.send(data, { split: true })
      }
    }
  }
}
