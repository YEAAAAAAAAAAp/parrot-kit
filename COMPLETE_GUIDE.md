# ParrotKit Landing Page - 완전 가이드

## 🚀 프로젝트 개요

**ParrotKit**은 TikTok/Reels/Shorts 영상을 분석하여 제작 레시피를 제공하는 서비스의 랜딩 페이지입니다. Next.js 14, TypeScript, Tailwind CSS로 구축되었으며, 전환율 최적화와 실시간 분석 대시보드를 특징으로 합니다.

**배포 URL**: https://parrot-kit.vercel.app

---

## ✨ 주요 기능

### 🎯 전환 최적화 기능
- **분석 결과 블러 처리**: 결과를 보려면 사전예약 필수 (전환 유도)
- **이중 전환 경로**: 무료 Waitlist + Founding Drop
- **FOMO 요소**: 실시간 카운트다운, 남은 자리 표시
- **소셜 프루프**: 가입자 수, 대기 순번 표시

### 📊 Analytics Dashboard (`/admin`)
- **실시간 메트릭**: 이벤트, 페이지뷰, 사용자, 세션
- **CTR/CVR 측정**: 
  - CTR = (CTA 클릭 / 페이지뷰) × 100
  - CVR = (전환 완료 / 총 세션) × 100
- **시각화**: Chart.js 기반 라인/바/파이 차트
- **전환 퍼널 분석**: 단계별 전환율, 이탈률
- **디바이스/브라우저/트래픽 소스 분석**
- **자동 새로고침**: 30초마다 실시간 업데이트

### 🎬 Hero 섹션
- YouTube Shorts 자동 회전 캐러셀
- 영상 링크 분석 기능
- **분석 결과 블러 처리 + 사전예약 유도**
- 실시간 FOMO 위젯

### 🎨 디자인
- Purple/Pink 그라데이션 테마
- 완전 반응형 (모바일/태블릿/데스크탑)
- 부드러운 애니메이션
- Tailwind CSS 기반

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Font**: Inter (Google Fonts)

### Backend & Database
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: @neondatabase/serverless
- **Tables**: 
  - `analytics_events` - 모든 이벤트
  - `page_views` - 페이지 방문
  - `conversion_funnel` - 전환 퍼널
  - `users` - 사용자 정보

### Analytics
- **Google Analytics 4**: G-FX115HN1EW
- **Custom Analytics**: 자체 이벤트 트래킹 시스템

---

## 📁 프로젝트 구조

```
parrot-kit/
├── app/
│   ├── page.tsx                    # 메인 페이지
│   ├── layout.tsx                  # 루트 레이아웃 (GA4)
│   ├── globals.css                 # 글로벌 스타일
│   ├── admin/
│   │   └── page.tsx               # 📊 Analytics Dashboard
│   └── api/
│       ├── analyze/route.ts       # 영상 분석 API
│       ├── waitlist/route.ts      # Waitlist 가입
│       ├── db-test/route.ts       # DB 연결 테스트
│       └── analytics/
│           ├── track/route.ts     # 이벤트 저장
│           ├── pageview/route.ts  # 페이지뷰 저장
│           ├── funnel/route.ts    # 퍼널 저장
│           └── stats/route.ts     # 통계 조회
├── components/
│   ├── Hero.tsx                   # 🎯 Hero + 블러 처리
│   ├── UnlockModal.tsx            # 🔒 사전예약 모달
│   ├── Pricing.tsx                # 💰 가격 플랜
│   ├── FOMOWidget.tsx             # ⏰ 카운트다운
│   ├── SocialProof.tsx            # 👥 소셜 프루프
│   ├── Problem.tsx                # 문제 제시
│   ├── HowItWorks.tsx             # 사용 방법
│   ├── OutputPreview.tsx          # 결과 미리보기
│   ├── UseCases.tsx               # 사용 사례
│   ├── WhyUs.tsx                  # 차별점
│   ├── FAQ.tsx                    # 자주 묻는 질문
│   ├── FinalCTA.tsx               # 최종 CTA
│   ├── Header.tsx                 # 헤더
│   └── Footer.tsx                 # 푸터
├── lib/
│   ├── analytics.ts               # 📈 Analytics 유틸리티
│   ├── db.ts                      # 데이터베이스 연결
│   ├── landingConfig.ts           # 설정 관리
│   ├── role.ts                    # 사용자 역할
│   └── types.ts                   # TypeScript 타입
├── scripts/
│   ├── setup-analytics.mjs        # DB 초기화 스크립트
│   └── init-analytics.sql         # SQL 스키마
├── DEPLOYMENT_GUIDE.md            # 배포 가이드
└── DATABASE_SETUP.md              # DB 설정 가이드
```

