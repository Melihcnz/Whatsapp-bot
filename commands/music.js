const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

async function downloadMusic(url) {
    try {
        const musicPath = path.join(__dirname, '..', 'downloads', 'music');
        
        // music klasörünü oluştur
        if (!fs.existsSync(musicPath)) {
            fs.mkdirSync(musicPath, { recursive: true });
        }

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const outputPath = path.join(musicPath, `${title}.mp3`);

        return new Promise((resolve, reject) => {
            ytdl(url, {
                filter: 'audioonly',
                quality: 'highestaudio'
            })
            .pipe(fs.createWriteStream(outputPath))
            .on('finish', () => {
                resolve({
                    title: title,
                    path: outputPath
                });
            })
            .on('error', (err) => {
                reject(err);
            });
        });
    } catch (error) {
        console.error('Müzik indirme hatası:', error);
        throw new Error(`Müzik indirilemedi: ${error.message}`);
    }
}

module.exports = { downloadMusic }; 