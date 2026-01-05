# Analytics Dashboard Setup Guide

## 🚀 설치 및 실행

### 1. 패키지 설치
```bash
npm install
```

### 2. 데이터베이스 초기화
Neon 콘솔에서 SQL 스크립트 실행:
```bash
# scripts/init-analytics.sql 내용을 Neon SQL Editor에서 실행
```

또는 터미널에서:
```bash
psql $DATABASE_URL -f scripts/init-analytics.sql
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 📊 대시보드 접속

관리자 대시보드: `http://localhost:3000/admin`

## ✨ 기능

### 1. **실시간 메트릭**
- 총 이벤트 수
- 페이지 뷰
- 고유 사용자 수
- 세션 수
- **CTR (Click-Through Rate)**: CTA 클릭 / 페이지 뷰
- **CVR (Conversion Rate)**: 전환 / 총 세션

### 2. **시각화 차트**
- 시간별 이벤트 추이 (라인 차트)
- 디바이스 분포 (파이 차트)
- 브라우저 분포 (바 차트)
- 트래픽 소스 (파이 차트)

### 3. **이벤트 트래킹**
자동으로 추적되는 이벤트:
- `cta_click`: CTA 버튼 클릭
- `button_click`: 일반 버튼 클릭
- `pricing_click`: 가격 플랜 클릭
- `faq_click`: FAQ 항목 클릭
- `form_start`: 폼 작성 시작
- `form_submit`: 폼 제출
- `section_view`: 섹션 노출
- `link_click`: 링크 클릭

### 4. **전환 퍼널**
사용자 여정 추적:
1. 페이지 방문
2. 서비스 탐색
3. Waitlist 가입
4. 결제 완료

각 단계별 전환율과 이탈률 표시

### 5. **상세 분석**
- 인기 이벤트 순위
- 인기 페이지 순위 (평균 체류 시간 포함)
- 최근 이벤트 로그 (실시간)
- 리퍼러 소스 분석

## 🔧 커스텀 이벤트 추가

### 컴포넌트에서 이벤트 트래킹
```typescript
import { analytics } from '@/lib/analytics'

// CTA 클릭
analytics.trackCTAClick('Hero Section', 'Try Now')

// 버튼 클릭
analytics.trackButtonClick('Download', 'Features Section')

// 섹션 노출
analytics.trackSectionView('Pricing')

// 가격 플랜 클릭
analytics.trackPricingClick('Pro Plan', 29)

// 폼 제출
analytics.trackFormSubmit('Contact Form', true)

// FAQ 클릭
analytics.trackFAQClick('How does it work?')
```

### 커스텀 이벤트
```typescript
import { trackEvent } from '@/lib/analytics'

trackEvent({
  eventName: 'custom_event',
  eventCategory: 'engagement',
  eventLabel: 'Custom Action',
  metadata: {
    key1: 'value1',
    key2: 'value2'
  }
})
```

### 퍼널 단계 추적
```typescript
import { trackFunnelStep } from '@/lib/analytics'

// 단계 1: 랜딩
trackFunnelStep('landing', 1, true)

// 단계 2: 서비스 탐색
trackFunnelStep('explore_service', 2, true)

// 단계 3: 가입 완료
trackFunnelStep('signup_complete', 3, true)
```

## 📈 CTR & CVR 계산

### CTR (Click-Through Rate)
```
CTR = (CTA 클릭 수 / 페이지 뷰) × 100
```

대시보드에서 자동 계산되어 표시됩니다.

### CVR (Conversion Rate)
```
CVR = (전환 완료 세션 / 총 세션) × 100
```

전환 이벤트:
- `signup_success`
- `form_submit` (completed=true)
- `purchase_complete`

## 🛠 트러블슈팅

### 데이터가 표시되지 않는 경우
1. 데이터베이스 테이블이 생성되었는지 확인
2. `.env` 파일에 `DATABASE_URL` 설정 확인
3. 브라우저 콘솔에서 에러 확인

### 차트가 렌더링되지 않는 경우
```bash
npm install chart.js react-chartjs-2
```

### API 에러 발생 시
- Neon 데이터베이스 연결 상태 확인
- API 라우트 권한 확인
- 서버 로그 확인

## 🔐 보안

현재는 기본 구현이며, 프로덕션에서는 다음이 필요합니다:

1. **관리자 인증**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 인증 체크
  }
}
```

2. **API 보호**
```typescript
// app/api/analytics/stats/route.ts
// 관리자 토큰 또는 세션 확인
```

3. **Rate Limiting**
```typescript
// 너무 많은 요청 방지
```

## 📱 모바일 대응

대시보드는 반응형으로 구현되어 있습니다:
- 모바일: 1열 레이아웃
- 태블릿: 2열 레이아웃
- 데스크톱: 다중 열 레이아웃

## 🎯 다음 단계

1. **A/B 테스트 추가**
2. **실시간 알림 설정**
3. **히트맵 통합**
4. **목표 설정 및 추적**
5. **리포트 자동 생성**

## 💡 팁

- 자동 새로고침 활성화로 실시간 모니터링
- 기간 필터로 원하는 기간 분석
- CSV 내보내기 기능 추가 가능
- 커스텀 대시보드 뷰 생성 가능
