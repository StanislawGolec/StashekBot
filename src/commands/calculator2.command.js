module.exports = {
  name: "calculator2",
  description: "Komenda wykonuje działanie.",
  usage: [ "działanie" ],
  usageChars: "1",
  args: true,
  enabled: false,
  aliases: [ "c" ],
  botPermissions: ["SEND_MESSAGES"],

  run(msg, args) {
    /*const { channel } = msg
    const text = args.join("")
    console.log("START")
    console.log(text)
    let table = operationToTable(text)
    console.log(table)
    if (Number.isInteger(table)) return channel.send("Wystąpił błąd w trakcie próby rozwiązania tego działania!\nZnak powodujący błąd: \"" + text[table] + "\"\nNumer znaku działania/Pozycja znaku w działaniu powodującego błąd: " + (table + 1) + ".")
    else if (!Array.isArray(table)) return channel.send(table)

    const result = doOperation(table, text)

    if (!Array.isArray(result)) return channel.send(result)

    channel.send("Wynik tego działania to: " + result + ".")*/
    doOperation(operationToTable(args.join("")))
  }
}

function operationToTable(text) {
  let table = []

  for (let i = 0; i < text.length; i++) {
    if ([ "+", "-", "*", "/", "^", "v" ].includes(text[i]) && (Number.isInteger(parseInt(text[i - 1])) || text[i - 1] == ")" || text[i - 1] == "0")) table.push(text[i])
    else if (text[i] == "(") {
      if (Number.isInteger(parseInt(text[i - 1])) || text[i - 1] == ")" || text[i - 1] == "0") table.push("*")

      let brackets = 0
      let end = 0

      for (let j = i + 1; j < text.length; j++) {
        if (text[j] == "(") brackets++
        else if (text[j] == ")") {
          if (brackets == 0) {
            end = j







            if (table.length && table.length == 1 && table[0] == "-") table[0] = "-" + text.slice(i, end + 1)
            else table.push(text.slice(i, end + 1))







            i = j
            break
          } else brackets--
        }
      }
    } else if (text[i] == ")") return i
    else if (Number.isInteger(parseInt(text[i])) || text[i] == "0") {
      let end = i
      for (let j = i + 1; i < text.length; i++) {
        if (Number.isInteger(parseInt(text[j])) || text[j] == "0") end = j
        else break
      }








      if (table.length && table.length == 1 && table[0] == "-") table[0] = "-" + text.slice(i, end + 1)
      else table.push(text.slice(i, end + 1))







      i = end
    }
  }
  console.log(text)
  console.log(table.join(" "))
  return table
}

function doOperation(table) {
  for (let i = 0; i < table.length; i++) {
    if (table[i][0] == "(") {
      table[i] = operationToTable(table[i].slice(1, table[i].length - 1))

      if (!Array.isArray(table[i])) return table[i]

      table[i] = doOperation(table[i])

      if (!Array.isArray(table[i])) return table[i]
    } else if (table[i][0] == "-" && table[i][1] == "(") {
      table[i] = operationToTable(table[i].slice(2, table[i].length - 1))

      if (!Array.isArray(table[i])) return table[i]

      table[i] = doOperation(table[i])

      if (!Array.isArray(table[i])) return table[i]

      table[i][0] = (0 - table[i][0]).toString()
    }
  }

  for (let i = 0; i < table.length; i++) {
    if (table[i] == "^") {
      table[i - 1] = Math.pow(table[i - 1], table[i + 1])
      table.splice(i, 2)
    } else if (table[i] == "v") {
      if (table[i + 1] == "2") {
        if (table[i - 1] >= 0) {
          table[i - 1] = Math.sqrt(table[i - 1])
        }
        else return "Liczba podpierwiastkowa pierwiasta stopnia drugiego nie może być liczbą ujemną!"
      } else table[i - 1] = Math.cbrt(table[i - 1])
      table.splice(i, 2)
    }
  }

  for (let i = 0; i < table.length; i++) {
    if (table[i] == "*") {
      table[i - 1] = table[i - 1] * table[i + 1]
      table.splice(i, 2)
    } else if (table[i] == "/") {
      if (table[i + 1] == "0") return "Nie można dzielić przez 0!"

      table[i - 1] = table[i - 1] / table[i + 1]
      table.splice(i, 2)
    }
  }

  for (let i = 0; i < table.length; i++) {
    if (table[i] == "+") {

      table[i - 1] = parseInt(table[i - 1]) + parseInt(table[i + 1])
      table.splice(i, 2)
    } else if (table[i] == "-") {

      table[i - 1] = parseInt(table[i - 1]) - parseInt(table[i + 1])
      table.splice(i, 2)
    }
  }
  console.log(table)
  return table
}
