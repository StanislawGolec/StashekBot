const { argsChar1, argsChar2 } = require(__dirname + "/../config/config.js")

module.exports = {
  name: "clear",
  description: "Komenda usuwa daną ilość ostatnich wiadomości na konkretnym kanale. Pod warunkiem, że zostały napisane mniej niż 14 dni temu!",
  usage: argsChar1 + "liczba" + argsChar2,
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "clean", "cls", "clr" ],
  botPermissions: [ "SEND_MESSAGES", "MANAGE_MESSAGES" ],
  userPermissions: [ "MANAGE_MESSAGES" ],

  run(msg, args) {
    const { channel } = msg

    const amount = parseInt(args[0])

    if (!Number.isInteger(amount)) return channel.send("Wartość, którą podałeś nie jest liczbą!")

    if (amount < 2 || amount > 100) return channel.send("Liczba musi być z przedziału od 2 do 100!")

    channel.bulkDelete(amount)
  }
}
