let handler = async(m, { conn }) => {
	try {
		let url = await conn.profilePictureUrl(m.chat, 'image')
		await conn.sendMsg(m.chat, { image: { url: url } }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Failed to fetch group pp.`)
	}
}

handler.help = ['getppgc']
handler.tags = ['group']
handler.command = /^((getpp|ava)(gc|gro?up))$/i

handler.group = true

export default handler