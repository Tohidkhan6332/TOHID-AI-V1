import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/sfw/husbu?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! HUSBU IMAGE !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['husbu']
handler.tags = ['anime']
handler.command = /^(husbu)$/i

export default handler
