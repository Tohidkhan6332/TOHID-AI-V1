import db from '../../lib/database.js'
const { proto } = await (await import('@shizodevs/baileys')).default

let handler = async (m, { text, conn }) => {
	let id = m.isGroup ? m.chat : text ? `${text.includes('@') ? text : text + '@g.us'}` : ''
	if (!id) return m.reply('[!] Use in Group / enter Group ID')
	let chat = db.data.chats[id]
	if (!chat) return m.reply(`Group ID does not exist in the database. `)
	chat.isBanned = false
	chat.permaBan = false
	chat.spamcount = 0
	chat.lastmute = 0
	chat.mutecd = 0
	try {
		await conn.reply(id, 'The bot can be reused.', m)
		let pin = db.data.chats[id].pinmsg
		if (pin['banchat']) {
			await conn.sendMsg(id, { pin: pin['banchat'], type: proto.PinInChat.Type['UNPIN_FOR_ALL'] })
			delete pin['banchat']
		}
	} catch (e) {
		console.log(e)
		m.reply(e.message)
	}
}

handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^(unbanchat)$/i

handler.owner = true

export default handler