const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "clear",
  description: "Bot usuwa daną ilość ostatnich wiadomości na konkretnym kanale.",
  args: true,
  usage: argsChar1 + "liczba" + argsChar2,
  guildOnly: true,
  aliases: [ "clean", "cls", "clr" ],
  botPermissions: [ "MANAGE_MESSAGES" ],
  userPermissions: [ "MANAGE_MESSAGES" ],


  run(msg, args) {
    const { channel } = msg

    if (args[0] == null) return channel.send("Musisz podać jakąś liczbę!")

    const amount = parseInt(args[0])
    if (!Number.isInteger(amount)) return channel.send("Wartość, którą podałeś nie jest liczbą!")

    if (amount < 2 || amount > 100) return channel.send("Liczba musi być z przedziału od 2 do 100!")

    channel.bulkDelete(amount)
  }
}
