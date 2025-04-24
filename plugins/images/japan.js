import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/japan?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! JAPANESE HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['japan']
handler.tags = ['pies']
handler.command = /^(japan)$/i

export default handler
