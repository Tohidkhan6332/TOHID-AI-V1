import translate from '@vitalets/google-translate-api';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        // Check for quoted message or text input
        const q = m.quoted ? m.quoted : m;
        const text = q.text
        
        if (!text) throw `Usage: ${usedPrefix}translate [text]\nOr reply to a message with ${usedPrefix}translate`;
        
        // Translate the text
        const result = await translate(text, {
            to: 'en',
            autoCorrect: true
        });
        
        // Format the response
        const response = `🔠 *Translation Result*\n
📝 *Original Text (${result.from.language.iso}):*
${text}

🌐 *Translated Text (English):*
${result.text}
${result.from.text.autoCorrected ? `\n✅ Auto-corrected: ${result.from.text.value}` : ''}`;

        await conn.reply(m.chat, response, m);
        
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❌ Error translating text: ${error.message}`, m);
    }
};

handler.help = ['translate [text]'];
handler.tags = ['tools'];
handler.command = /^(translate|tr)$/i;
export default handler;