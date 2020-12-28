module.exports = {
  name: "ping",
  description: "Bot odpisuje \"Pong!\".",
  enabled: true,

  run(msg) {
    const { channel } = msg
    channel.send("Pong!")
  }
}
