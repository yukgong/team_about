# IHATEFLYINGBUGS Team Site - 개발 진행 상황

## ✅ 완료된 작업

### Phase 1: 프로젝트 설정 및 기반 구축
- [x] Next.js 15 + TypeScript + Tailwind CSS 설정
- [x] 프로젝트 구조 생성 (app router)
- [x] 디자인 시스템 토큰 정의 (색상, 타이포그래피, spacing 등)

### Phase 2: 한글 타이포그래피 및 콘텐츠
- [x] **한글 폰트 시스템 구축**
  - Display (영문): Fraunces - 임팩트 있는 헤드라인
  - Serif (한글): Noto Serif KR - 편집 디자이너용 명조
  - Sans (한글): Noto Sans KR - UI 요소용
  - Mono: JetBrains Mono - 코드 표시
- [x] **전체 콘텐츠 한글화**
  - 6개 섹션 모두 완성된 한글 콘텐츠
  - 프로덕트 설명 (6개 서비스)
  - 채용 포지션 (5개 직군)
  - 기술 스택 및 개발 프로세스 설명

### Phase 3: Halftone 비주얼 시스템
- [x] **Halftone 유틸리티 함수 구축**
  - 기하학적 도형 생성 (circle, square, triangle, diamond)
  - Halftone 그리드 생성 알고리즘
  - 자연 모티프 패턴 생성 (숲, 산, 식물)
- [x] **Halftone 컴포넌트 제작**
  - `ForestHalftone`: Hero 섹션용 숲 일러스트
  - `MountainHalftone`: Philosophy 섹션용 3-layer 산맥
  - `BotanicalHalftone`: 프로덕트/채용 카드용 식물 모티프
- [x] **모든 이모지 제거 및 Halftone으로 대체**

### Phase 4: 섹션별 구현
- [x] **Hero 섹션: 숲**
  - 인터랙티브 ForestHalftone 배경 (마우스 반응형)
  - 영문 Display 헤드라인 + 한글 부제
  - 스크롤 힌트 애니메이션
- [x] **Philosophy 섹션: 산맥**
  - 3-layer 산 Parallax 효과
  - 철학 메시지 (한글 + 영문)
  - 깊이감 있는 시각적 계층
- [x] **Ecosystem 섹션: 프로덕트 정원**
  - 6개 프로덕트 카드 (Botanical Halftone)
  - Hover 인터랙션 (shadow, translate)
  - 다양한 식물 모티프 (leaf, flower, stem, seed)
- [x] **How We Build 섹션: 뿌리 시스템**
  - 기술 스택 소개 (기하학 도형 아이콘)
  - 개발 프로세스 4단계
  - 팀 문화 3가지
- [x] **People 섹션: 성장하는 팀**
  - 채용 포지션 5개 (Halftone 아이콘)
  - 기술 태그 시스템
  - CTA 버튼 및 연락처
- [x] **Footer**
  - 회사 정보 및 연락처
  - 소셜 링크
  - 카피라이트

---

## 🎨 디자인 시스템

### 컬러 팔레트
```
Primary:
- Parchment #F2EDE0 (배경)
- Moss #3D6B47 (주요)
- Earth #6B4F2A (보조)
- Forest #2C3A28 (텍스트)

Accent:
- Amber #D4824A
- Terracotta #C87854
- Sage #A5B5A3
```

### 타이포그래피
```
Display (영문): Fraunces 72-80px
Headline: Noto Serif KR 48px
Body: Noto Serif KR 16-18px
UI: Noto Sans KR 14-16px
Code: JetBrains Mono 14px
```

### Halftone 설정
```typescript
// 숲 (Hero)
dotSize: 2-8px, spacing: 12px, shape: circle

// 산 (Philosophy)
Layer 1: 6-12px, density: 0.8
Layer 2: 4-8px, density: 0.6
Layer 3: 2-5px, density: 0.4

// 식물 (Products/People)
dotSize: 2-6px, spacing: 8px
Types: leaf, flower, stem, seed
```

---

## 🚀 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: next/font (Google Fonts)
- **Animations**: CSS Transitions + Framer Motion (ready)

### Backend (예정)
- **Python**: FastAPI
- **Node**: Node.js + Express
- **Database**: PostgreSQL, Redis

---

## 📂 프로젝트 구조

```
team_site/
├── app/
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage (all sections)
│   └── globals.css          # Global styles
├── components/
│   ├── halftone/
│   │   ├── ForestHalftone.tsx
│   │   ├── MountainHalftone.tsx
│   │   ├── BotanicalHalftone.tsx
│   │   └── HalftonePattern.tsx
│   └── sections/            # (Future: separated sections)
├── lib/
│   ├── design-tokens.ts     # Design system
│   ├── fonts.ts             # Font configs
│   └── utils/
│       └── halftone.ts      # Halftone algorithms
├── public/                  # Static assets
├── WIREFRAMES.md            # Detailed wireframes
└── README.md                # Project docs
```

---

## 🔄 다음 단계 (개선 사항)

### 성능 최적화
- [ ] Halftone 컴포넌트 lazy loading (Intersection Observer)
- [ ] 이미지 최적화 (WebP, progressive JPEG)
- [ ] 코드 스플리팅 (섹션별 분리)

### 인터랙션 강화
- [ ] Smooth scroll 효과
- [ ] Parallax 심화 (Framer Motion)
- [ ] Hero 숲 애니메이션 (성장 효과)
- [ ] 프로덕트 카드 Halftone dissolve 효과

### 콘텐츠
- [ ] 실제 프로덕트 스크린샷/영상 추가
- [ ] 팀 사진 및 프로필
- [ ] 지원 폼 연동 (Google Forms or Typeform)
- [ ] CMS 연동 검토

### 추가 페이지
- [ ] 각 프로덕트 상세 페이지
- [ ] 팀별 소개 페이지 (R&D 팀 구성원)
- [ ] 블로그/뉴스 섹션

### 기술 부채
- [ ] 컴포넌트 분리 (page.tsx가 너무 큼)
- [ ] 반응형 테스트 (모바일, 태블릿)
- [ ] 접근성 개선 (ARIA labels, keyboard nav)
- [ ] SEO 최적화 (메타태그, sitemap)

---

## 📊 현재 상태

**개발 서버**: http://localhost:3000 ✅
**빌드 상태**: 정상
**경고**:
- Turbopack workspace root 경고 (무시 가능)
- @next/font deprecated (이미 제거됨)

**완성도**: 80% (기본 구조 + 비주얼 + 콘텐츠)

---

## 💡 핵심 특징

1. **따뜻한 편집 디자인**
   - 자연 색상 팔레트
   - 한글 명조 (Noto Serif KR)
   - 여유로운 spacing

2. **Halftone 비주얼 시스템**
   - 기하학 도형 기반
   - 자연 모티프 (숲, 산, 식물)
   - SVG로 구현 (확장 가능)

3. **인터랙티브 경험**
   - 마우스 반응형 Hero
   - 3-layer Parallax 산맥
   - Hover 효과

4. **개발자 친화적 채용**
   - 기술 스택 명시
   - 프로세스 투명성
   - 실험적이고 따뜻한 톤

---

**마지막 업데이트**: 2026-03-02
**다음 마일스톤**: 실제 콘텐츠 수집 및 인터랙션 강화