---

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/YEAAAAAAAAAAp/parrot-kit.git
cd parrot-kit
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
DATABASE_URL=postgresql://neondb_owner:password@host.neon.tech/neondb?sslmode=require
```

### 4. 데이터베이스 초기화

```bash
npm run setup:analytics
```

### 5. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 접속

---

## 📊 Analytics Dashboard 사용법

### 접속

**로컬**: http://localhost:3000/admin
**배포**: https://parrot-kit.vercel.app/admin

### 기능

#### 1. 실시간 메트릭
- **Total Events**: 전체 이벤트 수
- **Page Views**: 페이지 방문 수
- **Unique Users**: 고유 사용자
- **Sessions**: 세션 수
- **CTR**: CTA 클릭률
- **CVR**: 전환율

#### 2. 차트
- **Events Over Time**: 시간별 이벤트 추이 (라인 차트)
- **Device Breakdown**: 디바이스 분포 (파이 차트)
- **Browser Distribution**: 브라우저 분포 (바 차트)
- **Traffic Sources**: 트래픽 소스 (파이 차트)

#### 3. 테이블
- **Top Events**: 인기 이벤트 순위
- **Top Pages**: 인기 페이지 (평균 체류 시간)
- **Recent Events**: 최근 이벤트 로그

#### 4. 전환 퍼널
- 단계별 세션 수
- 전환율 (%)
- 이탈률 (%)

### 기간 필터
- Last 24 hours
- Last 7 days (기본값)
- Last 30 days
- Last 90 days

### 자동 새로고침
- 30초마다 자동 업데이트
- 토글로 on/off 가능

---

## 🎯 자동 이벤트 트래킹

다음 이벤트가 자동으로 추적됩니다:

### Hero 섹션
- `cta_click`: "Analyze" 버튼 클릭
- `link_paste_submit`: 링크 분석 시도
- `teaser_view`: 결과 표시
- `unlock_full_click`: Unlock 버튼 클릭

### Pricing 섹션
- `pricing_click`: 가격 플랜 클릭
- `pricing_view`: 플랜 조회

### FAQ
- `faq_click`: FAQ 항목 클릭

### Waitlist
- `waitlist_submit`: 폼 제출 시도
- `signup_success`: 가입 성공
- `form_submit`: 폼 제출 완료

### 페이지뷰
- `page_view`: 모든 페이지 방문 자동 추적

---

## 🔧 커스텀 설정

### `lib/landingConfig.ts`

모든 설정을 중앙에서 관리:

```typescript
export const landingConfig = {
  // 가격
  proMonthlyPrice: 29,
  teamMonthlyPrice: 99,
  foundingDropOneTimePrice: 20,
  
  // Founding Drop
  foundingDropRecipeCount: 3,
  foundingDropDeliveryHours: 48,
  foundingDropSpotsLeft: 77,
  foundingDropTotalSpots: 100,
  
  // FOMO
  creatorsJoined: '3,200+',
  earlyBirdDeadline: 'Feb 15, 2025',
  
  // 연락처
  supportEmail: 'parrotkit.contact@gmail.com',
  
  // 기타
  nextBatchDate: 'Feb 1',
  nextBatchInvites: '50',
  waitlistCount: 1247
}
```

---

## 🎨 주요 컴포넌트

### Hero.tsx - 분석 결과 블러 처리

분석 결과를 블러 처리하여 사전예약 유도:

```tsx
// 결과창에 blur-md 적용
<div className="blur-md select-none pointer-events-none">
  {/* 분석 결과 */}
</div>

// 오버레이로 Unlock 유도
<div className="absolute inset-0 ... backdrop-blur-sm">
  <button onClick={handleUnlockClick}>
    Unlock Full Recipe Now
  </button>
