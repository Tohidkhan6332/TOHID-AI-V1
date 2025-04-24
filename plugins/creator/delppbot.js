let handler = async (m, { conn }) => {
	await conn.removeProfilePicture(conn.user.jid)
	m.reply('Successfully remove PP Bot .')
}

handler.help = ['delppbot']
handler.tags = ['owner']
handler.command = /^(del(botpp|ppbot))$/i

handler.rowner = true

export default handler