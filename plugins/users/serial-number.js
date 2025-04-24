import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex')
  singleButton(conn, m, `▢ *seriel number* : ${sn}`, global.copyright, "UnRegister 😐", `${usedPrefix}unreg ${sn}`)
}
handler.help = ['mysn']
handler.tags = ['rg']
handler.command = ['nserie', 'sn', 'mysn']
handler.register = true
export default handler
