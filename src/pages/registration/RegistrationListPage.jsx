import React from 'react'
import RegistrationPageComponent from './RegistrationListPageComponent'

const MOCK_COURSES = [
  {
    id: 1,
    category: "GOLF",
    title: "어르신을 위한 초보 골프반",
    instructor: "이건호 강사",
    target: "노인", // 와이어프레임에 있던 대상
    days: "토",
    time: "10:00 ~ 11:00",
    price: 300000,
    startDate: "2025-11-25",
    endDate: "2026-01-20",
    status: "OPEN", // OPEN(접수중), CLOSING_SOON(마감임박), FULL(마감)
    capacity: 20,
    currentCount: 5,
  },
  {
    id: 2,
    category: "FUTSAL",
    title: "어린이 초급 풋살반",
    instructor: "전재석 강사",
    target: "어린이",
    days: "월, 수",
    time: "18:00 ~ 19:00",
    price: 500000,
    startDate: "2025-12-01",
    endDate: "2026-02-20",
    status: "CLOSING_SOON",
    capacity: 15,
    currentCount: 13,
  },
  {
    id: 3,
    category: "SWIM",
    title: "직장인 저녁 수영반",
    instructor: "김물개 강사",
    target: "성인",
    days: "화, 목",
    time: "19:00 ~ 20:00",
    price: 250000,
    startDate: "2025-11-01",
    endDate: "2026-01-30",
    status: "FULL",
    capacity: 20,
    currentCount: 20,
  },
];
const RegistrationListPage = () => {
  return (
    <div>
      <RegistrationPageComponent/>
    </div>
  )
}

export default RegistrationListPage
