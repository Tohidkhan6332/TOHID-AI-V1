import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
    let shizokeys = 'shizo'        
  let res = await fetch(`https://api.shizo.top/api/quote/gnsd?apikey=${shizokeys}`)
  if (!res.ok) throw await res.text()
            let json = await res.json()
  let shizodevs = `${json.result}`
  dualButtons(conn, m, shizodevs, copyright, "😍 Good Night Love 🥰", `${usedPrefix}${command}`, "😉 Flirts", `${usedPrefix}flirt`)
}
handler.help = ['lovenight']
handler.tags = ['fun']
handler.command = /^(lovenight|goodnight)$/i

export default handler
