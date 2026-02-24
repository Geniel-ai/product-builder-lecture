import { calculateSaju } from './orrery/saju';
import { calculateNatal } from './orrery/natal';
import { createChart } from './orrery/ziwei';
import type { BirthInput } from './orrery/types';

export interface LottoRecommendation {
    numbers: number[];
    basis: string;
}

export async function recommendLottoNumbers(input: BirthInput): Promise<LottoRecommendation> {
    // Provide default values for time to prevent errors in Orrery engine
    const hour = input.hour ?? 12;
    const minute = input.minute ?? 0;
    const birthInputWithTime: BirthInput = { ...input, hour, minute };

    const saju = calculateSaju(birthInputWithTime);
    const natal = await calculateNatal(birthInputWithTime);
    
    // createChart(year, month, day, hour, minute, isMale)
    const ziwei = createChart(
        birthInputWithTime.year, 
        birthInputWithTime.month, 
        birthInputWithTime.day, 
        birthInputWithTime.hour, 
        birthInputWithTime.minute, 
        birthInputWithTime.gender === 'M'
    );

    const pool: number[] = [];
    let basis = '';

    // 1. Saju Basis
    const elementCounts: Record<string, number> = { 'Wood': 0, 'Fire': 0, 'Earth': 0, 'Metal': 0, 'Water': 0 };
    
    const STEM_ELEMENTS: Record<string, string> = {
        '甲': 'Wood', '乙': 'Wood',
        '丙': 'Fire', '丁': 'Fire',
        '戊': 'Earth', '己': 'Earth',
        '庚': 'Metal', '辛': 'Metal',
        '壬': 'Water', '癸': 'Water'
    };
    const BRANCH_ELEMENTS: Record<string, string> = {
        '子': 'Water', '丑': 'Earth', '寅': 'Wood', '卯': 'Wood', '辰': 'Earth', '巳': 'Fire',
        '午': 'Fire', '未': 'Earth', '申': 'Metal', '酉': 'Metal', '戌': 'Earth', '亥': 'Water'
    };

    saju.pillars.forEach(p => {
        const stem = p.pillar.ganzi[0];
        const branch = p.pillar.ganzi[1];
        if (STEM_ELEMENTS[stem]) elementCounts[STEM_ELEMENTS[stem]]++;
        if (BRANCH_ELEMENTS[branch]) elementCounts[BRANCH_ELEMENTS[branch]]++;
    });

    basis += `[사주 분석] 당신의 기운은 `;
    const dominantElements = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
    basis += dominantElements.map(([el, count]) => `${el}(${count})`).join(', ') + ' 입니다. ';

    // Map elements to numbers
    const elementRanges: Record<string, number[]> = {
        'Wood': [1, 2, 3, 4, 5, 6, 7, 8, 9],
        'Fire': [10, 11, 12, 13, 14, 15, 16, 17, 18],
        'Earth': [19, 20, 21, 22, 23, 24, 25, 26, 27],
        'Metal': [28, 29, 30, 31, 32, 33, 34, 35, 36],
        'Water': [37, 38, 39, 40, 41, 42, 43, 44, 45]
    };

    dominantElements.slice(0, 3).forEach(([el]) => {
        pool.push(...elementRanges[el]);
    });

    // 2. Astrology Basis
    basis += `\n[점성술 분석] 행성 배치를 분석한 결과, `;
    const planetNumbers: number[] = [];
    natal.planets.forEach(p => {
        const num = (Math.floor(p.longitude) % 45) + 1;
        planetNumbers.push(num);
    });
    basis += `행성의 각도에서 추출한 ${planetNumbers.slice(0, 3).join(', ')} 등의 번호가 길조를 보입니다. `;
    pool.push(...planetNumbers);

    // 3. Ziwei Basis
    basis += `\n[자미두수] 명반의 길성 배치를 고려하여 최적의 조합을 구성했습니다.`;
    Object.values(ziwei.palaces).forEach((p, idx) => {
        if (p.stars.length > 0) {
            pool.push(((idx * 7) % 45) + 1);
        }
    });

    // Select 6 unique numbers from pool
    const finalNumbers: number[] = [];
    const uniquePool = Array.from(new Set(pool));
    
    // Simple pseudo-random based on input to make it consistent for the same person/day
    const seed = input.year * 10000 + input.month * 100 + input.day + (input.hour || 0);
    let rng = seed;
    const nextRng = () => {
        rng = (rng * 16807) % 2147483647;
        return rng;
    };

    while (finalNumbers.length < 6 && uniquePool.length > 0) {
        const idx = nextRng() % uniquePool.length;
        finalNumbers.push(uniquePool.splice(idx, 1)[0]);
    }

    // Fill with random if not enough
    while (finalNumbers.length < 6) {
        const num = (nextRng() % 45) + 1;
        if (!finalNumbers.includes(num)) finalNumbers.push(num);
    }

    return {
        numbers: finalNumbers.sort((a, b) => a - b),
        basis: basis
    };
}
