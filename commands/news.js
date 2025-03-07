const axios = require('axios');

async function getNews() {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'tr',
                apiKey: process.env.NEWS_API_KEY
            }
        });
        
        const news = response.data.articles.slice(0, 5);
        let newsText = '📰 *Günün Haberleri*\n\n';
        
        news.forEach((item, index) => {
            newsText += `${index + 1}. ${item.title}\n`;
            newsText += `ℹ️ ${item.description || 'Açıklama yok'}\n\n`;
        });
        
        return newsText;
    } catch (error) {
        console.error('Haber hatası:', error);
        throw new Error('Haberler alınamadı');
    }
}

module.exports = { getNews }; 