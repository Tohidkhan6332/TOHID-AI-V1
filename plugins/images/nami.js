import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/fanart/nami?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! NAMI FANARTS !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['nami']
handler.tags = ['anime']
handler.command = /^(nami)$/i

export default handler
