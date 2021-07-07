module.exports = {
  name: "ping",
  description: "Komenda powoduje, że bot odpisuje \"Pong!\".",
  enabled: true,
  botPermissions: ["SEND_MESSAGES"],

  run(message) {
    const { channel } = message
    channel.send("Pong!")
  }
}
