import { plugins } from '../../lib/plugins.js'

let handler = async (m, { conn, usedPrefix }) => {
	let totaluser = Object.keys(db.data.users).length
	let stats = Object.entries(db.data.stats).map(([key, val]) => {
		let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key
		if (/exec/.test(name)) return
		return { name, ...val }
	})
	stats = await stats.filter(e => e).sort((a, b) => b.total - a.total)
	let cut = stats.slice(0, 3)
	let txt = `*🗄️ S.AI DATABASE 🗃️*\n📊 *Database : ${totaluser} Users*\n\n`
	txt += `💥 *Command Used:* ${stats.length}\n\n`
	txt += `🎊 *Most frequently used:*`
	for (let i of cut) {
		txt += `\n${i.name.replaceAll('.js','')}`
		txt += `: *${i.total} hit*`
	}
           conn.reply(m.chat, txt, m)

            
}

handler.help = ['database']
handler.tags = ['tools']
handler.command = /^(db|database)$/i

export default handler