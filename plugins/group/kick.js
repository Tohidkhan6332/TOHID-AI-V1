import db from '../../lib/database.js'
import { sticker } from '../../lib/sticker.js'
import { somematch } from '../../lib/func.js'

let handler = async (m, { conn, text, participants }) => {
	if (db.data.settings[conn.user.jid].restrict) {
		try {
			let anu = await (await fetch(`https://nekos.best/api/v2/kick`)).json()
			anu = anu.results[0].url
			if (!anu) throw Error('error : no url')
			let buffer = await sticker(false, anu, packname, author)
			await conn.sendFile(m.chat, buffer, '', '', m)
		} catch { throw `[ RESTRICT ENABLED ]` }
	} else {
		let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : text ? (text.replace(/\D/g, '') + '@s.whatsapp.net') : ''
		if (!who || who == m.sender) throw '*Quote / tag* the target you want to kick!!'
		if (participants.filter(v => v.id == who).length == 0) throw `Target is not in Group ! `
		let oww = [...global.mods, ...db.data.datas.rowner.map(v => v[0]), ...db.data.datas.owner.map(v => v[0])].map(v => v + '@s.whatsapp.net')
		if (somematch([conn.user.jid, ...oww], who)) return m.reply('Dont be like that to the Owner')
		db.data.users[who].warn = 0
		await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
		await conn.reply(m.chat, `@${m.sender.split`@`[0]} has removed @${who.split`@`[0]} from the group.`, m, { mentions: [m.sender, who] })
	}
}

handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick|tendang)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler