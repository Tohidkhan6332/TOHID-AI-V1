import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/fanart/sakura?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! SAKURA FANARTS !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['sakura']
handler.tags = ['anime']
handler.command = /^(sakura)$/i

export default handler
