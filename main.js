document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const lottoGamesContainer = document.getElementById('lotto-games-container');
    const body = document.body;

    // 가중치 배열 (1~45번 공)
    const frequencyWeight = [
        // 이 배열은 1부터 45까지 각 숫자의 가중치를 나타냅니다.
        // 예시: 1이 2보다 2배 더 많이 나오게 하려면 [..., 2, 1, ...]
        // 일단은 모든 숫자가 동일한 확률을 갖도록 1로 초기화합니다.
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1
    ];

    function weightedRandom() {
        const totalWeight = frequencyWeight.reduce((acc, weight) => acc + weight, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < frequencyWeight.length; i++) {
            if (random < frequencyWeight[i]) {
                return i + 1;
            }
            random -= frequencyWeight[i];
        }
        return frequencyWeight.length;
    }

    function generateLottoGame() {
        const game = new Set();
        while (game.size < 6) {
            game.add(weightedRandom());
        }
        return Array.from(game).sort((a, b) => a - b);
    }

    function getBallColor(number) {
        if (number <= 10) return 'var(--yellow)';
        if (number <= 20) return 'var(--blue)';
        if (number <= 30) return 'var(--red)';
        if (number <= 40) return 'var(--gray)';
        return 'var(--green)';
    }

    function displayGames() {
        lottoGamesContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const game = generateLottoGame();
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            
            const gameHeader = document.createElement('div');
            gameHeader.className = 'game-header';
            gameHeader.textContent = `Game ${i + 1}`;
            gameCard.appendChild(gameHeader);
            
            const numbersContainer = document.createElement('div');
            numbersContainer.className = 'lotto-numbers';

            game.forEach(number => {
                const ball = document.createElement('div');
                ball.className = 'lotto-ball';
                ball.textContent = number;
                ball.style.backgroundColor = getBallColor(number);
                numbersContainer.appendChild(ball);
            });

            gameCard.appendChild(numbersContainer);
            lottoGamesContainer.appendChild(gameCard);
        }
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        themeToggleBtn.textContent = isDarkMode ? 'White Mode' : 'Dark Mode';
    }

    generateBtn.addEventListener('click', displayGames);
    themeToggleBtn.addEventListener('click', toggleTheme);

    // 초기 5개 게임 생성
    displayGames();
});
