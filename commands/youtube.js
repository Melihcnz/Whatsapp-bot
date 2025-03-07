const ytdl = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');

async function downloadYouTube(url) {
    try {
        const videoPath = path.join(__dirname, '..', 'downloads');
        
        // downloads klasörünü oluştur
        if (!fs.existsSync(videoPath)) {
            fs.mkdirSync(videoPath);
        }

        const output = path.join(videoPath, '%(title)s.%(ext)s');

        const options = {
            output: output,
            format: 'mp4',
            maxFilesize: '50M', // WhatsApp için boyut sınırı
            noPlaylist: true,
        };

        console.log('Video indiriliyor...');
        const result = await ytdl(url, options);
        console.log('İndirme tamamlandı');

        // İndirilen dosyanın yolunu bul
        const files = fs.readdirSync(videoPath);
        const videoFile = files.find(file => file.endsWith('.mp4'));
        
        if (!videoFile) {
            throw new Error('Video dosyası bulunamadı');
        }

        const finalPath = path.join(videoPath, videoFile);
        const title = videoFile.replace('.mp4', '');

        return {
            title: title,
            path: finalPath
        };
    } catch (error) {
        console.error('YouTube hatası:', error);
        throw new Error(`Video indirilemedi: ${error.message}`);
    }
}

module.exports = { downloadYouTube }; 