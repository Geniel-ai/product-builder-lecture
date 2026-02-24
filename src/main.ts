document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn') as HTMLButtonElement;
    const premiumBtn = document.getElementById('premium-btn') as HTMLButtonElement;
    const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const loadingSpinner = document.getElementById('loading-spinner') as HTMLDivElement;
    const luckyMessage = document.getElementById('lucky-message') as HTMLDivElement;
    const body = document.body;

    function getLottoNumbers() {
        const numbers: number[] = [];
        while (numbers.length < 6) {
            const r = Math.floor(Math.random() * 45) + 1;
            if (numbers.indexOf(r) === -1) numbers.push(r);
        }
        return numbers.sort((a, b) => a - b);
    }

    function getBallColorClass(num: number) {
        if (num <= 10) return '#fbc02d';
        if (num <= 20) return '#1976d2';
        if (num <= 30) return '#d32f2f';
        if (num <= 40) return '#7b1fa2';
        return '#388e3c';
    }

    function displayNumbers(numbers: number[], message: string = '오늘의 행운 번호입니다.') {
        resultDiv.innerHTML = '';
        luckyMessage.textContent = message;
        
        numbers.forEach((num, index) => {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.className = 'ball';
                ball.textContent = num.toString();
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
        drawBtn.disabled = true;
        premiumBtn.disabled = true;
        resultDiv.innerHTML = '';
        luckyMessage.textContent = '';
        loadingSpinner.style.display = 'block';

        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            const nums = getLottoNumbers();
            displayNumbers(nums, '✨ AI가 분석한 필승 조합입니다!');
            drawBtn.disabled = false;
            premiumBtn.disabled = false;
        }, 2000);
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        themeToggleBtn.textContent = isDarkMode ? '🌓' : '☀️';
    }

    if (drawBtn) drawBtn.addEventListener('click', handleDraw);
    if (premiumBtn) premiumBtn.addEventListener('click', handlePremiumDraw);
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
});
