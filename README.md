# 🏟️ 공공 체육시설 예약 서비스 (Public Sports Facility)

> **전 연령대를 위한 시/구 운영 복합문화 체육시설 웹 서비스**<br>
> **개발 기간:** 2025.10.27 ~ 2026.01.12 (약 12주)<br>
> **팀원:** 3명

<br>

## 🛠️ Tech Stack

### Backend
<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=SpringBoot&logoColor=white"/> <img src="https://img.shields.io/badge/JPA-6DB33F?style=flat&logo=Hibernate&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>

### Frontend
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white"/>

### Infra & Tools
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/GitKraken-179287?style=flat&logo=GitKraken&logoColor=white"/> <img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/> <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/>

<br>

## 🏛️ System Architecture & ERD
<img width="100%" alt="System Architecture" src="https://github.com/user-attachments/assets/f90fdbda-3bbe-42bc-9ab0-2d6a40fd742b" />

<br>

## 📌 Key Features (핵심 기능)
* **회원가입/로그인:** JWT 기반 인증, 회원가입 & 아이디/비밀번호 찾기 이메일 인증
* **시설 예약:** 날짜 및 시간대별 실시간 예약 가능 여부 조회
* **결제 시스템:** 포트원 API 연동 결제 및 환불
* **관리자 페이지:** 회원 관리, 예약 현황 대시보드 제공

<br>

## 👨‍💻 My Contribution (담당 역할)
**Full Stack Developer (기여도: 100%)**
기획 단계부터 DB 설계, 백엔드 API 개발, 프론트엔드 API 구현까지 **웹 서비스의 전 과정을 주도적으로 개발**했습니다.

* **Frontend (React)**
    * **State Management:** React Hooks(useState, useEffect)를 사용하여 예약 상태 및 회원 정보를 관리했습니다.
    * **API Integration:** Axios를 사용하여 백엔드 서버와 데이터를 비동기로 주고받으며 화면을 동적으로 구성했습니다.

* **Backend (Spring Boot)**
    * **RESTful API 설계:** 프론트엔드 요구사항에 맞춰 필요한 API(예약, 조회, 회원가입)를 직접 설계하고 개발했습니다.
    * **Database Design:** 서비스 흐름에 맞는 테이블(회원, 수강신청, 시설)을 설계하고, JPA로 데이터를 관리했습니다.
    * **Spring Security Custom:** 보안 관리를 공부해보고 싶어 보안 관련 인터페이스를 직접 구현했습니다. 

* **Integration & Deployment**
    * 프론트엔드와 백엔드 간의 데이터 통신 규격을 정의하고, 통합 테스트를 통해 서비스 동작을 검증했습니다.

<br>

## 💥 Troubleshooting & Refactoring (문제 해결 및 개선)

### 1. 보안 구조 개선: 어노테이션 기반에서 필터 기반 인증으로 변경
* **문제(As-Is):** 초기에는 컨트롤러 메서드마다 `@PreAuthorize`를 붙여 권한을 검사했으나, 개발 과정에서 누락될 위험이 있었고 코드가 반복되는 문제가 있었습니다.
* **해결(To-Be):** **Spring Security Filter Chain** 단계에서 요청을 가로채도록 구조를 변경했습니다.
    * 요청이 컨트롤러(Servlet)에 도달하기 전에 인증/인가를 처리하여 보안성을 높였습니다.
    * `SecurityConfig`에서 URL 패턴별 권한을 중앙 집중적으로 관리하여 유지보수 효율을 높였습니다.

### 2. Frontend Axios 인터셉터 도입 및 이중 검증 구조 구축
* **문제(As-Is):** API 요청마다 헤더에 토큰을 직접 넣는 코드를 반복 작성(`axiosClient`)하여 생산성이 떨어지고, 토큰 만료 처리가 번거로웠습니다.
* **해결(To-Be):** **Axios Interceptor**를 도입하여 전역(`index.js`)에서 요청과 응답을 가로채도록 개선했습니다.
    * **Request:** 모든 요청 시 자동으로 JWT 토큰을 헤더에 주입하도록 설정.
    * **Response:** 응답 시 토큰 유효성을 검사하여 만료 시 자동 로그아웃 처리.
    * **결과:** 클라이언트(Interceptor)와 서버(Security Filter) 양측에서 검증하는 **이중 보안 벽(Double Barrier)**을 구축했습니다.

### 3. 외부 API(포트원) 연동을 위한 DB 스키마 재설계
* **문제:** 결제 시스템 연동 중, 기존 DB의 데이터 타입(ID, 금액 등)과 포트원 API가 요구하는 데이터 규격이 달라 결제 검증이 실패하는 문제 발생.
* **해결:** 외부 API 명세서를 분석하여 데이터 타입 불일치를 해결하도록 **ERD를 재설계 및 마이그레이션** 진행.
    * 기존 `Integer`로 설정된 주문 번호를 UUID 등을 수용할 수 있는 `String(Varchar)` 타입 등으로 변경하여 데이터 정합성을 확보했습니다.

<br>

## ⚙️ 실행 방법 (Installation & Run)

### Backend
프로젝트 루트 디렉토리에서 아래 명령어를 실행하세요.

**Mac / Linux:**
```bash
cd backend
./gradlew bootRun
```
**Windows**
```bash
cd backend
gradlew bootRun
```

### Frontend
의존성 설치 후 프로젝트를 실행합니다.
```bash
cd frontend
npm install
npm start
```

## 📂 Project Structure
이 레포지토리는 모노레포 구조로 구성되어 있습니다.
```text
root
├── backend/    # Spring Boot Server
└── frontend/   # React Client
```
