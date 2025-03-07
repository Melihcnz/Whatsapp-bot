const words = [
    'araba', 'kitap', 'kalem', 'telefon', 'bilgisayar',
    'masa', 'sandalye', 'pencere', 'kapı', 'televizyon',
    'çanta', 'saat', 'gözlük', 'anahtar', 'bardak'
];

function startWordGame(userId) {
    const word = words[Math.floor(Math.random() * words.length)];
    const hiddenWord = '❓'.repeat(word.length);
    
    wordGames.set(userId, {
        word: word,
        hiddenWord: hiddenWord,
        guesses: [],
        remainingTries: 6
    });
    
    return `🎮 *Kelime Oyunu Başladı!*\n\n` +
           `📝 Kelime: ${hiddenWord}\n` +
           `❌ Kalan Hak: ${6}\n` +
           `💭 Tahmin etmek için bir harf söyleyin`;
}

function makeGuess(userId, letter, games) {
    const game = games.get(userId);
    if (!game) return null;
    
    if (game.guesses.includes(letter)) {
        return `❌ "${letter}" harfini zaten tahmin ettiniz!`;
    }
    
    game.guesses.push(letter);
    
    if (!game.word.includes(letter)) {
        game.remainingTries--;
    }
    
    let newHiddenWord = '';
    for (let char of game.word) {
        if (game.guesses.includes(char)) {
            newHiddenWord += char;
        } else {
            newHiddenWord += '❓';
        }
    }
    
    game.hiddenWord = newHiddenWord;
    
    if (newHiddenWord === game.word) {
        games.delete(userId);
        return `🎉 *Tebrikler! Kelimeyi buldunuz!*\n\n` +
               `✨ Kelime: ${game.word}`;
    }
    
    if (game.remainingTries <= 0) {
        games.delete(userId);
        return `😢 *Oyun Bitti!*\n\n` +
               `❌ Doğru kelime: ${game.word}`;
    }
    
    return `🎮 *Kelime Oyunu*\n\n` +
           `📝 Kelime: ${newHiddenWord}\n` +
           `❌ Kalan Hak: ${game.remainingTries}\n` +
           `🔍 Tahmin edilen harfler: ${game.guesses.join(', ')}`;
}

module.exports = { startWordGame, makeGuess };