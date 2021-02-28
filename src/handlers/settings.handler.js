const { Collection } = require("discord.js")
const { Github } = require("github-api")
const chalk = require("chalk")
const { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } = require("fs")
const yaml = require("js-yaml")

const serverConfigPath = "/config/servers/"

module.exports = (client) => {
  client.settings = new Collection()

  try {
    if (!existsSync(__dirname + "/../" + serverConfigPath)) {
      mkdirSync(__dirname + "/../" + serverConfigPath)
      console.log(chalk.yellow("Folder \"servers\" nie istnieje w \"" + __dirname + "\", więc właśnie został stworzony."))
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  const settingsFiles = readdirSync(__dirname + "/.." + serverConfigPath).filter(file => file.endsWith(".yaml"))

  try {
    for (const file of settingsFiles) {
      const settingsFile = readFileSync(__dirname + "/.." + serverConfigPath + "/" + file, "utf8")
      const fileData = yaml.safeLoad(settingsFile)

      const guildId = file.split(".")[0]
      const data = {
        token: require(__dirname + "/../config/config.js").token,
        prefix: fileData.prefix || require(__dirname + "/../config/config.js").prefix,
        argsChar1: fileData.argsChar1 || require(__dirname + "/../config/config.js").argsChar1,
        argsChar2: fileData.argsChar2 || require(__dirname + "/../config/config.js").argsChar2,
        argsChar3: fileData.argsChar3 || require(__dirname + "/../config/config.js").argsChar3,
        argsChar4: fileData.argsChar4 || require(__dirname + "/../config/config.js").argsChar4,
        language: fileData.language || require(__dirname + "/../config/config.js").language,
        cooldownDefaultAmount: fileData.cooldownDefaultAmount || require(__dirname + "/../config/config.js").cooldownDefaultAmount,
        owner: require(__dirname + "/../config/config.js").owner,
        coronaApi: require(__dirname + "/../config/config.js").coronaApi,
        clockChannelsIds: fileData.clockChannelsIds,
        administrationChannelId: fileData.administrationChannelId,
        welcomeChannelId: fileData.welcomeChannelId,
        farewellChannelId: fileData.farewellChannelId,
        autorole: fileData.autorole,
        autopin: fileData.autopin
      }

      client.settings.set(guildId, data)
    }
  } catch (error) {
    console.log(error)
  }

  client.saveConfig = (guildId) => {
    if (client.settings.has(guildId)) {
      try {
        const { prefix, argsChar1, argsChar2, argsChar3, argsChar4, language, cooldownDefaultAmount, clockChannelsIds, administrationChannelId, welcomeChannelId, farewellChannelId, autorole, autopin } = client.settings.get(guildId)

        const dataToSave = {
          prefix: prefix,
          argsChar1: argsChar1,
          argsChar2: argsChar2,
          argsChar3: argsChar3,
          argsChar4: argsChar4,
          language: language,
          cooldownDefaultAmount: cooldownDefaultAmount,
          clockChannelsIds: clockChannelsIds,
          administrationChannelId: administrationChannelId,
          welcomeChannelId: welcomeChannelId,
          farewellChannelId: farewellChannelId,
          autorole: autorole,
          autopin: autopin
        }

        var user = new Github({
          username: 'SCpl3',
          password: '23,3@#,#SCsc',
          auth: 'basic'
        })

        var repository = user.getRepo('SCpl3', 'SCpl-Discord-Bot')

        repository.write(
          'main',
          (__dirname + "/.." + serverConfigPath + "/" + guildId + ".yaml"),
          yaml.safeDump(dataToSave),
          'YOUR_COMMIT_MESSAGE',
          function(err) {}
        );

        writeFileSync(__dirname + "/.." + serverConfigPath + "/" + guildId + ".yaml", yaml.safeDump(dataToSave), "utf8")

        const settingsFile = readFileSync(__dirname + "/.." + serverConfigPath + "/" + guildId + ".yaml", "utf8")
        const fileData = yaml.safeLoad(settingsFile)

        const data = {
          token: require(__dirname + "/../config/config.js").token,
          prefix: fileData.prefix || require(__dirname + "/../config/config.js").prefix,
          argsChar1: fileData.argsChar1 || require(__dirname + "/../config/config.js").argsChar1,
          argsChar2: fileData.argsChar2 || require(__dirname + "/../config/config.js").argsChar2,
          argsChar3: fileData.argsChar3 || require(__dirname + "/../config/config.js").argsChar3,
          argsChar4: fileData.argsChar4 || require(__dirname + "/../config/config.js").argsChar4,
          language: fileData.language || require(__dirname + "/../config/config.js").language,
          cooldownDefaultAmount: fileData.cooldownDefaultAmount || require(__dirname + "/../config/config.js").cooldownDefaultAmount,
          owner: require(__dirname + "/../config/config.js").owner,
          coronaApi: require(__dirname + "/../config/config.js").coronaApi,
          clockChannelsIds: fileData.clockChannelsIds,
          administrationChannelId: fileData.administrationChannelId,
          welcomeChannelId: fileData.welcomeChannelId,
          farewellChannelId: fileData.farewellChannelId,
          autorole: fileData.autorole,
          autopin: fileData.autopin
        }

        client.settings.set(guildId, data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  client.configVariables = (client, guild) => {
    return guild ? client.settings.get(guild.id) || require(__dirname + "/../config/config.js") : require(__dirname + "/../config/config.js")
  }
}
