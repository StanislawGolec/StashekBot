module.exports = {
  name: "remove-autorole",
  event: "messageDelete",
  enabled: true,

  async run(message) {
    const { guild, client } = message

    const autorole = client.configVariables(client, guild).autorole

    if (!autorole) return

    for (var i = autorole.length - 1; i > -1; i--) {
      if (autorole[i][0] == message.id) client.commands.get("delete-autorole-scheme").run(message, [ i + 1, true ])
    }

  }
}
