const axios = require('axios');

async function getWeather(city) {
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=tr`);
        
        if (!response.data) {
            throw new Error('API yanıt vermedi');
        }

        const weather = response.data;
        console.log('API Yanıtı:', weather); // Hata ayıklama için

        return `🌍 ${city.toUpperCase()} Hava Durumu:\n\n` +
               `🌡️ Sıcaklık: ${weather.main.temp}°C\n` +
               `🌤️ Durum: ${weather.weather[0].description}\n` +
               `💧 Nem: ${weather.main.humidity}%\n` +
               `💨 Rüzgar: ${weather.wind.speed} km/s`;
    } catch (error) {
        console.error('Hava Durumu Hatası:', error.response?.data || error.message);
        if (error.response?.data?.message === 'city not found') {
            throw new Error('Şehir bulunamadı');
        }
        throw new Error('Hava durumu bilgisi alınamadı: ' + (error.response?.data?.message || error.message));
    }
}

module.exports = { getWeather }; 