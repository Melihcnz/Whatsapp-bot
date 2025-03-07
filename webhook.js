const express = require('express');
const app = express();
const twilio = require('twilio');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = twilio(
    'AC81fbe6c726bfd0c5752c187ef0857426',
    'db48618d7ce2aec51bf76f34598d1835'
);

app.get('/', (req, res) => {
    res.send('Webhook sunucusu çalışıyor!');
});

app.post('/webhook', async (req, res) => {
    console.log('------------------------');
    console.log('YENİ MESAJ GELDİ!');
    console.log('Tüm veri:', JSON.stringify(req.body, null, 2));
    console.log('Kimden:', req.body.From);
    console.log('Mesaj:', req.body.Body);
    console.log('------------------------');

    try {
        if (req.body.Body) {
            let cevap = '';
            
            if (req.body.Body.toLowerCase() === 'confirm') {
                cevap = 'Randevunuz onaylandı! 👍';
            } else if (req.body.Body.toLowerCase() === 'cancel') {
                cevap = 'Randevunuz iptal edildi! ❌';
            } else {
                cevap = 'Mesajınız alındı! Lütfen confirm veya cancel yazın.';
            }

            await client.messages.create({
                from: 'whatsapp:+14155238886',
                to: req.body.From,
                body: cevap
            });
        }

        res.status(200).send({
            success: true,
            message: 'Mesaj işlendi'
        });

    } catch (error) {
        console.error('HATA:', error);
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook sunucusu ${PORT} portunda çalışıyor`);
    console.log('Webhook URL: http://localhost:3000/webhook');
}); 