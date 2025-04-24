import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/fanart/vivi?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! VIVI FANARTS !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['vivi']
handler.tags = ['anime']
handler.command = /^(vivi)$/i

export default handler
