module.exports = {
  name: "ping",
  description: "",

  run(msg) {
    const { channel } = msg
    channel.send("Pong!")
  }
}
