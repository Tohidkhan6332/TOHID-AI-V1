import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
    let shizokeys = 'shizo'        
  let res = await fetch(`https://api.shizo.top/api/quote/flirt?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
            let json = await res.json()
  let shizodevs = `${json.result}`
  dualButtons(conn, m, shizodevs, copyright, "😉 Flirts", `${usedPrefix}${command}`, "😍 Good Night Love 🥰", `${usedPrefix}lovenight`)
}
handler.help = ['flirt']
handler.tags = ['fun']
handler.command = /^(flirt|falart)$/i

export default handler
