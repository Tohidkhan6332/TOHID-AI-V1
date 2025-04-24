import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/india?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! INDIAN HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['india']
handler.tags = ['pies']
handler.command = /^(india)$/i

export default handler
