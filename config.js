import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone' 
import fs from 'fs' 
import db from './lib/database.js'

//OwnerShip
global.owner = [
  [process.env.OWNER_NUMBER || '917849917350', process.env.OWNER_NAME || 'Mr Tohid 🫠', true],
  ['917849917350', 'Tohid Tech ❤️✨', true]
]
global.mods = []
global.prems = []

global.db = db
global.copyright = process.env.COPYRIGHT || "©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙾𝙷𝙸𝙳-𝙰𝙸-𝚅𝟷"
global.author = process.env.OWNER_NAME || 'TOHID KHAN'
global.botname = process.env.BOT_NAME || 'TOHID-AI-V1'
global.SESSION_ID = process.env.SESSION_ID || '' ;  // put your session id here
global.oname = author
global.bname = botname

//Extra Shortcuts
global.smlink = process.env.SOCIAL_MEDIA_LINK || 'https://instagram.com/Tohidkhan6332'
global.gclink = process.env.GROUP_LINK || 'https://chat.whatsapp.com/IqRWSp7pXx8DIMtSgDICGu'
 
//Apikeys
global.shizokeys = 'shizo'

//Sticker Watermarks
global.packname = process.env.BOT_NAME || 'TOHID-AI-V1 🌕'
global.stkpack = process.env.BOT_NAME || 'TOHID-AI-V1 🌕'
global.stkowner = process.env.OWNER_NAME || 'TOHID KHAN'

//Watermark
global.maker = process.env.MAKER || '©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙾𝙷𝙸𝙳-𝙰𝙸-𝚅𝟷'

//global emojis
global.wait = '*⌛ _Charging..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

//management
global.bug = '*!! Sorry 💢 !!*\nSomething went wrong 🌋'
global.stop = '*!! 🎭 Unfortunately 💔 !!*\nBot system is not Responding 🙃'

//TimeLines
global.botdate = `*⫹⫺ Date:*  ${moment.tz('Asia/Kolkata').format('DD/MM/YY')}`
global.bottime = `*⫹⫺ Time:* ${moment.tz('Asia/Kolkata').format('HH:mm:ss')}`

//Hosting Management
global.serverHost = 1
global.getQrWeb = 0
global.renderHost = 0
global.replitHost = 0

//global.pairingNumber = "" //put your bot number here

global.mods = ['917849917350','917849917350']
global.prems = ['917849917350','917849917350']
global.allowed = ['917849917350','917849917350']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = [
  '29d4b59a4aa687ca',
  '5LTV57azwaid7dXfz5fzJu',
  'cb15ed422c71a2fb',
  '5bd33b276d41d6b4',
  'HIRO',
  'kurrxd09',
  'ebb6251cc00f9c63',
]
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']



let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
