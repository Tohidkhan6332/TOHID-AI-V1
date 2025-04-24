import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/sfw/waifu?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! WAIFU IMAGE !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i

export default handler
