const { Client } = require("discord.js")
const chalk = require("chalk")

const { token } = require(__dirname + "/config/config.js")

const commandHandler = require(__dirname + "/handlers/command.handler")

const client = new Client()

commandHandler(client)

client.on("ready", () => {
  console.log(chalk.green("Zalogowano jako " + client.user.tag + "!"))
})

client.login(token)

client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
