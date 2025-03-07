const { translate } = require('@vitalets/google-translate-api');

async function translateText(text, targetLang) {
    try {
        const result = await translate(text, { to: targetLang });
        
        // Hata ayıklama için
        console.log('Çeviri sonucu:', result);
        
        return {
            originalText: text,
            translatedText: result.text,
            from: result.raw?.from?.language?.iso || 'auto', // Null check ekledik
            to: targetLang
        };
    } catch (error) {
        console.error('Çeviri hatası:', error);
        throw new Error('Çeviri yapılamadı');
    }
}

module.exports = { translateText }; 