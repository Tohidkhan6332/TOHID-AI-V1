import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/sfw/neko?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! NEKO IMAGE !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['neko']
handler.tags = ['anime']
handler.command = /^(neko)$/i

export default handler
