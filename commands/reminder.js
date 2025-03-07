const schedule = require('node-schedule');

const activeReminders = new Map();

async function setReminder(message, timeString, reminderText) {
    try {
        // Zamanı parse et (örnek: 5m, 1h, 2d)
        const unit = timeString.slice(-1);
        const value = parseInt(timeString.slice(0, -1));
        
        if (isNaN(value)) {
            throw new Error('Geçersiz zaman formatı');
        }

        const date = new Date();
        switch(unit) {
            case 'm': // dakika
                date.setMinutes(date.getMinutes() + value);
                break;
            case 'h': // saat
                date.setHours(date.getHours() + value);
                break;
            case 'd': // gün
                date.setDate(date.getDate() + value);
                break;
            default:
                throw new Error('Geçersiz zaman birimi (m/h/d kullanın)');
        }

        const job = schedule.scheduleJob(date, async () => {
            try {
                await message.reply(`⏰ *Hatırlatıcı*\n\n${reminderText}`);
                activeReminders.delete(message.from);
            } catch (error) {
                console.error('Hatırlatıcı gönderme hatası:', error);
            }
        });

        activeReminders.set(message.from, job);

        return `✅ Hatırlatıcı ayarlandı!\n\n⏰ Zaman: ${date.toLocaleString('tr-TR')}\n📝 Mesaj: ${reminderText}`;
    } catch (error) {
        throw new Error(`Hatırlatıcı ayarlanamadı: ${error.message}`);
    }
}

module.exports = { setReminder }; 