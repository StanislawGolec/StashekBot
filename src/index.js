const { Client } = require("discord.js")
const chalk = require("chalk")

const { token } = require(__dirname + "/config/config.js")

const commandHandler = require(__dirname + "/handlers/command.handler")
const settingsHandler = require(__dirname + "/handlers/settings.handler")
const coronaApiHandler = require(__dirname + "/handlers/coronaApi.handler")
const eventHandler = require(__dirname + "/handlers/event.handler")

const client = new Client({ partials: [ "USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION" ] })
var date = new Date()

commandHandler(client)
settingsHandler(client)
coronaApiHandler(client)
eventHandler(client)

client.on("ready", () => {
  console.log(chalk.green("Zalogowano jako " + client.user.tag + "!\n"))
  //client.emit("guildMemberAdd", client.guilds.cache.get("708257198404403250").members.cache.get("459746387811106827"))
  //client.settings.forEach((config, guildId) => {
  //  const { guilds } = client
  //
  //  if (guilds.cache.has(guildId)) {
  //    const guild = guilds.cache.get(guildId)
  //
  //    if (guild.available) {
  //      CLOCK CHANNEL
  //    }
  //  }
  //})
})

//function consoleLog(log, channel) {
//  console.log(log)
//  date.now()
//  channel.send(date + ": " + log)
//}

//client.on("messageReactionAdd", async (reaction, user) => {
//  if (reaction.partial) await reaction.fetch()
//
//  const { message } = reaction
//  const member = message.channel.guild.members.cache.get(user.id)
//
//  member.roles.add("708264153143574539")
//})

//client.on("messageReactionRemove", async (reaction, user) => {
//  if (reaction.partial) await reaction.fetch()
//
//  const { message } = reaction
//  const member = message.channel.guild.members.cache.get(user.id)
//
//  member.roles.remove("708264153143574539")
//})

client.login(token)

client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
