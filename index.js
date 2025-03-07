require('dotenv').config();
const qrcode = require('qrcode-terminal');
const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const { getWeather } = require('./commands/weather');
const fs = require('fs');
const { translateText } = require('./commands/translate');
const { createSticker } = require('./commands/sticker');
const path = require('path');
const { handleGroupCommands } = require('./commands/group');
const { setReminder } = require('./commands/reminder');
const { searchWikipedia } = require('./commands/wiki');
const { handleSoundCommand, soundCommands } = require('./commands/sounds');
const { calculate } = require('./commands/calculator');
const { getDailyQuote } = require('./commands/quote');
const { getRandomJoke } = require('./commands/joke');
const { rollDice } = require('./commands/dice');
const { flipCoin } = require('./commands/coinflip');
const { startWordGame, makeGuess } = require('./commands/wordgame');
const { startNumberGame } = require('./commands/numbergame');
const { activeGames } = require('./commands/wordgame');
const { startMusicQuiz, makeMusicGuess, musicGames } = require('./commands/musicquiz');
const { getHoroscope } = require('./commands/horoscope');
const { getNews } = require('./commands/news');
const { getTwilioMessages } = require('./commands/twilio');


// MongoDB bağlantısı
connectDB();

// LocalAuth ile client oluştur
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "whatsapp-bot",
        dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        defaultViewport: null
    },
    restartOnAuthFail: true,
    takeoverOnConflict: true,
    takeoverTimeoutMs: 10000
});

// QR kod oluşturulduğunda
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR Kodu telefonunuzdan okutun!');
});

// Kimlik doğrulama durumu değiştiğinde
client.on('authenticated', (session) => {
    console.log('Oturum açıldı!');
});

// Kimlik doğrulama başarısız olduğunda
client.on('auth_failure', (msg) => {
    console.error('Kimlik doğrulama başarısız:', msg);
});

// Client hazır olduğunda
client.on('ready', () => {
    console.log('Client hazır!');
});

