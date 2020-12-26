module.exports = {
  name: "ping",
  description: "Bot odpisuje \"Pong!\".",

  run(msg) {
    const { channel } = msg
    channel.send("Pong!")
  }
}
