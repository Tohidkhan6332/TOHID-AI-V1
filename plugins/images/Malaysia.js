import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/malaysia?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! MALAYSIAN HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['malaysia']
handler.tags = ['pies']
handler.command = /^(malaysia)$/i

export default handler
