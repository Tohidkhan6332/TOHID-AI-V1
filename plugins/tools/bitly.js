import { bitly } from '@shizodevs/wabotmodule';

let handler = async (m, { conn, args }) => {
  try {
    const longURL = args[0];
    if (!longURL) {
      return conn.reply(m.chat, 'Please provide a long URL.', m);
    }

    // Call the bitly function and get the response
    const response = await bitly(longURL);

    // Ensure the response contains the shortURL and qrCode
    const { shortURL, qrCode } = response;
    if (!shortURL || !qrCode) {
      throw new Error('Invalid response from bitly.');
    }

    await conn.sendFile(m.chat, qrCode, 'qrcode.png', `Successfully Shortened Your Link ✅
🏴‍☠️ *Original Link:* ${longURL}
🧟‍♂️ *Shortened Link:* ${shortURL}
📢 *Powered by:* Bit.ly
👨‍🎓 *Developer:* ${author}`, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Failed to create short URL and QR code.\n' + error.message, m);
  }
};

handler.help = ['shortlink <longLink>', 'bitly <longlink>'];
handler.tags = ['tools'];
handler.command = /^(shortlink|bitly)$/i;

export default handler;