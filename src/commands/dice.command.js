module.exports = {
  name: "dice",
  description: "Komenda losuje wartość od 1 do 6.",
  enabled: true,
  botPermissions: ["SEND_MESSAGES"],

  run(message) {
    const { channel } = message
    const value = Math.floor((Math.random() * 6)) + 1
    channel.send("Wylosowana wartość: " + value + ".")
  }
}
