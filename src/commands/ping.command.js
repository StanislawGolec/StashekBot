module.exports = {
  name: "ping",
  description: "Komenda powoduje, że bot odpisuje \"Pong!\".",
  enabled: true,
  botPermissions: ["SEND_MESSAGES"],

  run(msg) {
    const { channel } = msg
    channel.send("Pong!")
  }
}
