import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/thailand?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! THAILANDIAN HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['thailand']
handler.tags = ['pies']
handler.command = /^(thailand)$/i

export default handler
