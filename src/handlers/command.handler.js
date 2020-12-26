const { Collection } = require("discord.js")
const { readdirSync } = require("fs")
const ascii = require("ascii-table")
const { prefix } = require(__dirname + "/../config/config.js")
const { argsChar1 } = require(__dirname + "/../config/config.js")
const { argsChar2 } = require(__dirname + "/../config/config.js")
const { cooldownDefaultAmount } = require(__dirname + "/../config/config.js")

const table = new ascii().setHeading("Command", "Load status")

module.exports = (client) => {
  client.commands = new Collection()
  const cooldowns = new Collection()

  const commandFiles = readdirSync(__dirname + "/../commands").filter(file => file.endsWith("command.js"))

  for (const file of commandFiles) {
    const command = require(__dirname + "/../commands/" + file)

    if (command.name) {
      client.commands.set(command.name, command)
      table.addRow(file, "Good")
    } else {
      table.addRow(file, "Bad")
      continue
    }
  }

  console.log(table.toString())

  client.on("message", (msg) => {
    const { author, guild, channel } = msg

    if (author.bot) return

    if (!msg.content.startsWith(prefix)) return

    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)

    const cmdName = args.shift().toLowerCase()


    const cmd = client.commands.get(cmdName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
    )

    if (!cmd) return

    if (cmd.guildOnly && !guild) {
      return msg.channel.send("Ta komenda działa tylko na serwerach Discord!")
    }

    if (cmd.args && !args.length) {
      var reply = "Poprawne użycie komendy: " + prefix + cmdName

      if (cmd.usage) reply = reply + " " + cmd.usage

      return msg.channel.send(reply)
    }

    if(!cooldowns.has(cmdName)) {
      cooldowns.set(cmdName, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(cmdName)
    const cooldownAmount = (cmd.cooldown || cooldownDefaultAmount) * 1000

    if (timestamps.has(author.id)) {
      const expirationTime = timestamps.get(author.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return msg.channel.send("Możesz użyć tę komendę ponownie dopiero za " + timeLeft.toFixed(1))
      }
    }

    timestamps.set(author.id, now)
    setTimeout(() => {
      timestamps.delete(author.id)
    }, cooldownAmount)

    try {
      cmd.run(msg, args)
    } catch (error) {
      console.log(error)
      channel.send("Wystąpił błąd w trakcie próby użycia tej komendy!")
    }
  })
}
