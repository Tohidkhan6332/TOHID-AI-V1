import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
    let shizokeys = 'shizo'        
  let res = await fetch(`https://api.shizo.top/api/quote/shayari?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
            let json = await res.json()
  let shizodevs = `${json.result}`
  dualButtons(conn, m, shizodevs, copyright, "Shayari 🪄", `${usedPrefix}${command}`, "🌹 RoseDay", `${usedPrefix}roseday`)
}
handler.help = ['shayari']
handler.tags = ['fun']
handler.command = /^(shayari|sayari)$/i

export default handler
