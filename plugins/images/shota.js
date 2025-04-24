import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/sfw/shota?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! SHOTA IMAGE !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['shota']
handler.tags = ['anime']
handler.command = /^(shota)$/i

export default handler
