const { Collection } = require("discord.js")
const chalk = require("chalk")
const { readdirSync, existsSync, mkdirSync } = require("fs")
const ascii = require("ascii-table")
let prefix = ""
const serverCommandsPath = __dirname + "/../commands/"
const table = new ascii().setHeading("Command", "Load status", "Enabled")

module.exports = (client) => {
  try {
    if (!existsSync(serverCommandsPath)) {
      mkdirSync(serverCommandsPath)
      console.log(chalk.yellow("Folder \"commands\" nie istnieje w \"" + __dirname + "\", więc właśnie został stworzony."))
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  client.commands = new Collection()
  const cooldowns = new Collection()

  const commandFiles = readdirSync(serverCommandsPath).filter(file => file.endsWith(".js"))

  for (const file of commandFiles) {
    const command = require(serverCommandsPath + file)

    let loadStatus = "Bad"
    let enabled = "False"

    if (command.name) {
      client.commands.set(command.name, command)
      loadStatus = "Good"
    }

    if (command.enabled) {
      enabled = "True"
    }

    table.addRow(file, loadStatus, enabled)
  }

  console.log(table.toString())

  //client.on("messageUpdate", (oldMessage, newMessage) => {})

  //client.on("messageReactionAdd", (reaction, user) => {})

  client.on("message", (msg) => {
    const { author, guild, member, channel, client } = msg

    const { settings } = client

    const { prefix, argsChar1, argsChar2, argsChar3, argsChar4, cooldownDefaultAmount, owner, disabledCommands } = client.configVariables(client, guild)

    if (author.bot) return

    if (!msg.content.startsWith(prefix)) return

    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(" ")

    const cmdName = args.shift().toLowerCase()

    const cmd =
      client.commands.get(cmdName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(cmdName)
      )

    if (!cmd) return channel.send("Nie znaleziono takiej komendy! Napisz " + prefix + "help, aby wyświelić listę wszystkich istniejących komend.")

    if ((!cmd.enabled && author.id != owner) || (!cmd.enabled && author.id == owner && guild)) {
      channel.send("Komenda jest aktualnie wyłączona przez twórcę bota!")
      if (author.id == owner && !cmd.guildOnly) author.send("**Możesz użyć komendy \"" + cmd.name + "\" pisząc jako właściciel bota w wiadomości prywatnej, gdy komenda jest wyłączona!**")
      return
    }

    if (guild && disabledCommands && disabledCommands.includes(cmd.name)) {
      return channel.send("Ta komenda jest wyłączona ta tym serwerze!")
    }

    if (cmd.ownerOnly) {
      if (author.id != owner || (author.id == owner && guild)) {
        channel.send("Nie znaleziono takiej komendy! Napisz " + prefix + "help, aby wyświelić listę wszystkich istniejących komend.")
        if (author.id == owner) {
          author.send("**Komenda \"" + cmd.name + "\" działa tylko w prywatnych wiadomościach!**")
        }
        return
      }
    } else {
      if (cmd.guildOnly && cmd.dmOnly) {
        channel.send("Wystąpił błąd w trakcie próby użycia tej komendy!")
        console.log(chalk.redBright("Komenda \"" + cmd.name + "\" z jakiegoś powodu ma ustawione na \"true\" \"guildOnly\" jak i \"dmOnly\"!"))
        guild.members.cache.get(owner).send("**Komenda \"" + cmd.name + "\" z jakiegoś powodu ma ustawione na \"true\" \"guildOnly\" jak i \"dmOnly\"!**")
      }

      if (cmd.guildOnly && !guild) {
        return msg.channel.send("Ta komenda działa tylko na serwerach Discord!")
      }

      if (cmd.dmOnly && guild) {
        return msg.channel.send("Ta komenda działa tylko w prywatnych wiadomościach!")
      }
    }

    if (cmd.userPermissions && cmd.userPermissions.length) {
      if (!member.permissionsIn(channel).has(cmd.userPermissions)) {
        return channel.send("Nie masz uprawnień do używania tej komendy w tym kanale!")
      }
    }

    if (cmd.botPermissions && cmd.botPermissions.length) {
      if (guild && !guild.me.permissionsIn(channel).has(cmd.botPermissions)) {
        channel.send("Nie mam uprawnień do używania tej komendy w tym kanale!")
        if (member.permissionsIn(channel).has("ADMINISTRATOR")) member.send("Brakujące uprawnienia do użycia komendy \"" + cmd.name + "\" w kanale <#" + channel + ">: **" + cmd.botPermissions.join("**, **") + "**.\nWiadomość wysyłana tylko do administratorów danego serwera.")
        return
      }
    }

    if (cmd.args && !args.length) {
      if (cmd.usage) {
        let reply = "Poprawne użycie komendy: " + prefix + cmdName

        let usage = ""
        for (var i = 0; i < cmd.usageChars.length; i++) {
          if (cmd.usageChars[i] = "1") {
            usage = usage + " " + argsChar1 + cmd.usage[i] + argsChar2
          } else if (cmd.usageChars[i] = "2") {
            usage = usage + " " + argsChar3 + cmd.usage[i] + argsChar4
          }
        }
        reply = reply + usage


        return channel.send(reply)
      }

      return channel.send("Komenda wymaga argumentów. Jednak nie udało mi się znaleźć schematu poprawnego użycia.")
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
