export async function before(message, { conn }) {
  const shizonfig = {
    autoReact: "🌕",
  };

  try {
    if (!message?.key.remoteJid?.endsWith('@broadcast')) return false;

    await conn.sendMessage(message.key.remoteJid, {
      react: { 
        key: message.key, 
        text: shizonfig.autoReact 
      }
    });

  } catch (error) {
    console.error("Processing error:", error.message);
    await conn.sendMessage(conn.user.id, { 
      text: `Error: ${error.message || "Unknown error"}` 
    });
  }

  return true;
}