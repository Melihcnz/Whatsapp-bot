const handleGroupCommands = async (message, command, client) => {
    try {
        const chat = await message.getChat();
        
        // Debug için
        console.log('Chat bilgileri:', {
            isGroup: chat.isGroup,
            name: chat.name,
            id: chat.id
        });
        
        // Grup kontrolü
        if (!chat.isGroup) {
            throw new Error('Bu komut sadece gruplarda kullanılabilir!');
        }

        if (command === '!grup-bilgi') {
            const participants = chat.participants || [];
            return `*Grup Bilgileri*\n\n` +
                   `📝 İsim: ${chat.name}\n` +
                   `👥 Üye Sayısı: ${participants.length}\n` +
                   `📅 Oluşturulma: ${chat.createdAt?.toLocaleString('tr-TR') || 'Bilinmiyor'}`;
        }
        
        if (command === '!grup-üyeler') {
            const participants = chat.participants || [];
            if (participants.length === 0) {
                throw new Error('Üye listesi alınamadı');
            }

            let memberList = '*Grup Üyeleri:*\n\n';
            for (const participant of participants) {
                memberList += `👤 ${participant.id.user}\n`;
            }
            return memberList;
        }

        return 'Geçerli komutlar: !grup-bilgi, !grup-üyeler';
    } catch (error) {
        console.error('Grup komutu hatası:', error);
        throw new Error(`Grup komutu hatası: ${error.message}`);
    }
};

module.exports = { handleGroupCommands }; 