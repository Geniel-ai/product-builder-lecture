import { initTheme } from './theme';

console.log('Main script loading...');

const drawBtn = document.getElementById('draw-btn') as HTMLButtonElement;
const premiumBtn = document.getElementById('premium-btn') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
const loadingSpinner = document.getElementById('loading-spinner') as HTMLDivElement;
const luckyMessage = document.getElementById('lucky-message') as HTMLDivElement;

initTheme();

function getLottoNumbers(isPremium: boolean = false) {
    const numbers: number[] = [];
    
    if (isPremium) {
        // Simulate Hot/Cold analysis
        // Hot numbers (more likely in simulation)
        const hotPool = [1, 5, 12, 18, 24, 33, 41, 45];
        // Cold numbers (less likely in simulation)
        const coldPool = [3, 9, 14, 21, 28, 37, 40];
        
        // Pick 2-3 from hot pool
        const hotCount = Math.floor(Math.random() * 2) + 2;
        while (numbers.length < hotCount) {
            const r = hotPool[Math.floor(Math.random() * hotPool.length)];
            if (!numbers.includes(r)) numbers.push(r);
        }
    }

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
        const nums = getLottoNumbers(true);
        displayNumbers(nums, '✨ AI가 분석한 필승 조합입니다! (패턴 분석 완료)');
        drawBtn.disabled = false;
        premiumBtn.disabled = false;
    }, 1500);
}

if (drawBtn) drawBtn.onclick = handleDraw;
if (premiumBtn) premiumBtn.onclick = handlePremiumDraw;

console.log('Main script initialized');
