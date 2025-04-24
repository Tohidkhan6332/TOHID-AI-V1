import db from '../../lib/database.js'
import pkg from '@shizodevs/baileys';
const { proto, WA_DEFAULT_EPHEMERAL, groupToggleEphemeral } = pkg;

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isBotAdmin, isAdmin, isROwner }) => {
	let isEnable = /true|enable|(turn)?on|1/i.test(command)
	let chat = db.data.chats[m.chat]
	let user = db.data.users[m.sender]
	let datas = db.data.datas
	let bot = db.data.settings[conn.user.jid] || {}
	let type = (args[0] || '').toLowerCase()
	let isAll = false, isUser = false
	switch (type) {
		case 'welcome':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.welcome = isEnable
			break
		case 'delete':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.delete = isEnable
			break
		case 'antidelete':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.delete = !isEnable
			break
		case 'presence':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.presence = isEnable
			break
		case 'nsfw':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.nsfw = isEnable
			break
		case 'antilink':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antiLink = isEnable
			break
		case 'antitagsw':
		case 'antitagstatus':
		case 'antimentionsw':
		case 'antimentionstatus':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antitagsw = isEnable
			break
		case 'antisticker':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antiSticker= isEnable
			break
		case 'antitoxic':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antiToxic = isEnable
			break
		case 'antilinkkick':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.antiLinkKick = isEnable
			break
		case 'antiviewonce':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.viewonce = isEnable
			break
		case 'anticall':
		case 'autoreject':
		case 'autorejectcall':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			datas.anticall = isEnable
			break
		case 'autolevelup':
			if (!m.isGroup) {
				global.dfail('group', m, conn)
				throw false
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			} else if (!isBotAdmin) {
				global.dfail('botAdmin', m, conn)
				throw false
			}
			chat.autolevelup = isEnable
			break
		case 'public':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['self'] = !isEnable
			break
		case 'self':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['self'] = isEnable
			break
		case 'restrict':
			isAll = true
			if (!isOwner) {
				global.dfail('owner', m, conn)
				throw false
			}
			bot.restrict = isEnable
			break
		case 'owneronly':
			if (!isOwner) {
				global.dfail('owner', m, conn)
				throw false
			}
			chat.owneronly = isEnable
			break
		case 'autoread':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['autoread'] = isEnable
			break
		case 'pconly':
		case 'privateonly':
			if (isEnable && global.opts['gconly']) throw `[!] Matikan dulu *gconly !*`
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['pconly'] = isEnable
			break
		case 'gconly':
		case 'grouponly':
			if (isEnable && global.opts['pconly']) throw `[!] Matikan dulu *pconly !*`
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['gconly'] = isEnable
			break
		default:
			if (!/[01]/.test(command)) return m.reply(`*List option :*\n| adminonly | anticall | antidelete | antilink | antilinkkick | antisticker | antitagsw | antitoxic | antiviewonce | autolevelup | autonsfw | autoread | delete | gconly | nsfw | owneronly | pconly | presence | public | restrict | self | welcome |

Example :
*${usedPrefix + command} welcome*
*${usedPrefix + command} welcome*
`.trim())
			throw false
	}
	let msg = await conn.reply(m.chat, `*${type}* successfully *${isEnable ? 'on' : 'off'}right* ${isAll ? 'for this bot' : isUser ? '' : 'for this group'}${(isEnable && type == 'autonsfw') ? '\n\nactive at 21:30, inactive at 06:00 (localtime)' : ''}`, m)
	if (/self|admin|owner/.test(type)) {
		let pin = type == 'self' ? db.data.datas.pinmsg : db.data.chats[m.chat].pinmsg
		if (isEnable) pin[type] = msg.key
		if (pin[type]) await conn.sendMsg(m.chat, { pin: pin[type], type: proto.PinInChat.Type[(isEnable ? '' : 'UN')+'PIN_FOR_ALL'], time: 86400 })
		if (!isEnable) delete pin[type]
	}
}

handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler