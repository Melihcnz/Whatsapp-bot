function flipCoin() {
    try {
        const result = Math.random() < 0.5 ? 'YAZI' : 'TURA';
        const emoji = result === 'YAZI' ? '🗣️' : '🦅';
        
        return {
            result: result,
            emoji: emoji
        };
    } catch (error) {
        throw new Error('Para atılamadı');
    }
}

module.exports = { flipCoin }; 