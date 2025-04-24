import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/fanart/annie?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! ANNIE FANARTS !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['annie']
handler.tags = ['anime']
handler.command = /^(annie)$/i

export default handler
