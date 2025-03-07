const activeGames = new Map();

function startNumberGame(userId) {
    const number = Math.floor(Math.random() * 100) + 1;
    activeGames.set(userId, {
        number: number,
        attempts: 0,
        maxAttempts: 10
    });
    
    return `🎮 *Sayı Tahmin Oyunu*\n\n` +
           `1 ile 100 arasında bir sayı tuttum.\n` +
           `❓ Tahmin etmek için bir sayı yazın\n` +
           `📊 ${10} hakkınız var`;
}

function makeGuess(userId, guess) {
    const game = activeGames.get(userId);
    if (!game) return null;
    
    game.attempts++;
    
    if (guess === game.number) {
        activeGames.delete(userId);
        return `🎉 *Tebrikler!*\n\n` +
               `✨ Sayıyı ${game.attempts} denemede buldunuz!\n` +
               `🎯 Doğru sayı: ${game.number}`;
    }
    
    if (game.attempts >= game.maxAttempts) {
        activeGames.delete(userId);
        return `😢 *Oyun Bitti!*\n\n` +
               `❌ Doğru sayı: ${game.number}`;
    }
    
    const hint = guess < game.number ? 'Daha büyük' : 'Daha küçük';
    return `🎮 *Sayı Tahmin*\n\n` +
           `${hint} bir sayı deneyin!\n` +
           `❌ Kalan hak: ${game.maxAttempts - game.attempts}`;
}

module.exports = { startNumberGame, makeGuess }; 