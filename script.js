
    document.addEventListener('DOMContentLoaded', function() {
    // Card interativo - função para virar o card ao clicar
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        infoCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }

    // Inicialização do quiz
    const quizStartButton = document.querySelector('.quiz-start');
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.querySelector('.result');
    const scoreElement = document.getElementById('score');
    const resetButton = document.querySelector('.quiz-reset');
    
    if (quizStartButton && quizContainer) {
        quizStartButton.addEventListener('click', function() {
            quizStartButton.style.display = 'none';
            quizContainer.style.display = 'block';
        });
    }
    
    // Inicialização do comportamento das opções do quiz
    const options = document.querySelectorAll('.option');
    let score = 0;
    let questionCount = document.querySelectorAll('.question').length;
    let answeredCount = 0;
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Verifica se a questão já foi respondida
            const question = this.closest('.question');
            if (question.classList.contains('answered')) {
                return;
            }
            
            // Marca a questão como respondida
            question.classList.add('answered');
            answeredCount++;
            
            // Verifica se a resposta está correta
            const isCorrect = this.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                this.classList.add('correct');
                score++;
            } else {
                this.classList.add('incorrect');
                
                // Destaca a resposta correta
                question.querySelectorAll('.option').forEach(opt => {
                    if (opt.getAttribute('data-correct') === 'true') {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Mostra o resultado quando todas as perguntas forem respondidas
            if (answeredCount === questionCount) {
                setTimeout(() => {
                    scoreElement.textContent = score;
                    resultContainer.style.display = 'block';
                }, 1000);
            }
        });
    });
    
    // Botão para reiniciar o quiz
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Limpa as classes de resposta
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('correct', 'incorrect');
            });
            
            // Reinicia o contador de perguntas respondidas
            document.querySelectorAll('.question').forEach(question => {
                question.classList.remove('answered');
            });
            
            // Reinicia o score
            score = 0;
            answeredCount = 0;
            
            // Esconde o resultado
            resultContainer.style.display = 'none';
        });
    }
    
   
    // Efeito de scroll suave para os links de navegação interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de aparecer elementos quando eles entram na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-card').forEach(section => {
        observer.observe(section);
    });
    
    // Adicionar classes de animação aos elementos
    document.querySelectorAll('.section-card').forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        section.style.transform = 'translateY(20px)';
    });
    
    // Função para animar elementos quando eles entram na viewport
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.section-card');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Animar elementos visíveis no carregamento da página
    animateOnScroll();
    
    // Animar elementos ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
});
