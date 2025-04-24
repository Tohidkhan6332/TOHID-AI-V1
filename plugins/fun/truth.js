import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
    let shizokeys = 'shizo'        
  let res = await fetch(`https://api.shizo.top/api/quote/truth?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
            let json = await res.json()
  let shizodevs = `${json.result}`
  dualButtons(conn, m, shizodevs, copyright, "Truth 💯", `${usedPrefix}${command}`, "Dare ✊️", `${usedPrefix}dare`)
}
handler.help = ['truth']
handler.tags = ['fun']
handler.command = /^(truth|turuth)$/i

export default handler
