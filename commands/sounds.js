const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');

const soundCommands = {
    '!omg': 'omg.mp3',
    '!hilti': 'hilti.mp3',
    '!hs': 'hs.mp3',
    '!balıkcı': 'balıkcı.mp3',
    '!apt': 'apt.mp3',



    // Diğer ses komutlarını buraya ekleyebilirsiniz
    // '!komut': 'ses_dosyasi.mp3'


};

async function handleSoundCommand(message, command) {
    try {
        const soundFile = soundCommands[command];
        if (!soundFile) {
            return null;
        }

        const soundPath = path.join(__dirname, '..', 'sounds', soundFile);
        const media = MessageMedia.fromFilePath(soundPath);
        
        return media;
    } catch (error) {
        console.error('Ses gönderme hatası:', error);
        throw new Error('Ses gönderilemedi');
    }
}

module.exports = { handleSoundCommand, soundCommands }; 