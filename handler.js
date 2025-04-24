import * as os from 'os'
import chalk from 'chalk'
import db, { loadDatabase } from './lib/database.js'
import Connection from './lib/connection.js'
import fs, { unwatchFile, watchFile } from 'fs'
import Helper from './lib/helper.js'
import path, { join } from 'path'
import printMessage from './lib/print.js'
import Queque from './lib/queque.js'
import { fileURLToPath } from 'url'
import { format } from 'util'
import { plugins } from './lib/plugins.js'
import { smsg } from './lib/simple.js'

/** @type {import('@shizodevs/baileys')} */
const { getContentType } = (await import('@shizodevs/baileys')).default

const isNumber = x => typeof x === 'number' && !isNaN(x)
/**
 * Handle messages upsert
 * @this {import('./lib/connection').Socket}
 * @param {import('@shizodevs/baileys').BaileysEventMap<unknown>['messages.upsert']} chatUpdate
 */
export async function handler(chatUpdate) {
	this.msgqueque = this.msgqueque || new Queque()
	if (!chatUpdate)
		return
	let m = chatUpdate.messages[chatUpdate.messages.length - 1]
	if (!m)
		return
	if (db.data == null)
		await loadDatabase()
	try {
		m = smsg(this, m) || m
		if (!m)
			return
		m.exp = 0
		m.limit = false
		try {
			// TODO: use loop to insert data instead of this
			let user = db.data.users[m.sender]
			if (m.sender.endsWith('@s.whatsapp.net')) {
				if (typeof user !== 'object')
				db.data.users[m.sender] = {}
				if (user) {
				//Add From Oreo Bot
				if (!('registered' in user)) user.registered = false
				if (!user.registered) {
          if (!('name' in user)) user.name = m.name
          if (!isNumber(user.age)) user.age = -1
          if (!isNumber(user.regTime)) user.regTime = -1
        }
                if (!isNumber(user.afk)) user.afk = -1
                if (!('afkReason' in user)) user.afkReason = ''
				} else db.data.users[m.sender] = {
				//Add From Oreo Bot
				registered: false,
          name: m.name,
          age: -1,
          regTime: -1,
			    afk: -1,
                afkReason: '',
				}
			}
			let chat = db.data.chats[m.chat]
			if (m.chat.endsWith('@g.us')) {
				if (typeof chat !== 'object')
					db.data.chats[m.chat] = {}
				if (chat) {
				//Add From Oreo Bot
				if (!('presence' in chat)) chat.presence = false
					if (!('isBanned' in chat)) chat.isBanned = false
					if (!('welcome' in chat)) chat.welcome = false
					if (!('detect' in chat)) chat.detect = false
					if (!('sWelcome' in chat)) chat.sWelcome = ''
					if (!('sBye' in chat)) chat.sBye = ''
					if (!('delete' in chat)) chat.delete = true
					if (!('antiLink' in chat)) chat.antiLink = false
					if (!('nsfw' in chat)) chat.nsfw = false
					
				} else db.data.chats[m.chat] = {
				//Add From Oreo Bot
				presence: false,
					isBanned: false,
					welcome: false,
					detect: false,
					sWelcome: '',
					sBye: '',
					delete: true,
					antiLink: false,
					nsfw: false,
					
				}
			let shizodb = db.data.shizodb
			if (typeof shizodb !== 'object') db.data.shizodb = {}
			if (shizodb) {
				if (!('rowner' in shizodb)) shizodb.rowner = []
				if (!('owner' in shizodb)) shizodb.owner = []
				if (!('prems' in shizodb)) shizodb.prems = [{user: '', date: 0}]
			} else db.data.shizodb = {
				rowner: [],
				owner: [],
				prems: [{user: '', date: 0}],
}
			}
			let settings = db.data.settings[this.user.jid]
			if (typeof settings !== 'object') db.data.settings[this.user.jid] = {}
			if (settings) {
				if (!('self' in settings)) settings.self = false
				if (!('autoread' in settings)) settings.autoread = false
				if (!('restrict' in settings)) settings.restrict = false
			} else db.data.settings[this.user.jid] = {
				self: false,
				autoread: false,
				restrict: false
			}
		} catch (e) {
			console.error(e)
		}

		const isMods = global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isROwner = isMods || [this.decodeJid(this.user.id), ...db.data.shizodb.rowner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isOwner = isROwner || m.fromMe || db.data.shizodb.owner.map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isPrems = isOwner || db.data.shizodb.prems.map(v => v.user).includes(m.sender)

		if (opts['nyimak'])
			return
		if (opts['swonly'] && m.chat !== 'status@broadcast')
			return
		if (typeof m.text !== 'string')
			m.text = ''

		if (opts['queque'] && m.text && !m.fromMe && !(isMods || isPrems)) {
			const id = m.id
			this.msgqueque.add(id)
			await this.msgqueque.waitQueue(id)
		}

		if (m.fromMe && m.isBaileys) return
		m.exp += Math.ceil(Math.random() * 10)

		let usedPrefix
		let _user = db.data?.users?.[m.sender]

		const groupMetadata = (m.isGroup ? await Connection.store.fetchGroupMetadata(m.chat, this.groupMetadata) : {}) || {}
		const participants = (m.isGroup ? groupMetadata.participants : []) || []
		const user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
		const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
		const isRAdmin = user?.admin == 'superadmin' || false
		const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
		const isBotAdmin = bot?.admin || false // Are you Admin?
		const isAdminOwner = isAdmin || isOwner

		const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
		for (let name in plugins) {
			let plugin = plugins[name]
			if (!plugin)
				continue
			if (plugin.disabled)
				continue
			const __filename = join(___dirname, name)
			if (typeof plugin.all === 'function') {
				try {
					await plugin.all.call(this, m, {
						chatUpdate,
						__dirname: ___dirname,
						__filename
					})
				} catch (e) {
					// if (typeof e === 'string') continue
					console.error(e)
					if (db.data.shizodb.rowner.length > 0) {
						for (let [jid] of db.data.shizodb.rowner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
							let data = (await this.onWhatsApp(jid))[0] || {}
							if (data.exists)
								m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
						}
					}
				}
			}
			if (!opts['restrict'])
				if (plugin.tags && plugin.tags.includes('admin')) {
					// global.dfail('restrict', m, this)
					continue
				}
			const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
			let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix
			let match = (_prefix instanceof RegExp ? // RegExp Mode?
				[[_prefix.exec(m.text), _prefix]] :
				Array.isArray(_prefix) ? // Array?
					_prefix.map(p => {
						let re = p instanceof RegExp ? // RegExp in Array?
							p :
							new RegExp(str2Regex(p))
						return [re.exec(m.text), re]
					}) :
					typeof _prefix === 'string' ? // String?
						[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
						[[[], new RegExp]]
			).find(p => p[1])
			if (typeof plugin.before === 'function') {
				if (await plugin.before.call(this, m, {
					match,
					conn: this,
					participants,
					groupMetadata,
					user,
					bot,
					isROwner,
					isOwner,
					isRAdmin,
					isAdmin,
					isBotAdmin,
					isPrems,
					chatUpdate,
					__dirname: ___dirname,
					__filename
				}))
					continue
			}
			if (typeof plugin !== 'function')
				continue
			if ((usedPrefix = (match[0] || '')[0])) {
				let noPrefix = m.text.replace(usedPrefix, '')
				let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
				args = args || []
				let _args = noPrefix.trim().split` `.slice(1)
				let text = _args.join` `
				command = (command || '').toLowerCase()
				let fail = plugin.fail || global.dfail // When failed
				let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
					plugin.command.test(command) :
					Array.isArray(plugin.command) ? // Array?
						plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
							cmd.test(command) :
							cmd === command
						) :
						typeof plugin.command === 'string' ? // String?
							plugin.command === command :
							false

				if (!isAccept)
					continue
				m.plugin = name
				if (m.chat in db.data.chats || m.sender in db.data.users) {
					let chat = db.data.chats[m.chat]
					let user = db.data.users[m.sender]
					let anti = /_/.test(m.plugin)
					let zzz = /zzz|genshin/.test(m.plugin)
					if (!/_|unbanchat/.test(m.plugin) && chat?.isBanned)
						return // Except this
					if (!/_|unbanuser/.test(m.plugin) && user?.banned)
						return
					if (!anti && !zzz && chat?.adminonly && !isAdminOwner)
						return
					if (!isROwner && opts['self'] && !anti)
						return
					if (opts['pconly'] && m.chat.endsWith('g.us') && !anti)
						return
					if (opts['gconly'] && !m.chat.endsWith('g.us') && !isPrems && !/_|menfess|ww/.test(m.plugin))
						return
					if (!zzz && chat?.owneronly && !isOwner)
						return
				}
				if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
					fail('owner', m, this)
					continue
				}
				if (plugin.rowner && !isROwner) { // Real Owner
					fail('rowner', m, this)
					continue
				}
				if (plugin.owner && !isOwner) { // Number Owner
					fail('owner', m, this)
					continue
				}
				if (plugin.mods && !isMods) { // Moderator
					fail('mods', m, this)
					continue
				}
				if (plugin.premium && !isPrems && !m.isGroup) { // Premium
					fail('premium', m, this)
					continue
				}
				if (plugin.nsfw && m.isGroup && !db.data.chats[m.chat].nsfw) {
					fail('nsfw', m, this)
					continue
				}
				if (plugin.game && m.isGroup && !db.data.chats[m.chat].game) {
					fail('game', m, this)
					continue
				}
				if (plugin.group && !m.isGroup) { // Group Only
					fail('group', m, this)
					continue
				} else if (plugin.botAdmin && !isBotAdmin) { // You Admin
					fail('botAdmin', m, this)
					continue
				} else if (plugin.admin && !isAdmin) { // User Admin
					fail('admin', m, this)
					continue
				}
				if (plugin.private && m.isGroup) { // Private Chat Only
					fail('private', m, this)
					continue
				}
				if (plugin.register == true && _user.registered == false) { // Butuh daftar?
					fail('unreg', m, this)
					continue
				}
				m.isCommand = true
				_user.spamcount += 1
				let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
				if (xp > 200)
					m.reply('lmao....') // Hehehe
				else
					m.exp += xp
				if (!isPrems && plugin.limit && db.data.users[m.sender].limit < plugin.limit * 1) {
					this.reply(m.chat, `Your limit has been used up, please buy via *${usedPrefix}buy*`, m)
					continue // Limit habis
				}
				if (plugin.level > _user.level) {
					this.reply(m.chat, `${plugin.level} level is required to use this command. Your level is ${_user.level}`, m)
					continue // If the level has not been reached
				}
				let extra = {
					match,
					usedPrefix,
					noPrefix,
					_args,
					args,
					command,
					text,
					conn: this,
					participants,
					groupMetadata,
					user,
					bot,
					isMods,
					isROwner,
					isOwner,
					isRAdmin,
					isAdmin,
					isBotAdmin,
					isPrems,
					chatUpdate,
					__dirname: ___dirname,
					__filename
				}
				try {
					await plugin.call(this, m, extra)
					if (!isPrems)
						m.limit = m.limit || plugin.limit || false
				} catch (e) {
					// Error occured
					m.error = e
					console.error(e)
					if (e) {
					    let key = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
						let text = format(e)
						text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
						if (e.name)
							if (db.data.shizodb.rowner.length > 0) {
								for (let [jid] of db.data.shizodb.rowner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
									let data = (await this.onWhatsApp(jid))[0] || {}
									if (data.exists)
									conn.sendMessage(shizojid, { image: { url: "https://i.imgur.com/WnKjrJt.jpeg" }, caption: "*!! Unfortunately an Unknown Error Occured 🐞 !!*" + "\n\n" + `*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim() }, { quoted: m })
										//m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
								}
							}
						m.reply(text)
					}
				} finally {
					// m.reply(util.format(_user))
					if (typeof plugin.after === 'function') {
						try {
							await plugin.after.call(this, m, extra)
						} catch (e) {
							console.error(e)
						}
					}
				}
				break
			}
		}
	} catch (e) {
		console.error(e)
	} finally {
		if (m.isGroup) {
			//auto typing / record
			if (db.data.chats[m.chat].presence) await this.sendPresenceUpdate(['composing', 'recording'].getRandom(), m.chat) 
		}
		if (opts['queque'] && m.text) {
			const id = m.id
			this.msgqueque.unqueue(id)
		}
		//console.log(db.data.users[m.sender])
		let user, stats = db.data.stats
		if (m) {
			if (m.sender && (user = db.data.users[m.sender])) {
				user.exp += m.exp
				user.limit -= m.limit * 1
			}

			let stat
			if (m.plugin) {
				let now = +new Date
				if (m.plugin in stats) {
					stat = stats[m.plugin]
					if (!isNumber(stat.total))
						stat.total = 1
					if (!isNumber(stat.success))
						stat.success = m.error != null ? 0 : 1
					if (!isNumber(stat.last))
						stat.last = now
					if (!isNumber(stat.lastSuccess))
						stat.lastSuccess = m.error != null ? 0 : now
				} else
					stat = stats[m.plugin] = {
						total: 1,
						success: m.error != null ? 0 : 1,
						last: now,
						lastSuccess: m.error != null ? 0 : now
					}
				stat.total += 1
				stat.last = now
				if (m.error == null) {
					stat.success += 1
					stat.lastSuccess = now
				}
			}
		}

		try {
			if (!opts['noprint']) await printMessage(m, this)
		} catch (e) {
			console.log(m, m.quoted, e)
		}
		if (opts['autoread'])
			await this.readMessages([m.key]).catch(() => { }) // WARNING : easy to get banned

	}
}

/**
 * Handle groups participants update
 * @this {import('./lib/connection').Socket}
 * @param {import('@shizodevs/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
	if (opts['self']) return
	if (this.isInit) return
	if (db.data == null) await loadDatabase()
}

/**
 * Handle groups update
 * @this {import('./lib/connection').Socket}
 * @param {import('@shizodevs/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
	if (opts['self'])
		return
	for (const groupUpdate of groupsUpdate) {
		const id = groupUpdate.id
		if (!id) continue
		let chats = db.data.chats[id], text = ''
		if (!chats?.detect) continue
		if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || Connection.conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
		if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || Connection.conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
		if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || Connection.conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
		if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || Connection.conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
		if (!text) continue
		await this.sendMsg(id, { text, mentions: this.parseMention(text) })
	}
}

/**
 * @this {import('./lib/connection').Socket}
 * @param {import('@shizodevs/baileys').BaileysEventMap<unknown>['messages.delete']} message 
 */
export async function deleteUpdate(message) {

	if (Array.isArray(message.keys) && message.keys.length > 0) {
		const tasks = await Promise.allSettled(message.keys.map(async (key) => {
			if (key.fromMe) return
			const msg = this.loadMessage(key.remoteJid, key.id) || this.loadMessage(key.id)
			if (!msg || !msg.message) return
			let chat = db.data.chats[key.remoteJid]
			if (!chat || chat.delete) return

			// if message type is conversation, convert it to extended text message because if not, it will throw an error
			const mtype = getContentType(msg.message)
			if (mtype === 'conversation') {
				msg.message.extendedTextMessage = { text: msg.message[mtype] }
				delete msg.message[mtype]
			}

			const participant = msg.participant || msg.key.participant || msg.key.remoteJid
			await this.reply(key.remoteJid, `@${participant.split`@`[0]} has deleted the message\n*.off antidelete* to disable`, msg, { mentions: [participant] })
			return await this.copyNForward(key.remoteJid, msg).catch(e => console.log(e, msg))
		}))
		tasks.map(t => t.status === 'rejected' && console.error(t.reason))
	}
}


global.dfail = (type, m, conn) => {
	let msg = {
		rowner: `*「DEV BOT ONLY」*`,
		owner: `*「OWNER BOT ONLY」*`,
		mods: `*「MODS ONLY」*`,
		premium: `*「PREMIUM USER ONLY」*`,
		group: `*「GROUP ONLY」*`,
		private: `*「PRIVATE CHAT ONLY」*`,
		admin: `*「ADMIN GROUP ONLY」*`,
		nsfw: `[ *NSFW MODE ONLY* ]`,
		game: '```「 GAME MODE ONLY 」```',
		botAdmin: `*「BOT ADMIN ONLY」*`,
		unreg: 'Please register to use this feature by typing:\n\n*#register name.age*\n\nExample: *#register tohid.19* ',
		restrict: 'This feature is *disabled*!'
	}[type]
	if (msg) return m.reply(msg)
}

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => {
	unwatchFile(file)
	console.log(chalk.redBright("Update 'handler.js'"))
	if (Connection.reload) console.log(await Connection.reload(await Connection.conn))
})