import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {
let shizokey = "shizo"
let url = `https://api.shizo.top/api/pies/vietnam?apikey=${shizokey}`
  imgSingleButton(conn, m, url, "*!! VIETNAMESE HOT GIRL IMAGE 🥵 !!*", copyright, "Next Image 🔖", `${usedPrefix}${command}`)
}
handler.help = ['vietnam']
handler.tags = ['pies']
handler.command = /^(vietnam)$/i

export default handler
