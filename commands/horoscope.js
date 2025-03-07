const axios = require('axios');

const burclar = {
    'koç': 'aries',
    'boğa': 'taurus',
    'ikizler': 'gemini',
    'yengeç': 'cancer',
    'aslan': 'leo',
    'başak': 'virgo',
    'terazi': 'libra',
    'akrep': 'scorpio',
    'yay': 'sagittarius',
    'oğlak': 'capricorn',
    'kova': 'aquarius',
    'balık': 'pisces'
};

const gunlukYorumlar = {
    'koç': [
        'Bugün enerjiniz yüksek olacak.',
        'Yeni başlangıçlar için uygun bir gün.',
        'Kariyer fırsatları kapınızı çalabilir.'
    ],
    'boğa': [
        'Finansal konularda şanslı bir gün.',
        'Sevdiklerinizle güzel vakit geçireceksiniz.',
        'Sabırlı olmanız gereken durumlar olabilir.'
    ]
    // Diğer burçlar için de benzer şekilde devam eder
};

async function getHoroscope(sign) {
    try {
        const burc = sign.toLowerCase();
        if (!burclar[burc]) {
            throw new Error('Geçerli bir burç giriniz');
        }
        
        // Rastgele bir yorum seç
        const yorumlar = gunlukYorumlar[burc] || ['Güzel bir gün sizi bekliyor.'];
        const yorum = yorumlar[Math.floor(Math.random() * yorumlar.length)];
        
        return {
            burc: burc.toUpperCase(),
            yorum: yorum,
            tarih: new Date().toLocaleDateString('tr-TR')
        };
    } catch (error) {
        throw new Error('Burç yorumu alınamadı: ' + error.message);
    }
}

module.exports = { getHoroscope }; 