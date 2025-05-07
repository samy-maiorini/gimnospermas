document.addEventListener('DOMContentLoaded', function () {
    // ====== FUNCIONALIDADE DO CARD FLIP ======
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        infoCard.addEventListener('click', function() {
            infoCard.classList.toggle('flipped');
        });
    }

    // ====== FUNCIONALIDADE DO MENU ======
        // Selecionar elementos
        const menuToggle = document.getElementById('menuToggle');
        const menu = document.getElementById('menu');

        // Adicionar evento de clique ao botão do menu
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um item
        const menuItems = document.querySelectorAll('#menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menu.classList.remove('active');
            });
        });

        // Fechar o menu se clicar fora
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.classList.remove('active');
            }
        });

    // ====== FUNCIONALIDADE DO QUIZ ======
    const quizStartButton = document.querySelector('.quiz-start');
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.querySelector('.result');
    const scoreElement = document.getElementById('score');
    const resetButton = document.querySelector('.quiz-reset');
    const questions = document.querySelectorAll('.question');
    const options = document.querySelectorAll('.option');
    
    let score = 0;
    let answeredCount = 0;
    const questionCount = questions.length;

    // Função para iniciar o quiz
    if (quizStartButton && quizContainer) {
        quizStartButton.addEventListener('click', function() {
            console.log('Quiz started'); // Debug
            quizStartButton.style.display = 'none';
            quizContainer.style.display = 'block';
            resetQuiz(); // Garantir que o quiz está limpo ao iniciar
        });
    }

    // Função para resetar o quiz
    function resetQuiz() {
        console.log('Quiz reset'); // Debug
        score = 0;
        answeredCount = 0;
        
        // Limpa as classes de todas as opções
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
        
        // Remove a classe 'answered' de todas as perguntas
        questions.forEach(question => {
            question.classList.remove('answered');
        });
        
        // Esconde o resultado
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }
    }

    // Adiciona evento para cada opção do quiz
    options.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.question');
            
            // Se a pergunta já foi respondida, não faz nada
            if (question.classList.contains('answered')) {
                return;
            }
            
            // Marca a pergunta como respondida
            question.classList.add('answered');
            answeredCount++;
            console.log('Question answered:', answeredCount, 'of', questionCount); // Debug
            
            // Verifica se a resposta está correta
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                this.classList.add('correct');
                score++;
                console.log('Correct answer! Score:', score); // Debug
            } else {
                this.classList.add('incorrect');
                
                // Mostra a resposta correta
                question.querySelectorAll('.option').forEach(opt => {
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Desabilita as outras opções para esta pergunta
            question.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            // Se todas as perguntas foram respondidas, mostra o resultado
            if (answeredCount === questionCount) {
                setTimeout(function() {
                    if (scoreElement) {
                        scoreElement.textContent = score;
                    }
                    if (resultContainer) {
                        resultContainer.style.display = 'block';
                    }
                }, 800);
            }
        });
    });

    // Evento para o botão de reiniciar
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            console.log('Reset button clicked'); // Debug
            resetQuiz();
            
            // Esconde o quiz e mostra o botão de iniciar
            if (quizContainer) {
                quizContainer.style.display = 'none';
            }
            if (quizStartButton) {
                quizStartButton.style.display = 'block';
            }
        });
    }

    // ====== FUNCIONALIDADE DE SCROLL SUAVE ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====== ANIMAÇÕES DAS SEÇÕES ======
    const sections = document.querySelectorAll('.section-card');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        section.style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

