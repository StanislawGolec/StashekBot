module.exports = {
  name: "calculator",
  description: "Komenda wykonuje działanie.",
  usage: [ "działanie" ],
  usageChars: "1",
  args: true,
  enabled: false,
  aliases: [ "calc" ],
  botPermissions: ["SEND_MESSAGES"],

  run(msg, args) {
    const { channel } = msg
    const text = args.join("")
    console.log("START")
    console.log(text)
    let table = operationToTable(text)
    console.log(table)
    if (Number.isInteger(table)) return channel.send("Wystąpił błąd w trakcie próby rozwiązania tego działania!\nZnak powodujący błąd: \"" + text[table] + "\"\nNumer znaku działania/Pozycja znaku w działaniu powodującego błąd: " + (table + 1) + ".")
    else if (!Array.isArray(table)) return channel.send(table)

    const result = doOperation(table, text)

    if (!Array.isArray(result)) return channel.send(result)

    channel.send("Wynik tego działania to: " + result + ".")
  }
}

















// /calc (2)-2

// /calc 2+*4
// /calc 2-/4
// /calc 2**2 itd.

// 2.5

















function operationToTable(text) {
  let table = []
  let last = ""

  for (let i = 0; i < text.length; i++) {
    if (text[i] == "(") {
      console.log("2")

      if (Number.isInteger(parseInt(last))) {
        table.push(last)
        table.push("*")
      }

      if (last == "()") table.push("*")

      let brackets = 0
      let end = 0

      for (let j = i + 1; j < text.length; j++) {
        if (text[j] == "(") brackets++
        else if (text[j] == ")") {
          if (brackets == 0) {
            end = j
            if (last == "--") table.push(text.slice(i - 1, end + 1))
            else table.push(text.slice(i, end + 1))
            i = j
            break
          } else brackets--
        }
      }

      last = "()"
    }
    else if (text[i] == ")") return i
    else if ([ "+", "-", "*", "/", "^", "v" ].includes(text[i])) {
      console.log("2")
      if (Number.isInteger(parseInt(last))) {
        table.push(last)
        table.push(text[i])
        last = text[i]
        console.log("WTF1")
      }
      else if (last != "--") {
        if (text[i] == "-") {
          last = "--"
        }
        console.log(last)
        console.log("WTF2")
      }
      else {
        if (table[table.length - 1]) last = table[table.length - 1]
        else last = ""
        console.log(last)
      }
    }
    else if (Number.isInteger(parseInt(text[i]))) {
      console.log("1")
      console.log(text[i])
      if (last == "()") table.push("*")
      console.log("!!!")
      console.log(Number.isInteger(parseInt(last)))
      if (Number.isInteger(parseInt(last))) last = last + text[i]
      else if (last == "--") {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(last)
        console.log(table)
        if (text[i] != "0" && table[table.length - 1] == "v") return "Stopniem pierwiastka nie może być liczba ujemna!"

        if (text[i] != "0") last = "-" + text[i]
        else last = "0"
        console.log(text[i])
        console.log(last)
        console.log(table)
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      }
      else {
        if (last == "v" && ((text[i] != "2" && text[i] != "3") || Number.isInteger(parseInt(text[i + 1])))) return "Stopień pierwiastka musi wynosić 2 lub 3!"
        last = text[i]
      }

      console.log("lol " + last)
      console.log("lul" + table)

      if (i == text.length - 1) table.push(last)
      console.log(i == text.length - 1)
      console.log(text)
      console.log(i)
      console.log(text.length - 1)
      console.log(table)
      console.log("lulll" + table)
    }
    else return i
  }
  console.log(table)
  if (Number.isInteger(parseInt(table[table.length - 1])) || table[table.length - 1][table[table.length - 1].length - 1] == ")") return table
  else return text.length - 1
}

function doOperation(table, text) {
  console.log(table)
  for (let i = 0; i < table.length; i++) {
    console.log("1.1")
    if (table[i][0] == "(") {
      console.log("2.1.1")
      table[i] = operationToTable(table[i].slice(1, table[i].length - 1))

      if (!Array.isArray(table[i])) return table[i]
      console.log("cos1.1")
      table[i] = doOperation(table[i], text)

      if (!Array.isArray(table[i])) return table[i]
      console.log("cos1.2")
    } else if (table[i][0] == "-" && table[i][1] == "(") {
      console.log("2.1.2")
      table[i] = operationToTable(table[i].slice(2, table[i].length - 1))

      if (!Array.isArray(table[i])) return table[i]

      console.log("cos2.1")
      table[i] = doOperation(table[i], text)

      if (!Array.isArray(table[i])) return table[i]

      table[i][0] = (0 - table[i][0]).toString()
      console.log("cos2.2")
    }
  }

  for (let i = 0; i < table.length; i++) {
    if (table[i] == "^") {
      console.log("2.2")
      table[i - 1] = Math.pow(table[i - 1], table[i + 1])
      table.splice(i, 2)
    }
    else if (table[i] == "v") {
      console.log("2.3")
      if (table[i + 1] == "2") {
        console.log("3.1")
        if (table[i - 1] >= 0) {
          table[i - 1] = Math.sqrt(table[i - 1])
        }
        else return "Liczba podpierwiastkowa pierwiasta stopnia drugiego nie może być liczbą ujemną!"
      } else {
        console.log("3.2")
        table[i - 1] = Math.cbrt(table[i - 1])
      }
      table.splice(i, 2)
    }
  }

  for (let i = 0; i < table.length; i++) {
    if (table[i] == "*") {
      console.log("2.4")
      table[i - 1] = table[i - 1] * table[i + 1]
      table.splice(i, 2)
    }
    else if (table[i] == "/") {
      console.log("2.5")
      if (table[i + 1] == "0") return "Nie można dzielić przez 0!"
      console.log("2.6")
      table[i - 1] = table[i - 1] / table[i + 1]
      table.splice(i, 2)
    }
  }

  for (let i = 0; i < table.length; i++) {
    if (table[i] == "+") {
      console.log("2.7")
      table[i - 1] = parseInt(table[i - 1]) + parseInt(table[i + 1])
      table.splice(i, 2)
    }
    else if (table[i] == "-") {
      console.log("2.8")
      table[i - 1] = parseInt(table[i - 1]) - parseInt(table[i + 1])
      table.splice(i, 2)
    }
  }
  console.log(table)
  console.log("4")
  return table
}
