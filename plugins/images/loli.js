import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/sfw/loli?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! LOLI IMAGE !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['loli']
handler.tags = ['anime']
handler.command = /^(loli)$/i

export default handler