</div>
```

### UnlockModal.tsx - 전환 모달

**특징**:
- Founding Drop을 **FREE**로 표시 (원래 $20)
- Custom recipe (단수)
- 이메일: parrotkit.contact@gmail.com

### Analytics Dashboard

**구조**:
1. Summary Cards (6개 메트릭)
2. Charts (4개 차트)
3. Tables (Top Events, Top Pages)
4. Conversion Funnel
5. Recent Events Log

---

## 🌐 배포

### Vercel 배포

#### 1. 환경 변수 설정

Vercel Dashboard → Settings → Environment Variables:

```
Key: DATABASE_URL
Value: postgresql://neondb_owner:password@host.neon.tech/neondb?sslmode=require
Environments: ✅ Production ✅ Preview ✅ Development
```

#### 2. 재배포

Deployments → 최신 deployment → Redeploy

#### 3. 확인

- https://parrot-kit.vercel.app
- https://parrot-kit.vercel.app/admin

---

## 📈 CTR & CVR 계산 로직

### CTR (Click-Through Rate)

```typescript
CTR = (CTA 클릭 수 / 페이지뷰) × 100

// 예시: 100 페이지뷰, 5 CTA 클릭
CTR = (5 / 100) × 100 = 5%
```

### CVR (Conversion Rate)

```typescript
CVR = (전환 완료 세션 / 총 세션) × 100

// 전환 이벤트: signup_success, form_submit
// 예시: 50 세션, 10 전환
CVR = (10 / 50) × 100 = 20%
```

---

## 🔍 데이터베이스 스키마

### analytics_events
```sql
CREATE TABLE analytics_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_category VARCHAR(50),
  event_label VARCHAR(200),
  user_id VARCHAR(100),
  session_id VARCHAR(100),
  page_path VARCHAR(500),
  referrer VARCHAR(500),
  device_type VARCHAR(50),
  browser VARCHAR(50),
  country VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB
);
```

### page_views
```sql
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  session_id VARCHAR(100),
  user_id VARCHAR(100),
  referrer VARCHAR(500),
  device_type VARCHAR(50),
  duration_seconds INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### conversion_funnel
```sql
CREATE TABLE conversion_funnel (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  step VARCHAR(50) NOT NULL,
  step_order INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛠 Scripts

### `npm run dev`
개발 서버 실행 (http://localhost:3000)

### `npm run build`
프로덕션 빌드

### `npm run start`
프로덕션 서버 실행

### `npm run setup:analytics`
데이터베이스 테이블 초기화

---

## 📝 최근 변경사항

### 2026-01-08

#### Analytics Dashboard 구현
- `/admin` 페이지 생성
- CTR/CVR 실시간 측정
- Chart.js 시각화
- 전환 퍼널 분석
- 자동 이벤트 트래킹

#### Hero 섹션 개선
- 분석 결과 블러 처리
- "Unlock Full Recipe Now" 오버레이
- 사전예약 유도 최적화

#### Pricing 변경
- Founding Drop: $20 → **FREE**
- "3 custom recipes" → "Custom recipe"

#### 연락처 변경
- hello@parrotkit.com → **parrotkit.contact@gmail.com**

---

## 🐛 트러블슈팅

### 대시보드에 "Database not configured" 표시

**원인**: DATABASE_URL 환경 변수 미설정

**해결**:
1. `.env.local`에 DATABASE_URL 추가
2. 서버 재시작

### 차트가 렌더링되지 않음

**원인**: chart.js, react-chartjs-2 패키지 누락

**해결**:
```bash
npm install chart.js react-chartjs-2
```

### 빌드 에러

**원인**: Next.js 버전 호환성

**해결**:
```bash
npm install
npm run build
```

---

## 📞 연락처

- **Email**: parrotkit.contact@gmail.com
- **GitHub**: https://github.com/YEAAAAAAAAAAp/parrot-kit

---

## 📄 라이센스

Private Repository - All Rights Reserved

---

## 🎯 다음 단계

### 추천 개선 사항

1. **A/B 테스트**
   - Hero CTA 문구 테스트
   - Pricing 레이아웃 테스트

2. **고급 분석**
   - 히트맵 통합
   - 세션 리플레이

3. **자동화**
   - 주간 리포트 이메일
   - 슬랙 알림

4. **성능 최적화**
   - 이미지 최적화
   - 코드 스플리팅

---

**✨ ParrotKit으로 쇼츠 제작을 혁신하세요!**
