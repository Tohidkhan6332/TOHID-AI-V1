import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/fanart/sasha?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! SASHA FANARTS !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['sasha']
handler.tags = ['anime']
handler.command = /^(sasha)$/i

export default handler
