# 호재 로또 - AI 행운 번호 추첨기

AI 알고리즘 기반 로또 행운 번호 추첨 서비스입니다. 역대 당첨 데이터를 분석하여 통계적으로 최적화된 번호 조합을 무료로 제공합니다.

🔗 **라이브 데모**: [https://geniel-ai.github.io/product-builder-lecture/](https://geniel-ai.github.io/product-builder-lecture/)

## 주요 기능

### 무료 번호 생성
랜덤 알고리즘 기반의 로또 번호 6자리를 즉시 생성합니다.

### AI 프리미엄 분석
Hot/Cold 번호 풀을 기반으로 출현 빈도가 높은 번호를 우선 포함하여 조합을 생성합니다.

### 운세 기반 맞춤 번호 (사주 + 점성술)
생년월일, 출생 시간, 성별, 출생 도시를 입력하면 아래 세 가지 엔진을 통합 분석하여 개인 맞춤 번호를 추천합니다.
- **사주팔자**: 천간/지지 오행 분석
- **서양 점성술**: 행성 위치 및 하우스 배치 계산
- **자미두수**: 명궁 주성 기반 행운수 도출

### 동물상 테스트
TensorFlow.js + Teachable Machine을 활용하여 사용자가 업로드한 얼굴 사진에서 동물상을 판별합니다. 이미지는 브라우저 내에서만 처리되며 서버로 전송되지 않습니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 언어 | TypeScript |
| 빌드 | Vite 5 |
| 천문 계산 | Orrery (Pure TS 천문력 엔진) |
| 음력 변환 | lunar-javascript |
| 이미지 분석 | TensorFlow.js, Teachable Machine |
| 배포 | GitHub Pages (GitHub Actions) |

## 프로젝트 구조

```
├── index.html              # 메인 페이지 (번호 생성)
├── fortune.html            # 운세 기반 맞춤 번호
├── animal-test.html        # 동물상 테스트
├── about.html              # 서비스 소개
├── privacy.html            # 개인정보처리방침
├── style.css               # 메인 스타일시트
├── animal-test.css         # 동물상 테스트 스타일시트
├── ads.txt                 # Google AdSense 인증
├── src/
│   ├── main.ts             # 메인 페이지 로직
│   ├── fortune.ts          # 운세 페이지 로직
│   ├── theme.ts            # 다크/라이트 테마 전환
│   ├── simple-page.ts      # 정적 페이지 공통 스크립트
│   ├── LottoRecommender.ts # 운세 기반 번호 추천 엔진
│   └── orrery/             # 천문력 계산 엔진
│       ├── natal.ts        # 출생 차트 계산
│       ├── saju.ts         # 사주팔자 계산
│       ├── ziwei.ts        # 자미두수 계산
│       ├── pillars.ts      # 사주 기둥 계산
│       ├── cities.ts       # 도시 좌표 데이터
│       └── ephemeris/      # 천문력 (행성 위치, 하우스 등)
├── public/
│   └── ads.txt             # 빌드 시 복사될 ads.txt
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages 자동 배포
```

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 배포

`main` 브랜치에 push하면 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

## 라이선스

ISC
