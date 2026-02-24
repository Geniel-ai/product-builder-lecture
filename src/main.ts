import { recommendLottoNumbers } from './LottoRecommender';
import { KOREAN_CITIES, formatCityName } from './orrery/cities';

document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn') as HTMLButtonElement;
    const premiumBtn = document.getElementById('premium-btn') as HTMLButtonElement;
    const fortuneBtn = document.getElementById('fortune-btn') as HTMLButtonElement;
    const themeToggleBtn = document.getElementById('theme-toggle-btn') as HTMLButtonElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;
    const loadingSpinner = document.getElementById('loading-spinner') as HTMLDivElement;
    const luckyMessage = document.getElementById('lucky-message') as HTMLDivElement;
    const fortuneAnalysis = document.getElementById('fortune-analysis') as HTMLDivElement;
    const fortuneText = document.getElementById('fortune-text') as HTMLDivElement;
    const body = document.body;

    // Form inputs
    const birthDateInput = document.getElementById('birth-date') as HTMLInputElement;
    const birthTimeInput = document.getElementById('birth-time') as HTMLInputElement;
    const genderSelect = document.getElementById('gender') as HTMLSelectElement;
    const citySelect = document.getElementById('city-select') as HTMLSelectElement;

    // Populate City Select
    function populateCities() {
        if (!citySelect) return;
        citySelect.innerHTML = '';
        KOREAN_CITIES.forEach((city, index) => {
            const option = document.createElement('option');
            option.value = index.toString();
            option.textContent = formatCityName(city);
            citySelect.appendChild(option);
        });
    }
    populateCities();

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
        fortuneAnalysis.style.display = 'none';
    }

    function handlePremiumDraw() {
        drawBtn.disabled = true;
        premiumBtn.disabled = true;
        fortuneBtn.disabled = true;
        resultDiv.innerHTML = '';
        luckyMessage.textContent = '';
        fortuneAnalysis.style.display = 'none';
        loadingSpinner.style.display = 'block';

        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            const nums = getLottoNumbers();
            displayNumbers(nums, '✨ AI가 분석한 필승 조합입니다!');
            drawBtn.disabled = false;
            premiumBtn.disabled = false;
            fortuneBtn.disabled = false;
        }, 2000);
    }

    async function handleFortuneDraw() {
        if (!birthDateInput.value) {
            alert('생년월일을 입력해주세요!');
            return;
        }

        const date = new Date(birthDateInput.value);
        const time = birthTimeInput.value || '12:00';
        const [hour, minute] = time.split(':').map(Number);
        const gender = genderSelect.value as 'M' | 'F';
        const cityIndex = parseInt(citySelect.value);
        const city = KOREAN_CITIES[cityIndex] || KOREAN_CITIES[0];

        drawBtn.disabled = true;
        premiumBtn.disabled = true;
        fortuneBtn.disabled = true;
        resultDiv.innerHTML = '';
        luckyMessage.textContent = '';
        fortuneAnalysis.style.display = 'none';
        loadingSpinner.style.display = 'block';

        try {
            const recommendation = await recommendLottoNumbers({
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                hour,
                minute,
                gender,
                latitude: city.lat,
                longitude: city.lon
            });

            setTimeout(() => {
                loadingSpinner.style.display = 'none';
                displayNumbers(recommendation.numbers, '🔮 당신의 운세가 담긴 번호입니다.');
                fortuneText.innerHTML = recommendation.basis.split('\n').join('<br>');
                fortuneAnalysis.style.display = 'block';

                drawBtn.disabled = false;
                premiumBtn.disabled = false;
                fortuneBtn.disabled = false;
            }, 2000);
        } catch (error) {
            console.error(error);
            loadingSpinner.style.display = 'none';
            alert('번호 생성 중 오류가 발생했습니다.');
            drawBtn.disabled = false;
            premiumBtn.disabled = false;
            fortuneBtn.disabled = false;
        }
    }

    function toggleTheme() {
        body.classList.toggle('dark');
        const isDarkMode = body.classList.contains('dark');
        themeToggleBtn.textContent = isDarkMode ? '🌓' : '☀️';
    }

    if (drawBtn) drawBtn.addEventListener('click', handleDraw);
    if (premiumBtn) premiumBtn.addEventListener('click', handlePremiumDraw);
    if (fortuneBtn) fortuneBtn.addEventListener('click', () => {
        handleFortuneDraw();
    });
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
});
