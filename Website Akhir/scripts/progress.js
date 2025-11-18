// Progress tracking functionality
class ProgressTracker {
    constructor() {
        this.userId = this.getUserId();
    }

    getUserId() {
        let userId = localStorage.getItem('quiz_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('quiz_user_id', userId);
        }
        return userId;
    }

    markMaterialCompleted(materialId) {
        const progress = this.getUserProgress();
        if (!progress[materialId]) {
            progress[materialId] = {};
        }
        progress[materialId].completed = true;
        progress[materialId].completedAt = new Date().toISOString();
        progress[materialId].lastAccessed = new Date().toISOString();
        this.saveUserProgress(progress);
        
        // Trigger achievement check
        this.checkAchievements();
        
        return true;
    }

    markQuizCompleted(materialId, score, totalQuestions) {
        const progress = this.getUserProgress();
        if (!progress[materialId]) {
            progress[materialId] = {};
        }
        progress[materialId].quizCompleted = true;
        progress[materialId].quizScore = score;
        progress[materialId].quizTotal = totalQuestions;
        progress[materialId].quizCompletedAt = new Date().toISOString();
        progress[materialId].lastAccessed = new Date().toISOString();
        this.saveUserProgress(progress);
        
        // Save to quiz history
        this.saveQuizHistory(materialId, score, totalQuestions);
        
        // Trigger achievement check
        this.checkAchievements();
        
        return true;
    }

    saveQuizHistory(materialId, score, totalQuestions) {
        const quizHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        quizHistory.push({
            userId: this.userId,
            materialId: materialId,
            score: score,
            totalQuestions: totalQuestions,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('quiz_history', JSON.stringify(quizHistory));
    }

    getUserProgress() {
        return JSON.parse(localStorage.getItem('user_progress') || '{}');
    }

    saveUserProgress(progress) {
        localStorage.setItem('user_progress', JSON.stringify(progress));
    }

    getOverallProgress() {
        const progress = this.getUserProgress();
        const materials = ['tips-aman', 'cyberbullying', 'tips-guru'];
        const completed = materials.filter(material => progress[material]?.completed).length;
        const quizzesCompleted = materials.filter(material => progress[material]?.quizCompleted).length;
        
        return {
            total: materials.length,
            completed: completed,
            quizzesCompleted: quizzesCompleted,
            percentage: (completed / materials.length) * 100
        };
    }

    checkAchievements() {
        const progress = this.getUserProgress();
        const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
        
        // Check for new achievements
        const newAchievements = this.calculateNewAchievements(progress, achievements);
        
        if (newAchievements.length > 0) {
            this.showAchievementNotification(newAchievements);
        }
    }

    calculateNewAchievements(progress, currentAchievements) {
        const newAchievements = [];
        const achievementChecks = [
            {
                id: 'tips-aman-master',
                condition: progress['tips-aman']?.quizCompleted,
                title: 'Ahli Keamanan Digital',
                description: 'Selesaikan kuis Tips Aman Berinternet',
                icon: 'fas fa-shield-alt'
            },
            {
                id: 'cyberbullying-expert',
                condition: progress['cyberbullying']?.quizCompleted,
                title: 'Pahlawan Anti-Bullying',
                description: 'Selesaikan kuis Cyberbullying',
                icon: 'fas fa-users-slash'
            },
            {
                id: 'guru-handal',
                condition: progress['tips-guru']?.quizCompleted,
                title: 'Guru Digital Handal',
                description: 'Selesaikan kuis Panduan Guru',
                icon: 'fas fa-chalkboard-teacher'
            },
            {
                id: 'quiz-master',
                condition: Object.values(progress).filter(p => p.quizCompleted).length >= 3,
                title: 'Raja Kuis',
                description: 'Selesaikan semua kuis',
                icon: 'fas fa-crown'
            },
            {
                id: 'fast-learner',
                condition: this.isFastLearner(progress),
                title: 'Pembaca Cepat',
                description: 'Selesaikan 3 materi dalam 1 hari',
                icon: 'fas fa-bolt'
            },
            {
                id: 'perfect-score',
                condition: this.hasPerfectScore(),
                title: 'Sempurna!',
                description: 'Dapatkan nilai 100% di salah satu kuis',
                icon: 'fas fa-star'
            }
        ];

        achievementChecks.forEach(achievement => {
            if (achievement.condition && !currentAchievements.includes(achievement.id)) {
                newAchievements.push(achievement);
                currentAchievements.push(achievement.id);
            }
        });

        // Save updated achievements
        localStorage.setItem('achievements', JSON.stringify(currentAchievements));

        return newAchievements;
    }

    isFastLearner(progress) {
        const completedDates = Object.values(progress)
            .filter(p => p.completedAt)
            .map(p => new Date(p.completedAt).toDateString());
        
        const uniqueDates = new Set(completedDates);
        return uniqueDates.size >= 3;
    }

    hasPerfectScore() {
        const quizHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        return quizHistory.some(quiz => (quiz.score / quiz.totalQuestions * 100) === 100);
    }

    showAchievementNotification(achievements) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.5s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <i class="fas fa-trophy" style="font-size: 1.5rem;"></i>
                <div>
                    <strong style="display: block;">Achievement Unlocked! 🎉</strong>
                    <span>${achievements[0].title}</span>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }

    // Method untuk mendapatkan statistik lengkap
    getStatistics() {
        const progress = this.getUserProgress();
        const quizHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        
        const totalQuizzes = quizHistory.length;
        const totalQuestions = quizHistory.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
        const correctAnswers = quizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
        const averageScore = totalQuizzes > 0 ? 
            (correctAnswers / totalQuestions * 100) : 0;

        return {
            totalQuizzes,
            totalQuestions,
            correctAnswers,
            averageScore: Math.round(averageScore),
            materialsCompleted: Object.values(progress).filter(p => p.completed).length,
            quizzesCompleted: Object.values(progress).filter(p => p.quizCompleted).length,
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]').length
        };
    }

    // Method untuk reset progress (untuk testing)
    resetProgress() {
        localStorage.removeItem('user_progress');
        localStorage.removeItem('quiz_history');
        localStorage.removeItem('achievements');
        localStorage.removeItem('quiz_user_id');
        return true;
    }

    // Method untuk mendapatkan progress material tertentu
    getMaterialProgress(materialId) {
        const progress = this.getUserProgress();
        return progress[materialId] || {
            completed: false,
            quizCompleted: false,
            quizScore: 0,
            quizTotal: 0
        };
    }

    // Method untuk mengecek apakah user sudah menyelesaikan materi
    isMaterialCompleted(materialId) {
        const progress = this.getUserProgress();
        return progress[materialId]?.completed || false;
    }

    // Method untuk mengecek apakah user sudah menyelesaikan kuis
    isQuizCompleted(materialId) {
        const progress = this.getUserProgress();
        return progress[materialId]?.quizCompleted || false;
    }
}

// Add CSS for animations
const achievementStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = achievementStyles;
document.head.appendChild(styleSheet);

// Export untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}