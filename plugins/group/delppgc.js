let handler = async (m, { conn }) => {
	await conn.removeProfilePicture(m.chat)
}

handler.help = ['delppgc']
handler.tags = ['group']
handler.command = /^(d(el(ete)?)?pp(gc|gro?up)?)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler