import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/indonesia?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! INDONESIAN HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['indonesia']
handler.tags = ['pies']
handler.command = /^(indonesia)$/i

export default handler
