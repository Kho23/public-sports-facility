# 🏟️ 공공 체육시설 예약 서비스 (Public Sports Facility)

> **누구나 쉽고 공정하게 체육시설을 예약할 수 있는 웹 서비스** > **개발 기간:** 2025.10.27 ~ 2026.01.12 (약 12주)  
> **팀원:** 3명

<br>

## 🛠️ Tech Stack

### Backend
<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=SpringBoot&logoColor=white"/> <img src="https://img.shields.io/badge/JPA-6DB33F?style=flat&logo=Hibernate&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>

### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white"/>

### Infra & Tools
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>

<br>

## 🏛️ System Architecture & ERD
*(여기에 ERD 이미지나 시스템 아키텍처 다이어그램 이미지를 꼭 넣으세요. 백엔드 필수!)*
<img width="1192" height="502" alt="image" src="https://github.com/user-attachments/assets/f90fdbda-3bbe-42bc-9ab0-2d6a40fd742b" />


<br>

## 📌 Key Features (핵심 기능)
* **회원가입/로그인:** JWT 기반 인증, 회원가입 & 아이디/비밀번호 찾기 이메일 인증
* **시설 예약:** 날짜 및 시간대별 실시간 예약 가능 여부 조회
* **결제 시스템:** 포트원 API 연동 결제 및 환불
* **관리자 페이지:** 회원 관리, 예약 현황 대시보드 제공

<br>

## 👨‍💻 My Contribution (담당 역할)
**Backend Developer (기여도: 50%)**
* **DB 설계:** 정규화를 고려한 ERD 설계 및 연관관계 매핑
* **API 개발:** RESTful API 설계, 예약 로직 구현 (동시성 제어 고려)
* **보안:** Spring Security & JWT를 이용한 인증/인가 필터 구현

<br>

## 💥 Troubleshooting (문제 해결 경험)
*(면접관이 가장 자세히 보는 구간입니다. 1~2개 정도 굵직한 것을 적으세요)*

### 1. 예약 동시성 이슈 해결
* **문제 상황:** 인기 시설 예약 시, 동시에 여러 요청이 들어오면 중복 예약이 발생하는 문제.
* **원인:** DB의 격리 수준과 Race Condition 발생.
* **해결:** 비관적 락(Pessimistic Lock)을 적용하여 데이터 무결성 보장. (또는 낙관적 락/Redis 등 본인이 쓴 방법)
* **결과:** JMeter 테스트 결과 동시 요청 100건 중 중복 예약 0건 달성.

### 2. N+1 문제 최적화
* **문제:** 시설 목록 조회 시 연관된 이미지 테이블을 계속 조회하여 쿼리가 과도하게 발생.
* **해결:** JPQL의 `Fetch Join`을 사용하여 한 번의 쿼리로 데이터 조회.

<br>
How To Start 
Backend
cd backend
./gradlew bootRun

Frontend 
cd frontend
npm install
npm start

## 📂 Project Structure
이 레포지토리는 모노레포 구조로 구성되어 있습니다.
```text
root
├── backend/    # Spring Boot Server
└── frontend/   # React Client

### 💡 작성 꿀팁 (백엔드 개발자 이건호님 맞춤)

1.  **ERD는 무조건 넣으세요:**
    * 백엔드 개발자에게 DB 설계 능력은 필수입니다. 캡처해서 이미지를 올리세요. `assets` 폴더를 하나 만들어서 거기에 이미지를 넣고 링크를 걸면 됩니다.
2.  **트러블 슈팅을 구체적으로:**
    * 단순히 "버그를 고쳤다"가 아니라 **"어떤 문제가 있었고 -> 원인은 무엇이었으며 -> 어떤 기술적 근거로 해결했고 -> 결과가 어땠다"**의 구조(STAR 기법)로 쓰세요.
3.  **지금 구조 설명:**
    * 방금 `backend`와 `frontend` 폴더로 나누었으니, "Project Structure" 부분에서 이를 명시해 주면 코드를 보러 온 사람이 헷갈리지 않습니다.

작성하시다가 "이 내용을 넣어도 될까?" 고민되거나, 트러블 슈팅 내용을 어떻게 글로 다듬을지 막막하면 저에게 대략적인 내용만 던져주세요. 제가 매끄럽게 다듬어 드릴게요!
