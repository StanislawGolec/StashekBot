module.exports = {
  name: "coin",
  description: "Komenda losuje orła lub reszkę.",
  enabled: true,
  botPermissions: ["SEND_MESSAGES"],

  run(message) {
    const { channel } = message
    const value = Math.floor((Math.random() * 2))
    if (value == 0) channel.send("Orzeł!")
    else channel.send("Reszka!")
  }
}
