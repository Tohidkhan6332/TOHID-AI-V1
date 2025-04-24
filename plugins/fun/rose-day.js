import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
    let shizokeys = 'shizo'        
  let res = await fetch(`https://api.shizo.top/api/quote/roseday?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
            let json = await res.json()
  let shizodevs = `${json.result}`
  dualButtons(conn, m, shizodevs, copyright, "🌹 RoseDay", `${usedPrefix}${command}`, "Shayari 🪄", `${usedPrefix}shayari`)
}
handler.help = ['rose']
handler.tags = ['fun']
handler.command = /^(roseday|rose)$/i

export default handler
