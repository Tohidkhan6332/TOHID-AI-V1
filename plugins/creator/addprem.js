import db from '../../lib/database.js'

const cooldown = 86400000

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Format : ${usedPrefix + command} <day> <@tag/quote>\n1 = 1 days\n5 = 5 days \n\nExample: *${usedPrefix + command} 10 @tag*`
	if (isNaN(args[0])) return m.reply(`[!] Duration must be in numeric format.`)
	let who = args[1] ? (args[1].replace(/\D/g, '')+'@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : ''
	if (!who) return m.reply(`Enter the number / @tag the person!`)
	let user = db.data.users
	let prems = db.data.shizodb.prems
	if (!user[who]) return m.reply(`[!] User does not exist in the database.`)
	if (prems.map(v => v.user).includes(who)) return m.reply(`*[ ! ] He is already Premium.*`)
	let durasi = parseInt(args[0])
	prems.push({user: who, date: new Date() * 1 + durasi * cooldown})
	user[who].expired = +new Date() + durasi * cooldown
	await conn.reply(m.chat, `@${who.split('@')[0]} Become a Premium User.\n\n*Duration : ${duration} days* `, m, { mentions: [who] })
}

handler.help = ['addprem <day> <@tag>']
handler.tags = ['owner']
handler.command = /^(addprem(ium)?)$/i

handler.rowner = true

export default handler