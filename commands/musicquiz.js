const musicGames = new Map();

const songs = [
    { lyrics: "Ah bu şarkıların gözü kör olsun...", answer: "tarkan" },
    { lyrics: "Araba lastiği gibi oldum yuvarlanıyorum...", answer: "müslüm gürses" },
    { lyrics: "Ben de özledim, ben de özledim...", answer: "sezen aksu" },
    { lyrics: "Firuze gözlüm benim...", answer: "barış manço" },
    { lyrics: "Gül döktüm yollarına...", answer: "ibrahim tatlıses" },
    { lyrics: "Aramızda uçurumlar...", answer: "ajda pekkan" }
];

function startMusicQuiz(userId) {
    const song = songs[Math.floor(Math.random() * songs.length)];
    
    musicGames.set(userId, {
        answer: song.answer,
        attempts: 0,
        maxAttempts: 3,
        lyrics: song.lyrics
    });
    
    return `🎵 *Müzik Bilmece*\n\n` +
           `Bu sözler hangi şarkıcıya ait?\n\n` +
           `"${song.lyrics}"\n\n` +
           `❓ Tahmininizi yazın (${3} hakkınız var)`;
}

function makeMusicGuess(userId, guess) {
    const game = musicGames.get(userId);
    if (!game) return null;
    
    game.attempts++;
    
    if (guess.toLowerCase() === game.answer) {
        musicGames.delete(userId);
        return `🎉 *Tebrikler!*\n\n` +
               `✨ Doğru cevap: ${game.answer.toUpperCase()}\n` +
               `🎵 Şarkı sözü: "${game.lyrics}"`;
    }
    
    if (game.attempts >= game.maxAttempts) {
        musicGames.delete(userId);
        return `😢 *Oyun Bitti!*\n\n` +
               `❌ Doğru cevap: ${game.answer.toUpperCase()}\n` +
               `🎵 Şarkı sözü: "${game.lyrics}"`;
    }
    
    return `🎵 *Müzik Bilmece*\n\n` +
           `❌ Yanlış cevap!\n` +
           `🎯 Kalan hak: ${game.maxAttempts - game.attempts}`;
}

module.exports = { startMusicQuiz, makeMusicGuess, musicGames }; 