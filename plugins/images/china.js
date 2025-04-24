import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/china?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! CHINESE HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['china']
handler.tags = ['pies']
handler.command = /^(china)$/i

export default handler
