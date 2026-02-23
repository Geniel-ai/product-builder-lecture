document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const premiumBtn = document.getElementById('premium-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const resultDiv = document.getElementById('result');
    const loadingSpinner = document.getElementById('loading-spinner');
    const luckyMessage = document.getElementById('lucky-message');
    const body = document.body;

    function getLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const r = Math.floor(Math.random() * 45) + 1;
            if (numbers.indexOf(r) === -1) numbers.push(r);
        }
        return numbers.sort((a, b) => a - b);
    }

    function getBallColorClass(num) {
        if (num <= 10) return 'var(--ball-1)';
        if (num <= 20) return 'var(--ball-2)';
        if (num <= 30) return 'var(--ball-3)';
        if (num <= 40) return 'var(--ball-4)';
        return 'var(--ball-5)';
    }

    function displayNumbers(numbers, isPremium = false) {
        resultDiv.innerHTML = '';
        luckyMessage.textContent = isPremium ? '✨ AI가 분석한 필승 조합입니다!' : '오늘의 행운 번호입니다.';
        
        numbers.forEach((num, index) => {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.textContent = num;
                ball.style.backgroundColor = getBallColorClass(num);
                resultDiv.appendChild(ball);
            }, index * 100);
        });
    }

    function handleDraw() {
        const nums = getLottoNumbers();
        displayNumbers(nums);
    }

    function handlePremiumDraw() {
        // 비즈니스 로직: 프리미엄은 분석하는 '척' 연출
        drawBtn.disabled = true;
        premiumBtn.disabled = true;
        resultDiv.innerHTML = '';
        luckyMessage.textContent = '';
        loadingSpinner.style.display = 'block';

        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            const nums = getLottoNumbers();
            displayNumbers(nums, true);
            drawBtn.disabled = false;
            premiumBtn.disabled = false;
        }, 2000); // 2초간 분석 연출
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        themeToggleBtn.textContent = isDarkMode ? '🌓' : '☀️';
    }

    drawBtn.addEventListener('click', handleDraw);
    premiumBtn.addEventListener('click', handlePremiumDraw);
    themeToggleBtn.addEventListener('click', toggleTheme);
});
