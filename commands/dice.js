function rollDice(sides = 6, count = 1) {
    try {
        if (count > 10) throw new Error('En fazla 10 zar atabilirsiniz');
        if (sides < 2) throw new Error('Zar en az 2 yüzlü olmalıdır');
        
        const results = [];
        let total = 0;
        
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            results.push(roll);
            total += roll;
        }
        
        return {
            results: results,
            total: total,
            sides: sides,
            count: count
        };
    } catch (error) {
        throw new Error('Zar atılamadı: ' + error.message);
    }
}

module.exports = { rollDice }; 