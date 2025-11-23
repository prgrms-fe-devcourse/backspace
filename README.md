# BackSpace

백스페이스는 Windows 95, 싸이월드, 레트로 키치 미학에 영감을 받은 소셜 미니홈피 서비스입니다.
이 프로젝트는 React, TypeScript, Supabase를 사용해 브라우저에서 레트로 OS 사용 경험을 제공합니다.

## ✨ 핵심 기능

### OS 시스템

- **윈도우 창 관리**: 열기, 닫기, 최소화, 최대화, 복원
- **드래그 이동**: 타이틀 바 드래그로 자유롭게 윈도우 이동
- **태스크 바**: 열린 앱 표시, 창 포커스 전환, 시작 메뉴, 시스템 트레이에서 시간 및 테마 제어
- **바탕화면 바로가기**: 미니홈, 갤러리, 친구 등 앱을 OS에서 즉시 실행
- **라이트/다크 모드**: 시스템 테마 감지 및 로컬 스토리지를 저장 및 테마 전환

### 인증

- **이메일 & 비밀번호**: 검증을 통한 이메일 & 비밀번호 로그인 및 회원 가입
- **소셜 로그인**: Google, GitHub, Kakao 소셜 로그인

### 미니홈

- **홈**: 프로필, 소개, 최근 사진, 최신 게시물 및 친구 요청
- **갤러리**: 사진 업로드, 조회, 수정, 삭제 및 좋아요와 댓글
- **메모**: 게시글 작성, 조회, 수정, 삭제 및 좋아요와 댓글
- **방명록**: 방명록 작성, 답글 및 삭제

### 친구

- **사용자 검색**: 닉네임, 이메일로 사용자 검색
- **친구 요청**: 친구 요청 확인, 수락, 거절
- **친구 목록**: 친구 목록 및 미니홈 방문, 친구 삭제

## 👥 팀 & 기여도

**이서진**:

- 아이디어/기획, 디자인, UI/UX
- 프로젝트 설정 및 아키텍처 설계, 디자인 시스템 설계
- OS 시스템 및 윈도우 관련 로직, 윈도우 탭 전환 로직
- 태스크 바 시작 메뉴 및 테마 제어, 테마 컨텍스트
- 미니홈: 방명록 탭
- 친구: 사용자 검색/친구 요청
- 아바타/인풋/텍스트아레아/로더 컴포넌트
- QA 및 디버깅

**김지호**:

- 데이터베이스 설계 및 관리
- 바탕화면 페이지
- 태스크 바 관련 로직, 바탕화면 및 태스크 바 연동 로직
- 커스텀 스크롤 바
- 미니홈: 갤러리 관련 로직 전부
- 친구: 친구 목록
- 라운드 탭/컨테이너 컴포넌트
- QA 및 디버깅

**정진환**:

- 로그인 및 회원가입 페이지
- Auth 검증 및 관련 로직 설계
- 타이틀바/버튼/체크박스 컴포넌트
- 미니홈: 메모 관련 로직 전부
- 시연 영상 제작 및 발표

**김수연**:

- 미니홈: 홈
- PPT

## 📂 프로젝트 구조

`src` 폴더는 기능과 특징별로 정리:

```
src
├── assets/         # Fonts, icons, logos, and other static assets
├── components/     # Reusable, un-opinionated UI components (Button, Input)
├── contexts/       # React contexts (ThemeContext)
├── features/       # Domain-specific application features (friends, minihome)
├── hooks/          # Custom React hooks (useDraggable, useAuthUser)
├── layouts/        # Layout components for page structure (AuthLayout)
├── os/             # Components for the OS UI shell (Window, Taskbar, Shortcut)
├── pages/          # Top-level page components (Auth pages, OS main)
├── router/         # Routing logic (ProtectedRoute, PublicRoute)
├── stores/         # Zustand global state stores (useAuthStore, useWindowStore)
├── styles/         # Global CSS, fonts, and Tailwind utilities
└── utils/          # Utility functions (Supabase client setup)

```
