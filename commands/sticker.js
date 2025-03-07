const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createSticker(mediaPath) {
    try {
        // Sharp ile resmi işle
        let sharpImage = sharp(mediaPath);
        
        // Resim bilgilerini al
        const metadata = await sharpImage.metadata();
        
        // Resmi WebP formatına dönüştür
        const outputPath = path.join(__dirname, '..', 'temp', 'sticker.webp');
        
        // temp klasörünü oluştur
        const tempDir = path.join(__dirname, '..', 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        
        // Resmi işle ve kaydet
        await sharpImage
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .webp({ quality: 80 })
            .toFile(outputPath);
            
        return outputPath;
    } catch (error) {
        console.error('Sticker oluşturma hatası:', error);
        throw new Error('Sticker oluşturulamadı');
    }
}

module.exports = { createSticker }; 