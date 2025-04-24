import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
	let chat = db.data.chats[m.chat]
	if (chat.expired == 0 || chat.expired == null) return m.reply(`[ ! ] Permanent join bot, no duration.`)
	await conn.reply(m.chat, `Remaining Rental Time:\n\n*${((chat.joindate + chat.joincd) - new Date()).toTimeString()}*`, m)
}

handler.help = ['duration']
handler.tags = ['group']
handler.command = /^((check)?(duration|info)(service|join)(bot)?)$/i

handler.group = true

export default handler
