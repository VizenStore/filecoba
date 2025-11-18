// Database simulation menggunakan localStorage
class Database {
    constructor() {
        this.init();
    }

    init() {
        // Initialize default data jika belum ada
        if (!localStorage.getItem('quiz_questions')) {
            this.initializeQuestions();
        }
        
        if (!localStorage.getItem('user_progress')) {
            localStorage.setItem('user_progress', JSON.stringify({}));
        }
        
        if (!localStorage.getItem('quiz_history')) {
            localStorage.setItem('quiz_history', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('achievements')) {
            localStorage.setItem('achievements', JSON.stringify([]));
        }
    }

    initializeQuestions() {
        const questions = [
            // Tips Aman questions
            {
                id: 1,
                material_id: 'tips-aman',
                question: 'Apa yang membuat sebuah kata sandi dianggap kuat?',
                options: JSON.stringify([
                    'Menggunakan nama hewan peliharaan',
                    'Kombinasi huruf besar-kecil, angka, dan simbol',
                    'Tanggal lahir yang mudah diingat',
                    'Nama lengkap dengan angka 123'
                ]),
                correct_answer: 1,
                explanation: 'Kata sandi yang kuat harus memiliki kombinasi huruf besar-kecil, angka, dan simbol dengan minimal 12 karakter.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                material_id: 'tips-aman',
                question: 'Mengapa verifikasi dua langkah (2FA) penting?',
                options: JSON.stringify([
                    'Agar login lebih cepat',
                    'Menambah lapisan keamanan ekstra',
                    'Mengganti kata sandi secara otomatis',
                    'Mempercantik tampilan login'
                ]),
                correct_answer: 1,
                explanation: '2FA menambahkan lapisan keamanan ekstra dengan membutuhkan dua bentuk identifikasi.',
                difficulty: 'easy',
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                material_id: 'tips-aman',
                question: 'Apa yang harus dilakukan ketika menerima email mencurigakan?',
                options: JSON.stringify([
                    'Langgan klik link di dalam email',
                    'Balas email untuk memastikan keasliannya',
                    'Hapus email tanpa membukanya',
                    'Verifikasi pengirim sebelum melakukan tindakan apapun'
                ]),
                correct_answer: 3,
                explanation: 'Selalu verifikasi pengirim email mencurigakan sebelum melakukan tindakan apapun. Jangan klik link atau download attachment.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 4,
                material_id: 'tips-aman',
                question: 'Kapan sebaiknya menggunakan VPN?',
                options: JSON.stringify([
                    'Hanya saat streaming video',
                    'Saat menggunakan WiFi publik',
                    'VPN tidak pernah diperlukan',
                    'Hanya untuk download file besar'
                ]),
                correct_answer: 1,
                explanation: 'Gunakan VPN saat menggunakan WiFi publik untuk mengenkripsi koneksi dan melindungi data dari penyadapan.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 5,
                material_id: 'tips-aman',
                question: 'Apa tujuan utama dari update software berkala?',
                options: JSON.stringify([
                    'Membuat tampilan lebih menarik',
                    'Menambah fitur-fitur baru saja',
                    'Memperbaiki celah keamanan',
                    'Meningkatkan kecepatan internet'
                ]),
                correct_answer: 2,
                explanation: 'Update software membantu menutupi celah keamanan yang mungkin dieksploitasi oleh peretas.',
                difficulty: 'easy',
                created_at: new Date().toISOString()
            },
            // Cyberbullying questions
            {
                id: 6,
                material_id: 'cyberbullying',
                question: 'Apa yang harus dilakukan pertama kali ketika mengalami cyberbullying?',
                options: JSON.stringify([
                    'Membalas dengan kata-kata yang sama',
                    'Menghapus semua bukti',
                    'Menyimpan bukti dan tidak membalas',
                    'Mengabaikan dan berharap berhenti sendiri'
                ]),
                correct_answer: 2,
                explanation: 'Pertama-tama simpan bukti sebagai dokumentasi, lalu jangan membalas agar tidak memperburuk situasi.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 7,
                material_id: 'cyberbullying',
                question: 'Manakah yang termasuk bentuk cyberbullying?',
                options: JSON.stringify([
                    'Memberikan komentar positif',
                    'Menyebarkan rumor palsu online',
                    'Mengirim pesan ucapan selamat',
                    'Memberi like pada postingan teman'
                ]),
                correct_answer: 1,
                explanation: 'Menyebarkan rumor palsu untuk merusak reputasi seseorang adalah bentuk cyberbullying yang serius.',
                difficulty: 'easy',
                created_at: new Date().toISOString()
            },
            {
                id: 8,
                material_id: 'cyberbullying',
                question: 'Siapa yang harus dihubungi ketika mengalami cyberbullying serius?',
                options: JSON.stringify([
                    'Hanya teman dekat',
                    'Orang tua, guru, atau pihak berwajib',
                    'Tidak perlu melapor ke siapapun',
                    'Hanya media sosial yang bersangkutan'
                ]),
                correct_answer: 1,
                explanation: 'Laporkan ke orang dewasa yang dipercaya dan pihak berwajib untuk kasus cyberbullying yang serius.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 9,
                material_id: 'cyberbullying',
                question: 'Apa dampak jangka panjang cyberbullying pada korban?',
                options: JSON.stringify([
                    'Meningkatkan popularitas',
                    'Mengurangi kepercayaan diri dan menyebabkan depresi',
                    'Memperbaiki prestasi akademik',
                    'Menambah jumlah teman di media sosial'
                ]),
                correct_answer: 1,
                explanation: 'Cyberbullying dapat menyebabkan dampak psikologis serius seperti kepercayaan diri rendah, anxiety, dan depresi.',
                difficulty: 'hard',
                created_at: new Date().toISOString()
            },
            {
                id: 10,
                material_id: 'cyberbullying',
                question: 'Bagaimana cara membantu teman yang mengalami cyberbullying?',
                options: JSON.stringify([
                    'Ikut membalas pelaku',
                    'Mendorongnya untuk diam saja',
                    'Mendengarkan dan mendukungnya untuk melapor',
                    'Menyebarkan cerita tersebut ke lebih banyak orang'
                ]),
                correct_answer: 2,
                explanation: 'Dengarkan dengan empati, berikan dukungan, dan bantu mereka untuk melapor ke pihak yang tepat.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            // Tips Guru questions
            {
                id: 11,
                material_id: 'tips-guru',
                question: 'Apa tanda-tanda seorang siswa mungkin menjadi korban cyberbullying?',
                options: JSON.stringify([
                    'Semangat belajar meningkat',
                    'Sering menggunakan gadget dengan bebas',
                    'Menjadi pendiam dan menarik diri',
                    'Prestasi akademik meningkat'
                ]),
                correct_answer: 2,
                explanation: 'Perubahan perilaku seperti menjadi pendiam dan menarik diri bisa menjadi tanda cyberbullying.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 12,
                material_id: 'tips-guru',
                question: 'Apa langkah pertama yang harus dilakukan guru ketika menerima laporan cyberbullying?',
                options: JSON.stringify([
                    'Mengabaikan laporan',
                    'Menghukum semua siswa yang terlibat',
                    'Mendengarkan dengan serius dan mengumpulkan informasi',
                    'Langsung memanggil orang tua'
                ]),
                correct_answer: 2,
                explanation: 'Dengarkan dengan serius, kumpulkan informasi dan bukti sebelum mengambil tindakan lebih lanjut.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            },
            {
                id: 13,
                material_id: 'tips-guru',
                question: 'Bagaimana cara mencegah cyberbullying di lingkungan sekolah?',
                options: JSON.stringify([
                    'Melarang penggunaan gadget sama sekali',
                    'Mengintegrasikan pendidikan keamanan digital dalam kurikulum',
                    'Tidak membahas topik cyberbullying',
                    'Hanya mengandalkan hukuman'
                ]),
                correct_answer: 1,
                explanation: 'Edukasi proaktif tentang keamanan digital dan cyberbullying lebih efektif daripada hanya mengandalkan hukuman.',
                difficulty: 'hard',
                created_at: new Date().toISOString()
            },
            {
                id: 14,
                material_id: 'tips-guru',
                question: 'Apa yang harus dilakukan terhadap bukti cyberbullying?',
                options: JSON.stringify([
                    'Hapus agar tidak dilihat orang lain',
                    'Simpan sebagai dokumentasi untuk investigasi',
                    'Bagikan ke semua guru',
                    'Posting di media sosial sekolah'
                ]),
                correct_answer: 1,
                explanation: 'Simpan semua bukti cyberbullying seperti screenshot untuk keperluan investigasi dan pelaporan.',
                difficulty: 'easy',
                created_at: new Date().toISOString()
            },
            {
                id: 15,
                material_id: 'tips-guru',
                question: 'Kapan guru harus melibatkan orang tua dalam kasus cyberbullying?',
                options: JSON.stringify([
                    'Hanya untuk kasus yang sangat serius',
                    'Segera setelah menerima laporan',
                    'Tidak perlu melibatkan orang tua',
                    'Setelah menyelesaikan investigasi internal'
                ]),
                correct_answer: 1,
                explanation: 'Libatkan orang tua segera setelah menerima laporan untuk bekerja sama dalam penanganan kasus.',
                difficulty: 'medium',
                created_at: new Date().toISOString()
            }
        ];

        localStorage.setItem('quiz_questions', JSON.stringify(questions));
    }

    // Method untuk mengambil pertanyaan berdasarkan materi
    getQuestionsByMaterial(materialId, limit = 5) {
        const questions = JSON.parse(localStorage.getItem('quiz_questions') || '[]');
        const materialQuestions = questions.filter(q => q.material_id === materialId);
        
        // Acak urutan dan ambil sejumlah limit
        return this.shuffleArray(materialQuestions).slice(0, limit);
    }

    // Method untuk menyimpan hasil kuis
    saveQuizResult(quizData) {
        const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        const newQuiz = {
            ...quizData,
            id: Date.now(), // Unique ID
            timestamp: new Date().toISOString()
        };
        
        history.push(newQuiz);
        localStorage.setItem('quiz_history', JSON.stringify(history));
        return newQuiz;
    }

    // Method untuk mendapatkan riwayat kuis user
    getQuizHistory(userId) {
        const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        return history.filter(quiz => quiz.userId === userId);
    }

    // Method untuk mendapatkan statistik user
    getUserStatistics(userId) {
        const history = this.getQuizHistory(userId);
        const progress = JSON.parse(localStorage.getItem('user_progress') || '{}');
        
        const totalQuizzes = history.length;
        const totalQuestions = history.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
        const correctAnswers = history.reduce((sum, quiz) => sum + quiz.score, 0);
        const averageScore = totalQuizzes > 0 ? 
            Math.round((correctAnswers / totalQuestions) * 100) : 0;

        return {
            totalQuizzes,
            totalQuestions,
            correctAnswers,
            averageScore,
            materialsCompleted: Object.values(progress).filter(p => p.completed).length,
            quizzesCompleted: Object.values(progress).filter(p => p.quizCompleted).length,
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]').length
        };
    }

    // Method untuk mendapatkan leaderboard
    getLeaderboard(limit = 10) {
        const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        
        // Group by user and calculate average scores
        const userStats = {};
        history.forEach(quiz => {
            if (!userStats[quiz.userId]) {
                userStats[quiz.userId] = {
                    userId: quiz.userId,
                    totalQuizzes: 0,
                    totalScore: 0,
                    totalQuestions: 0
                };
            }
            
            userStats[quiz.userId].totalQuizzes++;
            userStats[quiz.userId].totalScore += quiz.score;
            userStats[quiz.userId].totalQuestions += quiz.totalQuestions;
        });

        // Calculate averages and create leaderboard
        const leaderboard = Object.values(userStats)
            .map(user => ({
                userId: user.userId,
                averageScore: Math.round((user.totalScore / user.totalQuestions) * 100),
                totalQuizzes: user.totalQuizzes
            }))
            .sort((a, b) => b.averageScore - a.averageScore)
            .slice(0, limit);

        return leaderboard;
    }

    // Helper method untuk mengacak array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Method untuk menambahkan pertanyaan baru
    addQuestion(questionData) {
        const questions = JSON.parse(localStorage.getItem('quiz_questions') || '[]');
        const newQuestion = {
            ...questionData,
            id: Date.now(), // Unique ID
            created_at: new Date().toISOString()
        };
        questions.push(newQuestion);
        localStorage.setItem('quiz_questions', JSON.stringify(questions));
        return newQuestion;
    }

    // Method untuk mendapatkan semua pertanyaan (untuk admin)
    getAllQuestions() {
        return JSON.parse(localStorage.getItem('quiz_questions') || '[]');
    }

    // Method untuk menghapus pertanyaan
    deleteQuestion(questionId) {
        const questions = JSON.parse(localStorage.getItem('quiz_questions') || '[]');
        const filteredQuestions = questions.filter(q => q.id !== questionId);
        localStorage.setItem('quiz_questions', JSON.stringify(filteredQuestions));
        return true;
    }

    // Method untuk update pertanyaan
    updateQuestion(questionId, updateData) {
        const questions = JSON.parse(localStorage.getItem('quiz_questions') || '[]');
        const questionIndex = questions.findIndex(q => q.id === questionId);
        
        if (questionIndex !== -1) {
            questions[questionIndex] = {
                ...questions[questionIndex],
                ...updateData,
                updated_at: new Date().toISOString()
            };
            localStorage.setItem('quiz_questions', JSON.stringify(questions));
            return questions[questionIndex];
        }
        return null;
    }

    // Method untuk mendapatkan pertanyaan berdasarkan ID
    getQuestionById(questionId) {
        const questions = JSON.parse(localStorage.getItem('quiz_questions') || '[]');
        return questions.find(q => q.id === questionId) || null;
    }

    // Method untuk mendapatkan jumlah pertanyaan per materi
    getQuestionCountByMaterial() {
        const questions = JSON.parse(localStorage.getItem('quiz_questions') || '[]');
        const count = {};
        
        questions.forEach(q => {
            if (!count[q.material_id]) {
                count[q.material_id] = 0;
            }
            count[q.material_id]++;
        });
        
        return count;
    }

    // Method untuk backup data
    backupData() {
        return {
            questions: JSON.parse(localStorage.getItem('quiz_questions') || '[]'),
            user_progress: JSON.parse(localStorage.getItem('user_progress') || '{}'),
            quiz_history: JSON.parse(localStorage.getItem('quiz_history') || '[]'),
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
            backup_timestamp: new Date().toISOString()
        };
    }

    // Method untuk restore data
    restoreData(backupData) {
        if (backupData.questions) {
            localStorage.setItem('quiz_questions', JSON.stringify(backupData.questions));
        }
        if (backupData.user_progress) {
            localStorage.setItem('user_progress', JSON.stringify(backupData.user_progress));
        }
        if (backupData.quiz_history) {
            localStorage.setItem('quiz_history', JSON.stringify(backupData.quiz_history));
        }
        if (backupData.achievements) {
            localStorage.setItem('achievements', JSON.stringify(backupData.achievements));
        }
        return true;
    }
}

// Global instance
window.quizDatabase = new Database();

// Export untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Database;
}