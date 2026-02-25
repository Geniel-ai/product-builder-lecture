import { recommendLottoNumbers } from './LottoRecommender';
import { KOREAN_CITIES, WORLD_CITIES, formatCityName } from './orrery/cities';
import { initTheme } from './theme';

console.log('Fortune script loading...');

const allCities = [...KOREAN_CITIES, ...WORLD_CITIES];

const fortuneBtn = document.getElementById('fortune-btn') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
const loadingSpinner = document.getElementById('loading-spinner') as HTMLDivElement;
const fortuneResultArea = document.getElementById('fortune-result-area') as HTMLDivElement;
const fortuneText = document.getElementById('fortune-text') as HTMLDivElement;

// Form inputs
const birthDateInput = document.getElementById('birth-date') as HTMLInputElement;
const birthTimeInput = document.getElementById('birth-time') as HTMLInputElement;
const genderSelect = document.getElementById('gender') as HTMLSelectElement;
const citySelect = document.getElementById('city-select') as HTMLSelectElement;

initTheme();

// Populate City Select
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
            resultDiv.appendChild(ball);
        }, index * 100);
    });
}

async function handleFortuneDraw() {
    console.log('Fortune draw clicked');
    if (!birthDateInput.value) {
        alert('생년월일을 입력해주세요!');
        return;
    }

    const date = new Date(birthDateInput.value);
    const time = birthTimeInput.value || '12:00';
    const [hour, minute] = time.split(':').map(Number);
    const gender = genderSelect.value as 'M' | 'F';
    const cityIndex = parseInt(citySelect.value);
    const city = allCities[cityIndex] || allCities[0];

    fortuneBtn.disabled = true;
    fortuneResultArea.style.display = 'none';
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
            fortuneResultArea.style.display = 'block';
            displayNumbers(recommendation.numbers);
            
            const basisHtml = recommendation.basis.split('\n').join('<br>');
            fortuneText.innerHTML = '<strong>✨ 오늘의 기운 분석</strong><br><br>' + basisHtml;
            
            fortuneBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Error during lotto generation:', error);
        loadingSpinner.style.display = 'none';
        alert('번호 생성 중 오류가 발생했습니다.');
        fortuneBtn.disabled = false;
    }
}

if (fortuneBtn) fortuneBtn.onclick = handleFortuneDraw;

console.log('Fortune script initialized');
