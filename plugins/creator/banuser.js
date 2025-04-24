import db from '../../lib/database.js'

let handler = async (m, { conn, text }) => {
	let who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : !m.isGroup ? m.chat : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who) throw 'Tag user'
	let user = db.data.users[who]
	if (!user) throw `User does not exist in the database.`
	if (db.data.shizodb.rowner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who) || who == conn.user.jid) throw `[ ! ] Cannot ban *real owner*.`
	if (user.bannedcd != 0) return conn.reply(m.chat, `[!] Cannot ban @${(who || '').replace(/@s\.whatsapp\.net/g, '')} because it is already on *silent*`, m, { mentions: [who] })
	user.banned = true
	user.permaban = true
	user.spamcount = 0
	m.reply(`successfully banned`)
}

handler.help = ['ban @tag']
handler.tags = ['owner']
handler.command = /^(ban(user)?)$/i

handler.owner = true

export default handler