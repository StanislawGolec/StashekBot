module.exports = {
  name: "clear",
  description: "Komenda usuwa daną ilość ostatnich wiadomości na konkretnym kanale. Pod warunkiem, że zostały napisane mniej niż 14 dni temu!",
  usage: [ "liczba" ],
  usageChars: "1",
  args: true,
  guildOnly: true,
  enabled: true,
  aliases: [ "clean", "cls", "clr" ],
  botPermissions: [ "SEND_MESSAGES", "MANAGE_MESSAGES" ],
  userPermissions: [ "MANAGE_MESSAGES" ],

  run(message, args) {
    const { channel } = message

    const amount = parseInt(args[0])

    if (!Number.isInteger(amount)) return channel.send("Wartość, którą podałeś nie jest liczbą!")

    if (amount < 1 || amount > 99) return channel.send("Liczba musi być z przedziału od 1 do 99!")

    channel.bulkDelete(amount + 1)
  }
}
