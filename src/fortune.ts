import { recommendLottoNumbers } from './LottoRecommender';
import { KOREAN_CITIES, WORLD_CITIES, formatCityName } from './orrery/cities';
import { initTheme } from './theme';

const allCities = [...KOREAN_CITIES, ...WORLD_CITIES];

const fortuneBtn = document.getElementById('fortune-btn') as HTMLButtonElement | null;
const resultDiv = document.getElementById('result') as HTMLDivElement | null;
const loadingSpinner = document.getElementById('loading-spinner') as HTMLDivElement | null;
const fortuneResultArea = document.getElementById('fortune-result-area') as HTMLDivElement | null;
const fortuneText = document.getElementById('fortune-text') as HTMLDivElement | null;

const birthDateInput = document.getElementById('birth-date') as HTMLInputElement | null;
const birthTimeInput = document.getElementById('birth-time') as HTMLInputElement | null;
const genderSelect = document.getElementById('gender') as HTMLSelectElement | null;
const citySelect = document.getElementById('city-select') as HTMLSelectElement | null;

initTheme();

function populateCities() {
    if (!citySelect) return;
    citySelect.innerHTML = '';
    allCities.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index.toString();
        option.textContent = formatCityName(city);
        citySelect.appendChild(option);
    });
}
populateCities();

function getBallColorClass(num: number) {
    if (num <= 10) return 'var(--ball-1)';
    if (num <= 20) return 'var(--ball-2)';
    if (num <= 30) return 'var(--ball-3)';
    if (num <= 40) return 'var(--ball-4)';
    return 'var(--ball-5)';
}

function displayNumbers(numbers: number[]) {
    if (!resultDiv) return;
    resultDiv.innerHTML = '';
    numbers.forEach((num, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = num.toString();
            ball.style.backgroundColor = getBallColorClass(num);
            ball.setAttribute('aria-label', `번호 ${num}`);
            resultDiv.appendChild(ball);
        }, index * 100);
    });
}

function handleFortuneDraw() {
    if (!birthDateInput || !birthDateInput.value) {
        alert('생년월일을 입력해주세요!');
        return;
    }
    if (!fortuneBtn || !fortuneResultArea || !loadingSpinner || !resultDiv || !fortuneText) return;

    const date = new Date(birthDateInput.value);
    const time = birthTimeInput?.value || '12:00';
    const [hour, minute] = time.split(':').map(Number);
    const gender = (genderSelect?.value || 'M') as 'M' | 'F';
    const cityIndex = parseInt(citySelect?.value || '0');
    const city = allCities[cityIndex] || allCities[0];

    fortuneBtn.disabled = true;
    fortuneResultArea.style.display = 'none';
    loadingSpinner.style.display = 'block';

    try {
        const recommendation = recommendLottoNumbers({
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
            fortuneResultArea.style.display = 'block';
            displayNumbers(recommendation.numbers);

            const basisHtml = recommendation.basis.split('\n').join('<br>');
            fortuneText.innerHTML = '<strong>✨ 오늘의 기운 분석</strong><br><br>' + basisHtml;

            fortuneBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Error during lotto generation:', error);
        loadingSpinner.style.display = 'none';
        fortuneResultArea.style.display = 'none';
        alert('번호 생성 중 오류가 발생했습니다. 입력 정보를 확인해주세요.');
        fortuneBtn.disabled = false;
    }
}

if (fortuneBtn) fortuneBtn.onclick = handleFortuneDraw;
