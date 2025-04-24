import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/korea?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! KOREAN HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['korea']
handler.tags = ['pies']
handler.command = /^(korea)$/i

export default handler
