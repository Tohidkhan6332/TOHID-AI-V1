import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/fanart/mikasa?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! MIKASA FANARTS !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['mikasa']
handler.tags = ['anime']
handler.command = /^(mikasa)$/i

export default handler
