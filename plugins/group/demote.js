import db from '../../lib/database.js'

let handler = async (m, { conn }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who || who.includes(conn.user.jid) || m.sender == who) throw `*quote / @tag* one of !`
	let ow = db.data.shizodb
	let data = [...global.mods, ...ow.rowner.map(v => v[0]), ...ow.owner.map(v => v[0])].map(v => v + '@s.whatsapp.net')
	if (data.some(v => who.includes(v))) return m.reply(`That's impossible`)
	try {
		await conn.groupParticipantsUpdate(m.chat, [who], 'demote')
		await conn.reply(m.chat, `@${m.sender.split`@`[0]} has removed @${who.split`@`[0]} from admin.`, m, { mentions: [m.sender, who] })
	} catch (e) {
		console.log(e)
	}
}

handler.help = ['demote @tag']
handler.tags = ['group']
handler.command = /^(demote)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler