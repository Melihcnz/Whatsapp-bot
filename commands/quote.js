const axios = require('axios');

async function getDailyQuote() {
    try {
        const response = await axios.get('https://sozluk.gov.tr/atasozu');
        const quotes = response.data;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        return {
            quote: randomQuote.sozum,
            author: "Türk Atasözü"
        };
    } catch (error) {
        // API çalışmazsa yedek sözler
        const backupQuotes = [
            { quote: "Damlaya damlaya göl olur.", author: "Türk Atasözü" },
            { quote: "İşleyen demir pas tutmaz.", author: "Türk Atasözü" },
            { quote: "Birlikten kuvvet doğar.", author: "Türk Atasözü" },
            { quote: "Ak akçe kara gün içindir.", author: "Türk Atasözü" }
        ];
        
        const randomQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
        return randomQuote;
    }
}

module.exports = { getDailyQuote }; 