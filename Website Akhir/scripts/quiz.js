// Quiz functionality dengan database simulation
class QuizManager {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.materialId = this.getMaterialIdFromURL();
        this.userId = this.getUserId();
        this.tracker = new ProgressTracker();
        this.quizData = this.getQuizData();
        this.init();
    }

    init() {
        this.loadQuestions();
        this.bindEvents();
    }

    getMaterialIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('material') || 'tips-aman';
    }

    getUserId() {
        let userId = localStorage.getItem('quiz_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('quiz_user_id', userId);
        }
        return userId;
    }

    getQuizData() {
        return {
            'tips-aman': [
                {
                    id: 1,
                    question: 'Apa yang membuat sebuah kata sandi dianggap kuat?',
                    options: [
                        'Menggunakan nama hewan peliharaan',
                        'Kombinasi huruf besar-kecil, angka, dan simbol',
                        'Tanggal lahir yang mudah diingat',
                        'Nama lengkap dengan angka 123'
                    ],
                    correct_answer: 1,
                    explanation: 'Kata sandi yang kuat harus memiliki kombinasi huruf besar-kecil, angka, dan simbol dengan minimal 12 karakter. Hindari informasi pribadi yang mudah ditebak.'
                },
                {
                    id: 2,
                    question: 'Mengapa verifikasi dua langkah (2FA) penting?',
                    options: [
                        'Agar login lebih cepat',
                        'Menambah lapisan keamanan ekstra',
                        'Mengganti kata sandi secara otomatis',
                        'Mempercantik tampilan login'
                    ],
                    correct_answer: 1,
                    explanation: '2FA menambahkan lapisan keamanan ekstra dengan membutuhkan dua bentuk identifikasi, membuat akun lebih sulit diretas.'
                },
                {
                    id: 3,
                    question: 'Apa yang harus dilakukan ketika menerima email mencurigakan?',
                    options: [
                        'Langgan klik link di dalam email',
                        'Balas email untuk memastikan keasliannya',
                        'Hapus email tanpa membukanya',
                        'Verifikasi pengirim sebelum melakukan tindakan apapun'
                    ],
                    correct_answer: 3,
                    explanation: 'Selalu verifikasi pengirim email mencurigakan sebelum melakukan tindakan apapun. Jangan klik link atau download attachment.'
                },
                {
                    id: 4,
                    question: 'Kapan sebaiknya menggunakan VPN?',
                    options: [
                        'Hanya saat streaming video',
                        'Saat menggunakan WiFi publik',
                        'VPN tidak pernah diperlukan',
                        'Hanya untuk download file besar'
                    ],
                    correct_answer: 1,
                    explanation: 'Gunakan VPN saat menggunakan WiFi publik untuk mengenkripsi koneksi dan melindungi data dari penyadapan.'
                },
                {
                    id: 5,
                    question: 'Apa tujuan utama dari update software berkala?',
                    options: [
                        'Membuat tampilan lebih menarik',
                        'Menambah fitur-fitur baru saja',
                        'Memperbaiki celah keamanan',
                        'Meningkatkan kecepatan internet'
                    ],
                    correct_answer: 2,
                    explanation: 'Update software membantu menutupi celah keamanan yang mungkin dieksploitasi oleh peretas.'
                }
            ],
            'cyberbullying': [
                {
                    id: 6,
                    question: 'Apa yang harus dilakukan pertama kali ketika mengalami cyberbullying?',
                    options: [
                        'Membalas dengan kata-kata yang sama',
                        'Menghapus semua bukti',
                        'Menyimpan bukti dan tidak membalas',
                        'Mengabaikan dan berharap berhenti sendiri'
                    ],
                    correct_answer: 2,
                    explanation: 'Pertama-tama simpan bukti sebagai dokumentasi, lalu jangan membalas agar tidak memperburuk situasi.'
                },
                {
                    id: 7,
                    question: 'Manakah yang termasuk bentuk cyberbullying?',
                    options: [
                        'Memberikan komentar positif',
                        'Menyebarkan rumor palsu online',
                        'Mengirim pesan ucapan selamat',
                        'Memberi like pada postingan teman'
                    ],
                    correct_answer: 1,
                    explanation: 'Menyebarkan rumor palsu untuk merusak reputasi seseorang adalah bentuk cyberbullying yang serius.'
                },
                {
                    id: 8,
                    question: 'Siapa yang harus dihubungi ketika mengalami cyberbullying serius?',
                    options: [
                        'Hanya teman dekat',
                        'Orang tua, guru, atau pihak berwajib',
                        'Tidak perlu melapor ke siapapun',
                        'Hanya media sosial yang bersangkutan'
                    ],
                    correct_answer: 1,
                    explanation: 'Laporkan ke orang dewasa yang dipercaya dan pihak berwajib untuk kasus cyberbullying yang serius.'
                },
                {
                    id: 9,
                    question: 'Apa dampak jangka panjang cyberbullying pada korban?',
                    options: [
                        'Meningkatkan popularitas',
                        'Mengurangi kepercayaan diri dan menyebabkan depresi',
                        'Memperbaiki prestasi akademik',
                        'Menambah jumlah teman di media sosial'
                    ],
                    correct_answer: 1,
                    explanation: 'Cyberbullying dapat menyebabkan dampak psikologis serius seperti kepercayaan diri rendah, anxiety, dan depresi.'
                },
                {
                    id: 10,
                    question: 'Bagaimana cara membantu teman yang mengalami cyberbullying?',
                    options: [
                        'Ikut membalas pelaku',
                        'Mendorongnya untuk diam saja',
                        'Mendengarkan dan mendukungnya untuk melapor',
                        'Menyebarkan cerita tersebut ke lebih banyak orang'
                    ],
                    correct_answer: 2,
                    explanation: 'Dengarkan dengan empati, berikan dukungan, dan bantu mereka untuk melapor ke pihak yang tepat.'
                }
            ],
            'tips-guru': [
                {
                    id: 11,
                    question: 'Apa tanda-tanda seorang siswa mungkin menjadi korban cyberbullying?',
                    options: [
                        'Semangat belajar meningkat',
                        'Sering menggunakan gadget dengan bebas',
                        'Menjadi pendiam dan menarik diri',
                        'Prestasi akademik meningkat'
                    ],
                    correct_answer: 2,
                    explanation: 'Perubahan perilaku seperti menjadi pendiam dan menarik diri bisa menjadi tanda cyberbullying.'
                },
                {
                    id: 12,
                    question: 'Apa langkah pertama yang harus dilakukan guru ketika menerima laporan cyberbullying?',
                    options: [
                        'Mengabaikan laporan',
                        'Menghukum semua siswa yang terlibat',
                        'Mendengarkan dengan serius dan mengumpulkan informasi',
                        'Langsung memanggil orang tua'
                    ],
                    correct_answer: 2,
                    explanation: 'Dengarkan dengan serius, kumpulkan informasi dan bukti sebelum mengambil tindakan lebih lanjut.'
                },
                {
                    id: 13,
                    question: 'Bagaimana cara mencegah cyberbullying di lingkungan sekolah?',
                    options: [
                        'Melarang penggunaan gadget sama sekali',
                        'Mengintegrasikan pendidikan keamanan digital dalam kurikulum',
                        'Tidak membahas topik cyberbullying',
                        'Hanya mengandalkan hukuman'
                    ],
                    correct_answer: 1,
                    explanation: 'Edukasi proaktif tentang keamanan digital dan cyberbullying lebih efektif daripada hanya mengandalkan hukuman.'
                },
                {
                    id: 14,
                    question: 'Apa yang harus dilakukan terhadap bukti cyberbullying?',
                    options: [
                        'Hapus agar tidak dilihat orang lain',
                        'Simpan sebagai dokumentasi untuk investigasi',
                        'Bagikan ke semua guru',
                        'Posting di media sosial sekolah'
                    ],
                    correct_answer: 1,
                    explanation: 'Simpan semua bukti cyberbullying seperti screenshot untuk keperluan investigasi dan pelaporan.'
                },
                {
                    id: 15,
                    question: 'Kapan guru harus melibatkan orang tua dalam kasus cyberbullying?',
                    options: [
                        'Hanya untuk kasus yang sangat serius',
                        'Segera setelah menerima laporan',
                        'Tidak perlu melibatkan orang tua',
                        'Setelah menyelesaikan investigasi internal'
                    ],
                    correct_answer: 1,
                    explanation: 'Libatkan orang tua segera setelah menerima laporan untuk bekerja sama dalam penanganan kasus.'
                }
            ]
        };
    }

    async loadQuestions() {
        try {
            // Untuk demo, gunakan questions dari quizData
            this.questions = this.quizData[this.materialId] || this.quizData['tips-aman'];
            
            // Acak urutan pertanyaan
            this.questions = this.shuffleArray([...this.questions]).slice(0, 5);
            
            this.renderQuiz();
        } catch (error) {
            console.error('Error loading questions:', error);
            this.showError('Gagal memuat pertanyaan kuis');
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    renderQuiz() {
        const quizContent = document.getElementById('quiz-content');
        
        if (this.questions.length === 0) {
            quizContent.innerHTML = `
                <div class="results-container">
                    <h2>😔 Tidak ada pertanyaan tersedia</h2>
                    <p>Belum ada kuis untuk materi ini.</p>
                    <a href="index.html" class="btn btn-primary" style="margin-top: 1rem;">
                        <i class="fas fa-home"></i> Kembali ke Beranda
                    </a>
                </div>
            `;
            return;
        }

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;

        quizContent.innerHTML = `
            <div class="quiz-progress">
                <p>Pertanyaan ${this.currentQuestionIndex + 1} dari ${this.questions.length}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="question-card">
                <h3>${currentQuestion.question}</h3>
                <div class="options-container" id="options-container">
                    ${currentQuestion.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            ${this.userAnswers[this.currentQuestionIndex] !== undefined ? `
                <div class="explanation-box">
                    <strong>💡 Penjelasan:</strong>
                    <p>${currentQuestion.explanation}</p>
                </div>
            ` : ''}

            <div class="quiz-navigation">
                <button class="btn btn-outline" onclick="quizManager.previousQuestion()" 
                        ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Sebelumnya
                </button>
                
                ${this.userAnswers[this.currentQuestionIndex] !== undefined ? `
                    <button class="btn btn-primary" onclick="quizManager.nextQuestion()">
                        ${this.currentQuestionIndex === this.questions.length - 1 ? 'Lihat Hasil 🏁' : 'Lanjut ➡️'}
                    </button>
                ` : `
                    <button class="btn btn-primary" onclick="quizManager.checkAnswer()" id="check-btn">
                        Periksa Jawaban ✅
                    </button>
                `}
            </div>
        `;

        this.bindOptionEvents();
    }

    bindOptionEvents() {
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.userAnswers[this.currentQuestionIndex] !== undefined) return;
                
                optionBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    }

    bindEvents() {
        // Event listeners akan di-bind di renderQuiz
    }

    checkAnswer() {
        const selectedBtn = document.querySelector('.option-btn.selected');
        if (!selectedBtn) {
            this.showMessage('Pilih jawaban terlebih dahulu!', 'warning');
            return;
        }

        const selectedIndex = parseInt(selectedBtn.dataset.index);
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        this.userAnswers[this.currentQuestionIndex] = selectedIndex;

        // Tampilkan jawaban yang benar/salah
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach((btn, index) => {
            if (index === currentQuestion.correct_answer) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== currentQuestion.correct_answer) {
                btn.classList.add('incorrect');
            }
        });

        // Update score
        if (selectedIndex === currentQuestion.correct_answer) {
            this.score++;
            this.showMessage('Jawaban Benar! 🎉', 'success');
        } else {
            this.showMessage('Jawaban Salah ❌', 'error');
        }

        document.getElementById('check-btn').style.display = 'none';
        
        // Auto continue setelah 2 detik
        setTimeout(() => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.nextQuestion();
            } else {
                this.renderQuiz(); // Untuk menampilkan tombol "Lihat Hasil"
            }
        }, 2000);
    }

    showMessage(message, type) {
        // Create temporary message
        const messageDiv = document.createElement('div');
        const bgColor = type === 'success' ? 'var(--success)' : 
                        type === 'error' ? 'var(--accent)' : 'var(--warning)';
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${bgColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 600;
        `;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 2000);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.renderQuiz();
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuiz();
        }
    }

    showResults() {
        const percentage = (this.score / this.questions.length) * 100;
        let badge = '';
        let message = '';
        let icon = '';

        if (percentage >= 90) {
            badge = '🏆 Juara Keamanan Digital';
            message = 'Luar biasa! Anda menguasai materi dengan sangat baik.';
            icon = 'fas fa-crown';
        } else if (percentage >= 75) {
            badge = '⭐ Ahli Keamanan';
            message = 'Bagus! Pemahaman Anda sudah cukup baik.';
            icon = 'fas fa-star';
        } else if (percentage >= 60) {
            badge = '📚 Pelajar Berdedikasi';
            message = 'Cukup baik! Terus tingkatkan pemahaman Anda.';
            icon = 'fas fa-graduation-cap';
        } else {
            badge = '🌱 Pemula Berpotensi';
            message = 'Terus belajar! Review materi untuk pemahaman yang lebih baik.';
            icon = 'fas fa-seedling';
        }

        // Simpan hasil kuis
        this.tracker.markQuizCompleted(this.materialId, this.score, this.questions.length);

        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `
            <div class="results-container">
                <div class="score-circle celebrate">
                    ${Math.round(percentage)}%
                </div>
                <h2>Kuis Selesai! 🎉</h2>
                <div class="badge">
                    <i class="${icon}"></i> ${badge}
                </div>
                <p>${message}</p>
                <p>Nilai Anda: <strong>${this.score}/${this.questions.length}</strong> (${Math.round(percentage)}%)</p>
                
                <div style="margin: 2rem 0; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="quizManager.restartQuiz()">
                        <i class="fas fa-redo"></i> Ulangi Kuis
                    </button>
                    <a href="quiz-hub.html" class="btn btn-outline">
                        <i class="fas fa-trophy"></i> Pusat Kuis
                    </a>
                    <a href="index.html" class="btn btn-outline">
                        <i class="fas fa-home"></i> Beranda
                    </a>
                </div>

                <div class="material-section">
                    <h3>📖 Rekomendasi Belajar</h3>
                    <p>Berdasarkan hasil kuis Anda:</p>
                    <ul>
                        ${this.getLearningRecommendations()}
                    </ul>
                </div>

                <div class="material-section">
                    <h3>📊 Detail Jawaban</h3>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${this.questions.map((q, index) => `
                            <div style="padding: 1rem; border-bottom: 1px solid var(--border);">
                                <p><strong>Pertanyaan ${index + 1}:</strong> ${q.question}</p>
                                <p style="color: ${this.userAnswers[index] === q.correct_answer ? 'var(--success)' : 'var(--accent)'};">
                                    ${this.userAnswers[index] === q.correct_answer ? '✅ Benar' : '❌ Salah'} - 
                                    Jawaban Anda: ${q.options[this.userAnswers[index]]}
                                </p>
                                ${this.userAnswers[index] !== q.correct_answer ? `
                                    <p style="color: var(--success);">Jawaban benar: ${q.options[q.correct_answer]}</p>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getLearningRecommendations() {
        const incorrectQuestions = this.questions.filter((q, index) => 
            this.userAnswers[index] !== q.correct_answer
        );

        if (incorrectQuestions.length === 0) {
            return '<li>Pertahankan prestasi dengan terus mengikuti perkembangan keamanan digital</li>';
        }

        const recommendations = {
            'tips-aman': 'Review materi Tips Aman Berinternet, fokus pada pembuatan password dan keamanan akun',
            'cyberbullying': 'Pelajari kembali materi Cyberbullying, terutama cara penanganan dan pelaporan',
            'tips-guru': 'Review Panduan Guru, fokus pada strategi pencegahan dan penanganan kasus'
        };

        return `
            <li>${recommendations[this.materialId]}</li>
            <li>Praktikkan pengetahuan dalam kehidupan sehari-hari</li>
            <li>Ikuti perkembangan terbaru tentang keamanan digital</li>
        `;
    }

    async saveQuizResult() {
        try {
            const quizData = {
                userId: this.userId,
                materialId: this.materialId,
                score: this.score,
                totalQuestions: this.questions.length,
                timestamp: new Date().toISOString()
            };

            // Simpan ke localStorage untuk demo
            let quizHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');
            quizHistory.push(quizData);
            localStorage.setItem('quiz_history', JSON.stringify(quizHistory));

            console.log('Quiz result saved:', quizData);
        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.questions = this.shuffleArray([...this.quizData[this.materialId]]).slice(0, 5);
        this.renderQuiz();
    }

    showError(message) {
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `
            <div class="results-container">
                <h2>😔 Terjadi Kesalahan</h2>
                <p>${message}</p>
                <div style="margin-top: 2rem;">
                    <a href="index.html" class="btn btn-primary">
                        <i class="fas fa-home"></i> Kembali ke Beranda
                    </a>
                    <button class="btn btn-outline" onclick="location.reload()" style="margin-left: 1rem;">
                        <i class="fas fa-redo"></i> Coba Lagi
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize quiz manager ketika halaman dimuat
let quizManager;
document.addEventListener('DOMContentLoaded', () => {
    quizManager = new QuizManager();
});