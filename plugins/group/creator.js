import db from '../../lib/database.js'

let handler = async (m, { conn, command, usedPrefix}) => {
	let data = [...db.data.shizodb.rowner.filter(([id, isCreator]) => id && isCreator), ...db.data.shizodb.owner.filter(([id, isCreator]) => id && isCreator)]
	if (data.length == 0) throw `*[ ! ] Real Owner not set yet.*\n\n*${usedPrefix}addrealowner* to add Original Owner .\n\n*${usedPrefix}addowner* to add a Regular Owner.`
	let arr = []
	for (let x of data) {
		let bus = await conn.getBusinessProfile(x[0]+'@s.whatsapp.net') || {}
		if (bus.wid) {
			arr.push(x[0])
			const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${x[1]};;;\nFN:${x[1]}\nTEL;type=Mobile;waid=${x[0]}:${x[0]}\nX-WA-BIZ-DESCRIPTION:${bus.description}\nX-WA-BIZ-NAME:${x[1]}\nEND:VCARD`
			await conn.sendMsg(m.chat, { contacts: {  displayName: x[1], contacts: [{ vcard }] } }, { quoted: m })
		}
	}
	data = data.filter(v => !arr.includes(v[0]))
	if (data.length > 0) await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}

handler.help = ['owner']
handler.tags = ['group']
handler.command = /^(owner|creator)$/i

export default handler