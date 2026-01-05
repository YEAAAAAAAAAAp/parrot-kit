# 🚀 Analytics Dashboard 배포 가이드

## ✅ 구현 완료 사항

### 1. Analytics Dashboard (`/admin`)
- ✅ CTR/CVR 실시간 측정
- ✅ 이벤트 트래킹 (CTA 클릭, 폼 제출, 페이지뷰 등)
- ✅ 전환 퍼널 분석
- ✅ Chart.js 시각화 (라인, 바, 파이 차트)
- ✅ 디바이스/브라우저 분석
- ✅ 트래픽 소스 분석

### 2. 자동 이벤트 트래킹
- ✅ Hero CTA 클릭
- ✅ Pricing 플랜 클릭
- ✅ FAQ 클릭
- ✅ Waitlist 폼 제출
- ✅ 페이지뷰 자동 추적

### 3. API 엔드포인트
- `/api/analytics/track` - 이벤트 저장
- `/api/analytics/pageview` - 페이지뷰 저장
- `/api/analytics/funnel` - 전환 퍼널 저장
- `/api/analytics/stats` - 대시보드 데이터 조회

---

## 🔧 Vercel 배포 설정 (필수!)

### Step 1: Vercel 환경 변수 추가

**Vercel Dashboard → parrot-kit 프로젝트 → Settings → Environment Variables**

다음 환경 변수를 추가하세요:

```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_nUGSYC1gM6QD@ep-quiet-cake-aeqe9mc1-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
Environments: ✅ Production, ✅ Preview, ✅ Development
```

### Step 2: 재배포

환경 변수 추가 후 **Deployments** 탭에서:
- 최신 deployment 선택
- **⋯** 메뉴 클릭
- **Redeploy** 선택

---

## 📊 배포 후 확인

배포 완료 후 다음 URL에서 대시보드 확인:

**https://parrot-kit.vercel.app/admin**

### 예상 결과:
- ✅ 대시보드가 정상적으로 로드됨
- ✅ CTR/CVR 메트릭 표시 (초기값 0)
- ✅ 차트 렌더링
- ✅ 실시간 이벤트 트래킹 시작

---

## 🔍 트러블슈팅

### 1. "Database not configured" 메시지가 표시되는 경우
→ Vercel 환경 변수 `DATABASE_URL` 확인
→ 재배포 필요

### 2. 데이터베이스 연결 오류
→ Neon 데이터베이스가 활성화되어 있는지 확인
→ Connection String이 정확한지 확인

### 3. 차트가 렌더링되지 않는 경우
→ 브라우저 콘솔 확인
→ chart.js, react-chartjs-2 패키지 설치 확인 (`npm install` 실행)

---

## 📈 사용법

### 대시보드 접속
```
https://parrot-kit.vercel.app/admin
```

### 이벤트 자동 추적
- 사용자가 사이트를 방문하면 자동으로 이벤트가 기록됨
- 별도 설정 불필요

### 기간 필터
- 대시보드 우측 상단에서 1일/7일/30일/90일 선택 가능

### 자동 새로고침
- 30초마다 자동 업데이트 (토글 가능)

---

## 💡 추가 정보

### 로컬 개발 환경 설정

```bash
# 1. .env.local 파일에 DATABASE_URL 추가
DATABASE_URL=postgresql://neondb_owner:npg_nUGSYC1gM6QD@ep-quiet-cake-aeqe9mc1-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require

# 2. 데이터베이스 테이블 생성 (최초 1회)
npm run setup:analytics

# 3. 개발 서버 실행
npm run dev

# 4. 대시보드 접속
# http://localhost:3000/admin
```

### 데이터베이스 구조

3개 테이블 자동 생성됨:
- `analytics_events` - 모든 이벤트 (클릭, 액션 등)
- `page_views` - 페이지 방문 기록
- `conversion_funnel` - 전환 퍼널 단계

---

## 🎯 주요 메트릭

### CTR (Click-Through Rate)
```
CTR = (CTA 클릭 수 / 페이지뷰) × 100
```

### CVR (Conversion Rate)
```
CVR = (전환 완료 세션 / 총 세션) × 100
```

전환 이벤트:
- `signup_success`
- `form_submit`
- `waitlist_submit`

---

## 📞 문의

문제가 발생하면 다음 파일 확인:
- `app/api/analytics/stats/route.ts` - API 로직
- `app/admin/page.tsx` - 대시보드 UI
- `lib/analytics.ts` - 트래킹 유틸리티

---

**✨ 배포 후 바로 사용 가능합니다!**
