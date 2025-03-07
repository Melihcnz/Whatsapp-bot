const axios = require('axios');

async function searchWikipedia(query) {
    try {
        // Wikipedia API'sine istek at
        const response = await axios.get('https://tr.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                prop: 'extracts',
                exintro: true,
                explaintext: true,
                titles: query,
            }
        });

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];

        if (pageId === '-1') {
            throw new Error('Arama sonucu bulunamadı');
        }

        // Özeti kısalt (max 1000 karakter)
        let summary = page.extract;
        if (summary.length > 1000) {
            summary = summary.substring(0, 997) + '...';
        }

        return {
            title: page.title,
            summary: summary,
            url: `https://tr.wikipedia.org/wiki/${encodeURIComponent(page.title)}`
        };
    } catch (error) {
        console.error('Wikipedia hatası:', error);
        throw new Error('Wikipedia araması başarısız oldu');
    }
}

module.exports = { searchWikipedia }; 