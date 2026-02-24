// Helper to get element by ID with proper casting
const getEl = <T extends HTMLElement>(id: string): T | null => document.getElementById(id) as T | null;

function init() {
    const drawBtn = getEl<HTMLButtonElement>('draw-btn');
    const premiumBtn = getEl<HTMLButtonElement>('premium-btn');
    const themeToggleBtn = getEl<HTMLButtonElement>('theme-toggle-btn');
    const resultDiv = getEl<HTMLDivElement>('result');
    const loadingSpinner = getEl<HTMLDivElement>('loading-spinner');
    const luckyMessage = getEl<HTMLDivElement>('lucky-message');
    const body = document.body;

    // Dark Mode Sync on Load
    if (themeToggleBtn) {
        const isDarkMode = body.classList.contains('dark');
        themeToggleBtn.textContent = isDarkMode ? '🌓' : '☀️';
    }

    function getLottoNumbers() {
        const numbers: number[] = [];
        while (numbers.length < 6) {
            const r = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(r)) numbers.push(r);
        }
        return numbers.sort((a, b) => a - b);
    }

    function getBallColorClass(num: number) {
        if (num <= 10) return 'var(--ball-1)';
        if (num <= 20) return 'var(--ball-2)';
        if (num <= 30) return 'var(--ball-3)';
        if (num <= 40) return 'var(--ball-4)';
        return 'var(--ball-5)';
    }

    function displayNumbers(numbers: number[], message: string = '오늘의 행운 번호입니다.') {
        if (!resultDiv || !luckyMessage) return;
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
        if (!drawBtn || !premiumBtn || !resultDiv || !luckyMessage || !loadingSpinner) return;
        
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
        }, 1500); // 1.5초간 분석 연출
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = isDarkMode ? '🌓' : '☀️';
        }
    }

    if (drawBtn) drawBtn.addEventListener('click', handleDraw);
    if (premiumBtn) premiumBtn.addEventListener('click', handlePremiumDraw);
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
}

// Ensure execution after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
