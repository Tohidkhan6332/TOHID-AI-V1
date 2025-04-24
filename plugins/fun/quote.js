import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
    let shizokeys = 'shizo'        
  let res = await fetch(`https://api.shizo.top/api/quote/quotes?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
            let json = await res.json()
  let shizodevs = `${json.result}`
  singleButton(conn, m, shizodevs, copyright, "Quotes 🔖", `${usedPrefix}${command}`)
}
handler.help = ['quote']
handler.tags = ['fun']
handler.command = /^(quotes|quote|quote)$/i

export default handler
