const axios = require('axios');

const jokes = [
    {
        question: "Karınca neden minibüse binmez?",
        answer: "Çünkü karınca-dolmuş 😄"
    },
    {
        question: "Doktorlar neden bahçeye giremez?",
        answer: "Çünkü bahçede çalı-şması yasak 😄"
    },
    {
        question: "Elektrikler neden kesildi?",
        answer: "Çünkü akım-adam olamamış 😄"
    },
    {
        question: "Baykuş ne zaman kuş oldu?",
        answer: "Bay-kuş evlenince 😄"
    }
    // Daha fazla şaka eklenebilir
];

async function getRandomJoke() {
    try {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        return jokes[randomIndex];
    } catch (error) {
        console.error('Şaka hatası:', error);
        throw new Error('Şaka getirilemedi');
    }
}

module.exports = { getRandomJoke }; 