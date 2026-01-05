## 🚀 빠른 시작 가이드

### DATABASE_URL 설정하기

`.env.local` 파일에 Neon 데이터베이스 URL을 추가하세요:

```bash
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

### Neon 데이터베이스가 없다면?

1. **Neon 가입**: https://console.neon.tech
2. **새 프로젝트 생성**
3. **Connection String 복사**
4. `.env.local`에 붙여넣기

### 데이터베이스 초기화

```bash
npm run setup:analytics
```

### 서버 실행

```bash
npm run dev
```

### 대시보드 접속

http://localhost:3000/admin

---

## ⚠️ DATABASE_URL이 없으면?

지금 당장 테스트하고 싶다면, 무료 Neon 데이터베이스를 5분 안에 만들 수 있습니다:

1. https://console.neon.tech 접속
2. "Sign up" (GitHub 계정으로 가능)
3. 새 프로젝트 생성
4. Connection String 복사
5. `.env.local`에 붙여넣기
6. `npm run setup:analytics` 실행

완료!
