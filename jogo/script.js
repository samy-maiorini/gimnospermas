document.addEventListener('DOMContentLoaded', () => {
    const cardsData = [
        "Pinheiro", "Cipreste", "Sequoia", "Abeto",
        "Cedro", "Junípero", "Ginkgo", "Cycas"
    ];

    let gameCards = [];
    let flippedCards = [];
    let matchedCount = 0;
    let moves = 0;
    let difficulty = 'easy';
    let timerSeconds = 0;
    let timerInterval = null;
    let paused = false;

    const board = document.getElementById('gameBoard');
    const movesDisplay = document.getElementById('moves');
    const matchesDisplay = document.getElementById('matches');
    const accuracyDisplay = document.getElementById('accuracy');
    const timerDisplay = document.getElementById('timer');
    const modal = document.getElementById('gameCompleteModal');
    const finalTime = document.getElementById('finalTime');
    const finalMoves = document.getElementById('finalMoves');
    const finalAccuracy = document.getElementById('finalAccuracy');

    function startGame() {
        board.innerHTML = '';
        moves = 0;
        matchedCount = 0;
        flippedCards = [];
        updateStats();
        timerSeconds = 0;
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        difficulty = document.getElementById('difficulty').value;
        board.className = `game-board ${difficulty}`;

        const numPairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
        const selected = shuffle([...cardsData]).slice(0, numPairs);
        gameCards = shuffle([...selected, ...selected]);

        gameCards.forEach(name => {
            const card = createCard(name);
            board.appendChild(card);
        });
    }

    function createCard(name) {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.name = name;

        card.innerHTML = `
            <div class="card-front">
                <i class="fas fa-question card-icon"></i>
            </div>
            <div class="card-back">
                <i class="fas fa-tree gymnosperm-icon"></i>
                <div class="card-title">${name}</div>
            </div>
        `;

        card.addEventListener('click', () => handleCardClick(card));
        return card;
    }

    function handleCardClick(card) {
        if (paused || flippedCards.includes(card) || card.classList.contains('matched') || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            updateStats();

            const [c1, c2] = flippedCards;
            if (c1.dataset.name === c2.dataset.name) {
                c1.classList.add('matched');
                c2.classList.add('matched');
                matchedCount++;
                flippedCards = [];

                if (matchedCount === gameCards.length / 2) {
                    clearInterval(timerInterval);
                    finalTime.textContent = timerDisplay.textContent;
                    finalMoves.textContent = moves;
                    finalAccuracy.textContent = accuracyDisplay.textContent;
                    modal.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    c1.classList.remove('flipped');
                    c2.classList.remove('flipped');
                    flippedCards = [];
                }, 800);
            }
        }
    }

    function updateStats() {
        movesDisplay.textContent = moves;
        matchesDisplay.textContent = matchedCount;
        const accuracy = moves > 0 ? Math.round((matchedCount / moves) * 100) : 100;
        accuracyDisplay.textContent = `${accuracy}%`;
    }

    function updateTimer() {
        if (paused) return;
        timerSeconds++;
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Botões
    document.getElementById('newGameBtn').addEventListener('click', startGame);

    document.getElementById('pauseBtn').addEventListener('click', () => {
        paused = !paused;
        alert(paused ? 'Jogo pausado!' : 'Jogo retomado!');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('playAgainBtn').addEventListener('click', startGame);

    document.getElementById('difficulty').addEventListener('change', startGame);

    // Inicia o jogo ao carregar
    startGame();
});
