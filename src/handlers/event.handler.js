const { Collection } = require("discord.js")
const { readdirSync, existsSync, mkdirSync } = require("fs")
const chalk = require("chalk")
const { Constants: { Events } } = require("discord.js")
const events = Object.values(Events)
const serverEventsPath = __dirname + "/../events/"
const ascii = require("ascii-table")
const table = new ascii().setHeading("Event", "Load status", "Enabled")

module.exports = (client) => {
  try {
    if (!existsSync(serverEventsPath)) {
      mkdirSync(serverEventsPath)
      console.log(chalk.yellow("Folder \"events\" nie istnieje w \"" + __dirname + "\", więc właśnie został stworzony."))
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  client.events = new Collection()

  const eventFiles = readdirSync(serverEventsPath).filter(file => file.endsWith(".js"))

  for (const file of eventFiles) {
    const event = require(serverEventsPath + file)

    let loadStatus = "Bad"
    let enabled = "False"

    if (events.includes(event.event)) {
      client.events.set(event.name, event)
      loadStatus = "Good"
    }

    if (event.enabled) {
      enabled = "True"
    }

    table.addRow(file, loadStatus, enabled)

    if (typeof event.enabled == "boolean" && event.enabled == false) continue

    if (!event.event) {
      console.log(chalk.redBright("Nie znaleziono zmiennej \"event\" w \"" + file + "\"!"))
      process.exit(1)
    } else if (typeof event.event != "string") {
      console.log(chalk.redBright("\"event\" w \"" + file + "\" musi być zmienną typu \"string\"!"))
      process.exit(1)
    }

    if (!events.includes(event.event)) {
      console.log(chalk.redBright("\"event\" w \"" + file + "\" musi zawierać nazwę istniejącą wydarzenia!"))
      process.exit(1)
    }

    if (!event.run) {
      console.log(chalk.redBright("Nie znaleziono funkcji \"run\" w \"" + file + "\"!"))
      process.exit(1)
    } else if (typeof event.run != "function") {
      console.log(chalk.redBright("\"run\" w \"" + file + "\" musi być funkcją!"))
      process.exit(1)
    }

    try {
      client.on(event.event, event.run)
    } catch (error) {
      console.log(error)
    }

  }

  console.log()
  console.log(table.toString())
  console.log()
}
