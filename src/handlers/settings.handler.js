const { Collection } = require("discord.js")
const { readdirSync, readFileSync, writeFileSync } = require("fs")
const yaml require("js-yaml")

const serverConfigPath = "/config/servers"

module.exports = (client) => {
  client.settings = new Collection()

  const settingsFiles = readFileSync(__firname + "/.." + serverConfigPath)
}
