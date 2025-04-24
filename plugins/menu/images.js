import { promises } from 'fs'
import fs from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'
import {
  plugins
} from '../../lib/plugins.js'

let tags = {
'anime': 'Anime 🎍',
'pies': 'Pies 🥵'
}

const defaultMenu = {
  before: `┏━━━ ❮❮ 𝑖𝑚𝑎𝑔𝑒 𝑚𝑒𝑛𝑢 ❯❯
┃⫹⫺ *𝙽𝚊𝚖𝚎:* ${global.botname}
┃⫹⫺ *𝚃𝚘𝚝𝚊𝚕:* Images
┃⫹⫺ *𝚅𝚎𝚛𝚜𝚒𝚘𝚗:* V1.4.3
┃⫹⫺ *𝙿𝚛𝚎𝚏𝚒𝚡:* Multi Prefix 
┃⫹⫺ *𝙾𝚠𝚗𝚎𝚛:* ${global.author}
┃⫹⫺ *𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖:* 𝙻𝚒𝚗𝚞𝚡 
┖─────────┈┈┈〠⸙࿉༐
  %readmore`.trimStart(),
  header: '┏━━━━ ❨ *%category* ❩ ━━┄┈ •⟅ ',
  body: ' ┃✦ %cmd',
  footer: '┗━═┅┅┅┅═━–––––––๑\n',
  after: `*Made by ♡ ${global.oname}*`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
  let name = await conn.getName(m.sender)
  let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)

    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
  let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    
let replace = {
      '%': '%',
      p: _p,
      readmore: readMore
   }
   text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
 
   let shizobabe = text.replace()
   let usedPrefix = _p
  const flowActions = [
    {
      buttonId: "singleSelect",
      buttonText: { displayText: "Single Select" },
      type: 4, // Indicates a flow action
      nativeFlowInfo: {
        name: "single_select",
        paramsJson: JSON.stringify({
          title: "Select an Option",
                   sections: [
  {
    title: "🎍 Anime Images",
    rows: [
      {
        title: "Annie",
        description: "",
        id: usedPrefix + "annie"
      },
      {
        title: "Husbu",
        description: "",
        id: usedPrefix + "husbu"
      },
      {
        title: "Loli",
        description: "",
        id: usedPrefix + "loli"
      },
      {
        title: "Mikasa",
        description: "",
        id: usedPrefix + "mikasa"
      },
      {
        title: "Nami",
        description: "",
        id: usedPrefix + "nami"
      },
      {
        title: "Neko",
        description: "",
        id: usedPrefix + "neko"
      },
      {
        title: "Sakura",
        description: "",
        id: usedPrefix + "sakura"
      },
      {
        title: "Sasha",
        description: "",
        id: usedPrefix + "sasha"
      },
      {
        title: "Shota",
        description: "",
        id: usedPrefix + "shota"
      },
      {
        title: "Vivi",
        description: "",
        id: usedPrefix + "vivi"
      },
      {
        title: "Waifu",
        description: "",
        id: usedPrefix + "waifu"
      },
    ]
  },
  {
    title: "🥵 Hot Pies Images",
    rows: [
      {
        title: "India",
        description: "",
        id: usedPrefix + "india"
      },
      {
        title: "Indonesia",
        description: "",
        id: usedPrefix + "indonesia"
      },
      {
        title: "China",
        description: "",
        id: usedPrefix + "china"
      },
      {
        title: "Japan",
        description: "",
        id: usedPrefix + "japan"
      },
      {
        title: "Korea",
        description: "",
        id: usedPrefix + "korea"
      },
      {
        title: "Malaysia",
        description: "",
        id: usedPrefix + "malaysia"
      },
      {
        title: "Vietnam",
        description: "",
        id: usedPrefix + "vietnam"
      },
      {
        title: "Thailand",
        description: "",
        id: usedPrefix + "thailand"
      }
    ]
  }
]
        })
      }
    }
  ];
  let url = "https://imgur.com/WnKjrJt"
 menuDualButtons(conn, m, url, shizobabe, global.copyright, "🌹 Script", `${usedPrefix}script`, "Owner 🌕", `${usedPrefix}owner`, flowActions)
  
} catch (e) {
    conn.sendMessage(m.chat, { image: { url: "https://imgur.com/WnKjrJt" }, caption: "*!! Unfortunately an Unknown Error Occured 🐞 !!*" }, { quoted: m })
    conn.sendMessage(shizojid, { image: { url: "https://imgur.com/WnKjrJt" }, caption: "*!! Unfortunately an Unknown Error Occured 🐞 !!*" + "\n\n" + e }, { quoted: m })
  }
}
handler.help = ['mimage']
handler.tags = ['menu']
handler.command = /^(mimage|mimages)$/i
//handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
