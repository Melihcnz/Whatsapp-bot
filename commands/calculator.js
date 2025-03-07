const math = require('mathjs');

async function calculate(expression) {
    try {
        // Güvenlik için sadece sayılar ve temel operatörlere izin ver
        if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
            throw new Error('Geçersiz karakterler içeriyor');
        }

        const result = math.evaluate(expression);
        
        // Sonucu düzenle (çok uzun ondalık sayıları kısalt)
        const formattedResult = Number.isInteger(result) ? 
            result : 
            Number(result.toFixed(4));

        return {
            expression: expression,
            result: formattedResult
        };
    } catch (error) {
        console.error('Hesaplama hatası:', error);
        throw new Error('Hesaplama yapılamadı');
    }
}

module.exports = { calculate }; 