// Chat AI functionality dengan fallback system yang lengkap - FIXED
class ChatAI {
    constructor() {
        this.apiKey = ''; // Dikosongkan - gunakan fallback system
        this.conversationHistory = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadConversation();
    }

    bindEvents() {
        const sendBtn = document.getElementById('send-btn');
        const userInput = document.getElementById('user-input');
        const suggestionBtns = document.querySelectorAll('.suggestion-btn');
        const clearBtn = document.querySelector('.clear-chat-btn');

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize input
            userInput.addEventListener('input', () => {
                userInput.style.height = 'auto';
                userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
            });
        }

        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                if (userInput) {
                    userInput.value = question;
                    this.sendMessage();
                }
            });
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearConversation());
        }
    }

    async sendMessage() {
        const userInput = document.getElementById('user-input');
        const message = userInput?.value.trim();
        
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        if (userInput) {
            userInput.value = '';
            userInput.style.height = 'auto';
        }

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Add to conversation history
            this.conversationHistory.push({
                role: 'user',
                content: message,
                timestamp: new Date().toISOString()
            });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

            // Get AI response
            const response = await this.getAIResponse();
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add AI response to chat
            this.addMessage(response, 'ai');
            
            // Save conversation
            this.saveConversation();
            
        } catch (error) {
            console.error('Error:', error);
            this.removeTypingIndicator();
            
            // Berikan fallback response bahkan jika ada error
            const fallbackResponse = this.getFallbackResponse();
            this.addMessage(fallbackResponse, 'ai');
        }
    }

    async getAIResponse() {
        // SELALU gunakan fallback system karena apiKey dikosongkan
        return this.getFallbackResponse();
    }

    getFallbackResponse() {
        const lastUserMessage = this.conversationHistory[this.conversationHistory.length - 1]?.content.toLowerCase() || '';
        
        // Respons fallback yang lengkap dan informatif - FIXED TYPO
        const responses = {
            'cyberbullying': `🚨 **TENTANG CYBERBULLYING**

Cyberbullying adalah perilaku berulang yang ditujukan untuk menakuti, membuat marah, atau mempermalukan seseorang melalui media digital.

**📋 YANG HARUS DILAKUKAN:**

✅ **Simpan Bukti**
- Screenshot pesan, komentar, atau konten yang menyinggung
- Catat tanggal dan waktu kejadian
- Simpan username pelaku

✅ **Tindakan Langsung**
- Blokir pelaku di semua platform
- Gunakan fitur "Laporkan" di media sosial
- Jangan membalas atau menanggapi

✅ **Cari Bantuan**
- Bicara dengan orang tua, guru, atau orang dewasa terpercaya
- Hubungi TePSA: 1500 771
- Konsultasi dengan guru BK/konselor sekolah

✅ **Jaga Kesehatan Mental**
- Ingat, ini bukan kesalahan Anda
- Lakukan aktivitas yang menyenangkan
- Ceritakan perasaan pada orang yang dipercaya

**📞 DARURAT: TePSA 1500 771 | WhatsApp: 081238888002**`,

            'privasi': `🔒 **TIPS MENJAGA PRIVASI ONLINE**

**🔑 MANAJEMEN AKUN:**
• Gunakan kata sandi kuat (minimal 8 karakter, kombinasi huruf, angka, simbol)
• Aktifkan verifikasi dua langkah
• Gunakan kata sandi berbeda untuk setiap akun penting

**📱 PENGATURAN MEDIA SOSIAL:**
• Review pengaturan privasi secara berkala
• Batasi siapa yang bisa melihat postingan Anda
• Matikan lokasi/location sharing untuk postingan

**🚫 INFORMASI YANG TIDAK BOLEH DIBAGIKAN:**
• Alamat rumah lengkap
• Nomor telepon pribadi
• Data rekening bank/kartu kredit
• Password dan PIN
• Foto KTP atau dokumen penting

**🌐 BROWSING AMAN:**
• Gunakan mode privat/incognito untuk browsing sensitif
• Hati-hati dengan WiFi publik
• Periksa URL website sebelum memasukkan data`,

            'anak': `👶 **KEAMANAN INTERNET UNTUK ANAK-ANAK**

**🛡️ UNTUK ORANG TUA:**
• Gunakan parental control software
• Buat aturan jelas tentang penggunaan internet
• Ajarkan anak tentang privasi online
• Monitor aktivitas online tanpa menginvasi privasi

**📚 UNTUK ANAK:**
• Jangan bertemu dengan orang yang dikenal dari internet
• Laporkan konten atau perilaku mencurigakan
• Jangan bagikan password kepada siapapun
• Bicara dengan orang tua jika merasa tidak nyaman

**⚙️ PENGATURAN YANG DISARANKAN:**
• Batasi screen time sesuai usia
• Aktifkan safe search di browser
• Gunakan kid-friendly browser
• Review history browsing secara berkala`,

            'media sosial': `📱 **KEAMANAN MEDIA SOSIAL**

**🔍 SEBELUM MEMOSTING:**
• Pikirkan: "Apakah konten ini aman dibagikan?"
• Pertimbangkan: "Apa dampaknya 5 tahun lagi?"
• Ingat: Sekali diinternet, selamanya diinternet

**⚙️ PENGATURAN PRIVASI:**
• Atur profil menjadi privat
• Batasi yang bisa mengirimkan permintaan pertemanan
• Review daftar teman secara berkala
• Batasi yang bisa mengomentari postingan Anda

**🛡️ INTERAKSI AMAN:**
• Hanya terima pertemanan dari orang yang dikenal
• Waspada terhadap akun tidak dikenal yang mengirim pesan
• Jangan klik link mencurigakan
• Laporkan konten yang tidak pantas`,

            'lapor': `📞 **CARA MELAPORKAN KONTEN TIDAK PANTAS**

**📱 PLATFORM MEDIA SOSIAL:**
• **Facebook/Instagram**: Tap "Laporkan" pada postingan/komentar
• **Twitter**: Klik "Laporkan Tweet" pada tweet yang menyinggung
• **TikTok**: Tap "Laporkan" pada video atau komentar
• **WhatsApp**: Blokir dan laporkan nomor tersebut

**🏫 DI SEKOLAH:**
• Laporkan ke guru kelas atau guru BK
• Sampaikan ke wali kelas
• Gunakan mekanisme pelaporan yang disediakan sekolah

**👮 INSTANSI RESMI:**
• **TePSA**: 1500 771 (Telepon Pelayanan Sosial Anak)
• **Polisi**: 110 (untuk kasus yang serius)
• **KPAI**: Komisi Perlindungan Anak Indonesia`,

            'default': `🤖 **ASISTEN KEAMANAN INTERNET**

Saya melihat pertanyaan Anda tentang keamanan internet. Berikut topik yang bisa saya bantu:

**🔍 TOPIK BANTUAN:**
• 🚨 **Cyberbullying** - Pencegahan dan penanganan
• 🔒 **Privasi Online** - Tips menjaga data pribadi
• 📱 **Media Sosial** - Pengaturan keamanan platform
• 👶 **Keamanan Anak** - Parental control dan edukasi
• 📞 **Pelaporan** - Cara melaporkan konten tidak pantas
• 🛡️ **Umum** - Best practices keamanan digital

**💡 CONTOH PERTANYAAN:**
• "Apa yang harus dilakukan jika mengalami cyberbullying?"
• "Bagaimana cara menjaga privasi di Instagram?"
• "Tips aman untuk anak menggunakan internet?"
• "Cara melaporkan akun palsu di media sosial?"

Silakan tanyakan hal spesifik tentang keamanan internet!`
        };

        // Logic pemilihan response berdasarkan kata kunci - FIXED TYPO
        if (lastUserMessage.includes('cyberbullying') || lastUserMessage.includes('bully') || lastUserMessage.includes('rundung')) {
            return responses.cyberbullying;
        } else if (lastUserMessage.includes('privasi') || lastUserMessage.includes('pribadi') || lastUserMessage.includes('rahasia') || lastUserMessage.includes('data')) {
            return responses.privasi;
        } else if (lastUserMessage.includes('anak') || lastUserMessage.includes('anak-anak') || lastUserMessage.includes('parental') || lastUserMessage.includes('ortu')) {
            return responses.anak;
        } else if (lastUserMessage.includes('media sosial') || lastUserMessage.includes('facebook') || lastUserMessage.includes('instagram') || lastUserMessage.includes('tiktok') || lastUserMessage.includes('twitter')) {
            return responses['media sosial']; // FIXED: menggunakan bracket notation
        } else if (lastUserMessage.includes('lapor') || lastUserMessage.includes('laporkan') || lastUserMessage.includes('melaporkan') || lastUserMessage.includes('report')) {
            return responses.lapor;
        } else {
            return responses.default;
        }
    }

    addMessage(text, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        
        const time = new Date().toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-text">${this.formatMessage(text)}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatMessage(text) {
        // Convert line breaks to HTML and format bold text
        return text.replace(/\n/g, '<br>')
                   .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                   .replace(/\•/g, '•')
                   .replace(/(\d+)\./g, '$1.');
    }

    showTypingIndicator() {
        this.isTyping = true;
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <span>AI sedang mengetik</span>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Disable send button
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) sendBtn.disabled = true;
    }

    removeTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        // Enable send button
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) sendBtn.disabled = false;
    }

    saveConversation() {
        try {
            // Simpan hanya 50 pesan terakhir untuk menghindari storage penuh
            const recentMessages = this.conversationHistory.slice(-50);
            localStorage.setItem('chatConversation', JSON.stringify(recentMessages));
        } catch (error) {
            console.error('Error saving conversation:', error);
        }
    }

    loadConversation() {
        try {
            const saved = localStorage.getItem('chatConversation');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                
                // Clear current messages and reload
                const chatMessages = document.getElementById('chat-messages');
                if (chatMessages && chatMessages.children.length <= 1) { // Only welcome message or empty
                    // Clear and reload conversation
                    this.conversationHistory.forEach(msg => {
                        this.addMessage(msg.content, msg.role === 'user' ? 'user' : 'ai');
                    });
                }
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }

    clearConversation() {
        if (confirm('Apakah Anda yakin ingin menghapus seluruh percakapan?')) {
            this.conversationHistory = [];
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                chatMessages.innerHTML = '';
                this.addMessage('🤖 <strong>Percakapan telah dibersihkan!</strong><br><br>Saya di sini untuk membantu Anda dengan berbagai masalah keamanan internet. Silakan tanyakan apa saja!', 'ai');
            }
            localStorage.removeItem('chatConversation');
        }
    }
}

// Initialize Chat AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatAI = new ChatAI();
});