# WhatsApp Bot 🤖

Bu WhatsApp botu, çeşitli komutlar ve özellikler sunan çok fonksiyonlu bir mesajlaşma botudur.

[English version below 👇](#english)

## 🚀 Özellikler

- 💬 Temel mesajlaşma ve grup yönetimi
- 🌤️ Hava durumu sorgulama
- 🌍 Metin çeviri hizmeti
- 🎯 Sticker oluşturma
- ⏰ Hatırlatıcı sistemi
- 🎲 Eğlence komutları (Zar atma, yazı tura)
- 🎮 Oyunlar (Kelime oyunu, müzik bilgi yarışması)
- 📰 Haber servisi
- ⭐ Burç yorumları
- 🎵 Ses komutları
- 🧮 Hesap makinesi
- 💭 Günlük alıntılar ve şakalar
- 📱 Twilio entegrasyonu

## 🛠️ Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/[Melih-cnz]/whatsapp-bot.git
cd whatsapp-bot
```

2. Gerekli paketleri yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli değişkenleri ekleyin:
```env
OPENWEATHER_API_KEY=your_api_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
MONGODB_URI=your_mongodb_uri
```

4. Botu başlatın:
```bash
npm start
```

## 📝 Komutlar

| Komut | Açıklama |
|-------|-----------|
| !ping | Bot durumunu kontrol eder |
| !hava [şehir] | Belirtilen şehrin hava durumunu gösterir |
| !çevir [dil] [metin] | Metni belirtilen dile çevirir |
| !sticker | Gönderilen medyayı sticker'a dönüştürür |
| !hatırlat [süre] [mesaj] | Belirtilen süre sonra hatırlatma yapar |
| !sonmesajlar | Son 5 mesajı gösterir |
| !grup-[komut] | Grup yönetimi komutları |

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

<a name="english"></a>
# WhatsApp Bot 🤖

This WhatsApp bot is a multi-functional messaging bot that offers various commands and features.

## 🚀 Features

- 💬 Basic messaging and group management
- 🌤️ Weather information queries
- 🌍 Text translation service
- 🎯 Sticker creation
- ⏰ Reminder system
- 🎲 Fun commands (Dice rolling, coin flip)
- 🎮 Games (Word game, music quiz)
- 📰 News service
- ⭐ Horoscope readings
- 🎵 Sound commands
- 🧮 Calculator
- 💭 Daily quotes and jokes
- 📱 Twilio integration

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/[username]/whatsapp-bot.git
cd whatsapp-bot
```

2. Install required packages:
```bash
npm install
```

3. Create `.env` file and add required variables:
```env
OPENWEATHER_API_KEY=your_api_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
MONGODB_URI=your_mongodb_uri
```

4. Start the bot:
```bash
npm start
```

## 📝 Commands

| Command | Description |
|---------|-------------|
| !ping | Check bot status |
| !weather [city] | Shows weather for specified city |
| !translate [lang] [text] | Translates text to specified language |
| !sticker | Converts sent media to sticker |
| !remind [time] [message] | Sets a reminder for specified time |
| !lastmessages | Shows last 5 messages |
| !group-[command] | Group management commands |

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/newFeature`)
3. Commit your changes (`git commit -am 'Added new feature'`)
4. Push to the branch (`git push origin feature/newFeature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 