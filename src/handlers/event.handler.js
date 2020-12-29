//const { Collection } = require("discord.js")
const { readdirSync, existsSync, mkdirSync } = require("fs")
const chalk = require("chalk")
const { Constants: { Events } } = require("discord.js")
const events = Object.values(Events)
const serverEventsPath = __dirname + "/../events/"
//const ascii = require("ascii-table")
//const { prefix, cooldownDefaultAmount } = require(__dirname + "/../config/config.js")

//const table = new ascii().setHeading("Command", "Load status")

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

  const eventFiles = readdirSync(serverEventsPath).filter(file => file.endsWith(".js"))

  let eventsCount = 0

  for (const file of eventFiles) {
    const event = require(serverEventsPath + file)

    //if (event.name) {
    //  client.events.set(event.name, event)
    //  table.addRow(file, "Good")
    //} else {
    //  table.addRow(file, "Bad")
    //  continue
    //}

    if (typeof event.enabled == "boolean" && event.enabled == false) continue

    if (!event.name) {
      console.log(chalk.redBright("Nie znaleziono zmiennej \"name\" w \"" + file + "\"!"))
      process.exit(1)
    } else if (typeof event.name != "string") {
      console.log(chalk.redBright("\"name\" w \"" + file + "\" musi być zmienną typu \"string\"!"))
      process.exit(1)
    }

    if (!events.includes(event.name)) {
      console.log(chalk.redBright("\"name\" w \"" + file + "\" musi zawierać istniejącą nazwę wydarzenia!"))
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
      client.on(event.name, event.run)
      eventsCount++
    } catch (error) {
      console.log(error)
    }

  }

  console.log(chalk.blueBright("Ilość wykrytych wydarzeń: " + eventsCount))

  //console.log(table.toString())
}
