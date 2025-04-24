import Connection from '../../lib/connection.js'
import { delay } from '../../lib/func.js'

let handler = async (m, { conn, args, command }) => {
	let chat = Object.keys(Connection.store.chats).filter(v => v.endsWith('g.us'))
	if (command.endsWith('all') || command.endsWith('semua')) {
		for (let id of chat) { // perulangan
			await conn.groupLeave(id)
			await delay(2000) // jeda 2 detik
		}
		await m.reply('Succeed! ')
	} else if (args[0] || args.length > 5) {
		let ada = chat.find(bot => bot == args[0])
		if (!ada) throw 'wrong id/bot is not in that group '
		await conn.groupLeave(args[0])
		await m.reply('sucess')
	} else {
		if (!m.isGroup) return global.dfail('group', m, conn)
		await conn.groupLeave(m.chat)
	}

}

handler.help = ['gc', 'gcall', 'group'].map(v => 'leave' + v)
handler.tags = ['ownerr']
handler.command = /^(leaveg(c|ro?up)(all|semua)?)$/i

handler.rowner = true

export default handler