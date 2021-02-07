module.exports = {
  name: "dice",
  description: "Komenda losuje wartość od 1 do 6.",
  enabled: true,
  botPermissions: ["SEND_MESSAGES"],

  run(msg) {
    const { channel } = msg
    const value = Math.floor((Math.random() * 6)) + 1
    channel.send("Wylosowana wartość: " + value + ".")
  }
}
