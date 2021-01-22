module.exports = {
  name: "random",
  description: "Komenda losuje wartość z podanego zakresu.",
  usage: [ "od", "do" ],
  usageChars: "11",
  args: true,
  enabled: true,
  botPermissions: ["SEND_MESSAGES"],

  run(msg, args) {
    const { channel } = msg
    let from = parseInt(args[0])
    let to = parseInt(args[1])

    if (!Number.isInteger(from)) return channel.send("Wartość pierwszego argumentu nie jest liczbą!")
    if (!Number.isInteger(to)) return channel.send("Wartość drugiego argumentu nie jest liczbą!")
    if (from >= to) return channel.send("Wartość drugiego argumentu powinna być większa od wartości pierwszego!")

    let value = 0

    if (from < 0 && to >= 0) value = Math.floor((Math.random() * (Math.abs(from) + to + 1))) + from
    else value = Math.floor((Math.random() * (to - from + 1))) + from

    channel.send("Wylosowana wartość: " + value + ".")
  }
}