client.on('message', async (message) => {
    try {
        // Boş mesajları kontrol et
        if (!message.body) {
            return; // Boş mesajları kaydetme
        }

        // Her gelen mesajı veritabanına kaydet
        const chat = await message.getChat();
        const newMessage = new Message({
            sender: message.from,
            message: message.body || "Boş Mesaj",
            isGroup: chat.isGroup,
            groupName: chat.isGroup ? chat.name : null
        });
        await newMessage.save();

        // Mevcut komutlar
        if (message.body === '!ping') {
            await message.reply('pong');
        }

        if (message.body.toLowerCase() === 'merhaba') {
            await message.reply('Merhaba! Ben bir botum 🤖');
        }

        if (message.body.toLowerCase() === 'melih') {
            await message.reply('buyur canım 🤖');
        }

        // Medya dosyası gönderme örneği
        if (message.body === '!resim') {
            const media = MessageMedia.fromFilePath('./jpg/resim.jpg');
            await message.reply(media);
        }

        if (message.body === '!yiğit') {
            const media = MessageMedia.fromFilePath('./jpg/yiğit.jpg');
            await message.reply(media);
        }

        if (message.body === '!mallar') {
            const media = MessageMedia.fromFilePath('./.jpg/mallar.jpg');
            await message.reply(media);
        }

        if (message.body === '!agalar') {
            const media = MessageMedia.fromFilePath('./.jpg/agalar.jpg');
            await message.reply(media);
        }

        if (message.body === '!sad') {
            const media = MessageMedia.fromFilePath('./.jpg/agalar.jpg');
            await message.reply(media);
        }
        
        // Grup mesajı örneği
        if (message.body === '!grup') {
            const chat = await message.getChat();
            if (chat.isGroup) {
                await message.reply('Bu bir grup sohbeti!');
            }
        }

        // Son mesajları göster komutu
        if (message.body === '!sonmesajlar') {
            const messages = await Message.find()
                .sort({ timestamp: -1 })
                .limit(5);
            
            let response = '*Son 5 Mesaj:*\n\n';
            messages.forEach(msg => {
                response += `📱 Gönderen: ${msg.sender}\n`;
                response += `💬 Mesaj: ${msg.message}\n`;
                response += `⏰ Tarih: ${msg.timestamp.toLocaleString('tr-TR')}\n\n`;
            });
            
            await message.reply(response);
        }

        // Hava durumu komutu
        if (message.body.startsWith('!hava')) {
            try {
                const city = message.body.split(' ')[1];
                if (!city) {
                    await message.reply('Lütfen bir şehir adı girin. Örnek: !hava istanbul');
                    return;
                }
                const weatherInfo = await getWeather(city);
                await message.reply(weatherInfo);
            } catch (error) {
                await message.reply('Hava durumu bilgisi alınamadı. Lütfen geçerli bir şehir adı girin.');
            }
        }

        // Çeviri komutu
        if (message.body.startsWith('!çevir')) {
            try {
                const args = message.body.split(' ');
                const targetLang = args[1];
                const text = args.slice(2).join(' ');

                if (!targetLang || !text) {
                    await message.reply('Kullanım: !çevir [hedef_dil] [metin]\nÖrnek: !çevir en merhaba dünya');
                    return;
                }

                const result = await translateText(text, targetLang);
                const response = `🔄 Çeviri:\n\n` +
                                `📝 Orijinal (${result.from}): ${result.originalText}\n` +
                                `🌐 Çeviri (${result.to}): ${result.translatedText}`;
                
                await message.reply(response);
            } catch (error) {
                await message.reply('Çeviri yapılamadı: ' + error.message);
            }
        }

        // Sticker komutu
        if (message.body === '!sticker' && message.hasMedia) {
            try {
                const media = await message.downloadMedia();
                
                if (media) {
                    await message.reply('Sticker oluşturuluyor... ⏳');
                    
                    // Geçici dosyayı kaydet
                    const tempPath = path.join(__dirname, 'temp', 'temp_image');
                    fs.writeFileSync(tempPath, media.data, 'base64');
                    
                    // Sticker oluştur
                    const stickerPath = await createSticker(tempPath);
                    
                    // Sticker'ı gönder
                    const sticker = MessageMedia.fromFilePath(stickerPath);
                    await message.reply(sticker, null, { sendMediaAsSticker: true });
                    
                    // Geçici dosyaları temizle
                    fs.unlinkSync(tempPath);
                    fs.unlinkSync(stickerPath);
                }
            } catch (error) {
                console.error('Sticker hatası:', error);
                await message.reply('❌ Sticker oluşturulamadı');
            }
        }

        // Grup komutları
        if (message.body.startsWith('!grup-')) {
            try {
                const response = await handleGroupCommands(message, message.body, client);
                await message.reply(response);
            } catch (error) {
                await message.reply(error.message);
            }
        }

        // Hatırlatıcı komutu
        if (message.body.startsWith('!hatırlat')) {
            try {
                const args = message.body.split(' ');
                if (args.length < 3) {
                    await message.reply('Kullanım: !hatırlat [süre] [mesaj]\nÖrnek: !hatırlat 30m Toplantı var\nSüre birimleri: m (dakika), h (saat), d (gün)');
                    return;
                }

                const timeString = args[1];
                const reminderText = args.slice(2).join(' ');
                
                const response = await setReminder(message, timeString, reminderText);
                await message.reply(response);
            } catch (error) {
                await message.reply(error.message);
            }
        }


        // Wikipedia arama komutu
        if (message.body.startsWith('!wiki')) {
            try {
                const query = message.body.slice(6).trim();
                if (!query) {
                    await message.reply('Kullanım: !wiki [arama]\nÖrnek: !wiki Türkiye');
                    return;
                }

                await message.reply('🔍 Wikipedia\'da aranıyor...');
                const result = await searchWikipedia(query);
                
                const response = `*${result.title}*\n\n` +
                                `${result.summary}\n\n` +
                                `🔗 Devamı için: ${result.url}`;
                
                await message.reply(response);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Ses komutları
        if (message.body.startsWith('!')) {
            try {
                const command = message.body.toLowerCase();
                const media = await handleSoundCommand(message, command);
                
                if (media) {
                    await message.reply(media, undefined, { 
                        sendAudioAsVoice: false 
                    });
                }
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Hesap makinesi komutu
        if (message.body.startsWith('!hesap')) {
            try {
                const expression = message.body.slice(6).trim();
                if (!expression) {
                    await message.reply('Kullanım: !hesap [işlem]\nÖrnek: !hesap 2 + 2\nDesteklenen işlemler: +, -, *, /, (, )');
                    return;
                }

                const result = await calculate(expression);
                await message.reply(`🔢 *Hesaplama:*\n${result.expression} = ${result.result}`);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Bilgi komutu
        if (message.body === '!bilgi') {
            try {
                const commandList = `🤖 *Kullanılabilir Komutlar:*\n\n` +
                    `1️⃣ *Temel Komutlar:*\n` +
                    `!bilgi - Bu mesajı gösterir\n` +
                    `!ping - Bot durumunu kontrol eder\n` +
                    `!burc [burç] - Günlük burç yorumu\n\n` +
                    
                    `2️⃣ *Araçlar:*\n` +
                    `!hesap [işlem] - Hesap makinesi\n` +
                    `!haber [işlem] - haberler\n` +
                    `!çevir [dil] [metin] - Metin çevirisi\n` +
                    `!wiki [arama] - Wikipedia'da arama\n` +
                    `!hava [şehir] - Hava durumu\n` +
                    `!muzikbilmece - Şarkı sözünden şarkıcıyı tahmin et\n` +
                    `!hatırlat [süre] [mesaj] - Hatırlatıcı\n` +
                    `!söz - Günün sözünü gösterir\n` +
                    `!şaka - Rastgele şaka gösterir\n` +
                    `!zar [XdY] - X adet Y yüzlü zar atar (Örnek: !zar 2d6)\n` +
                    `!yazitura - Yazı tura atar\n` +
                    `!kelimeoyunu - Kelime tahmin oyunu başlatır\n` +
                    `!sayitahmin - Sayı tahmin oyunu başlatır\n` +
                    `! - Sohbet istatistiklerini gösterir\n\n` +

                    
                    `3️⃣ *Medya:*\n` +
                    `!sticker - Fotoğrafı sticker'a çevirir\n` +
                    `!omg - OMG sesi gönderir\n` +
                    `!hs - Rust hs sesi gönderir\n` +
                    `!hilti - Hilti sesi gönderir\n` +
                    `!balıkcı - Balıkcı sesi gönderir\n` +
                    `!apt - Apt sesi gönderir\n` +
                    `!muzikbilmece - Şarkı sözünden şarkıcıyı tahmin et\n` +
                    


                    `4️⃣ *Grup Komutları:*\n` +
                    `!grup-bilgi - Grup bilgilerini gösterir\n` +
                    `!grup-üyeler - Grup üyelerini listeler\n\n` +
                    
                    `5️⃣ *Diğer:*\n` +
                    `!`;

                await message.reply(commandList);
            } catch (error) {
                await message.reply('❌ Komut listesi gösterilemedi');
            }
        }

        // Günün Sözü komutu
        if (message.body === '!söz') {
            try {
                const quote = await getDailyQuote();
                const response = `📜 *Günün Sözü*\n\n` +
                                `💭 ${quote.quote}\n\n` +
                                `👤 *${quote.author}*`;
                
                await message.reply(response);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Şaka komutu
        if (message.body === '!şaka') {
            try {
                const joke = await getRandomJoke();
                const response = `😄 *Şaka Zamanı*\n\n` +
                                `❓ ${joke.question}\n\n` +
                                `💭 ${joke.answer}`;
                
                await message.reply(response);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Zar atma komutu
        if (message.body.startsWith('!zar')) {
            try {
                const args = message.body.split(' ');
                let sides = 6;  // Varsayılan 6 yüzlü zar
                let count = 1;  // Varsayılan 1 zar
                
                if (args[1]) {
                    const params = args[1].toLowerCase().split('d');
                    if (params.length === 2) {
                        count = parseInt(params[0]) || 1;
                        sides = parseInt(params[1]) || 6;
                    }
                }
                
                const result = rollDice(sides, count);
                
                let response = `🎲 *Zar Atma Sonucu*\n\n`;
                response += `🎯 ${count}d${sides} zarı atıldı:\n`;
                response += `📊 Sonuçlar: ${result.results.join(', ')}\n`;
                if (count > 1) {
                    response += `📈 Toplam: ${result.total}`;
                }
                
                await message.reply(response);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Yazı tura komutu
        if (message.body === '!yazitura') {
            try {
                const result = flipCoin();
                const response = `🎲 *Yazı Tura*\n\n` +
                                `${result.emoji} Sonuç: *${result.result}*`;
                
                await message.reply(response);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // İstatistik komutu
        if (message.body === '!istatistik') {
            try {
                const chat = await message.getChat();
                const messages = await Message.aggregate([
                    {
                        $group: {
                            _id: '$sender',
                            messageCount: { $sum: 1 }
                        }
                    }
                ]);

                let response = `📊 *Sohbet İstatistikleri*\n\n`;
                messages.forEach(stat => {
                    response += `👤 ${stat._id}\n`;
                    response += `💬 Mesaj sayısı: ${stat.messageCount}\n\n`;
                });

                await message.reply(response);
            } catch (error) {
                await message.reply('❌ İstatistikler alınamadı');
            }
        }

        // Kelime oyunu ve sayı tahmin için ayrı Map'ler oluşturalım
        const wordGames = new Map();
        const numberGames = new Map();

        // Kelime oyunu komutları
        if (message.body === '!kelimeoyunu') {
            const response = startWordGame(message.from);
            await message.reply(response);
        } else if (message.body.length === 1) {
            const response = makeGuess(message.from, message.body.toLowerCase(), wordGames);
            if (response) await message.reply(response);
        }

        // Sayı tahmin oyunu komutları
        if (message.body === '!sayitahmin') {
            const response = startNumberGame(message.from);
            await message.reply(response);
        } else if (/^\d+$/.test(message.body)) {
            const guess = parseInt(message.body);
            const response = makeGuess(message.from, guess, numberGames);
            if (response) await message.reply(response);
        }

        // Müzik bilmece komutları
        if (message.body === '!muzikbilmece') {
            const response = startMusicQuiz(message.from);
            await message.reply(response);
        } else if (musicGames.has(message.from)) {
            const response = makeMusicGuess(message.from, message.body);
            if (response) await message.reply(response);
        }

        // Burç yorumu komutu
        if (message.body.startsWith('!burc')) {
            try {
                const burc = message.body.split(' ')[1];
                if (!burc) {
                    await message.reply('Kullanım: !burc [burç adı]\nÖrnek: !burc koç');
                    return;
                }
                
                const horoscope = await getHoroscope(burc);
                const response = `🌟 *${horoscope.burc} Burcu*\n\n` +
                                `📅 Tarih: ${horoscope.tarih}\n\n` +
                                `🔮 Günlük Yorum:\n${horoscope.yorum}`;
                
                await message.reply(response);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Haber komutu
        if (message.body === '!haber') {
            try {
                const news = await getNews();
                await message.reply(news);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

        // Twilio komutu
        if (message.body === '!twilio') {
            try {
                const twilioMessages = await getTwilioMessages();
                await message.reply(twilioMessages);
            } catch (error) {
                await message.reply('❌ ' + error.message);
            }
        }

    } catch (error) {
        console.error('Hata:', error);
        await message.reply('Bir hata oluştu!');
    }
});

// Client'ı başlat
client.initialize();

// Hata yakalama
process.on('unhandledRejection', (error) => {
    console.error('Beklenmeyen Hata:', error);
}); 