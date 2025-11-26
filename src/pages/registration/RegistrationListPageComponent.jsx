import React, { useEffect, useState } from 'react'
import ClassItem from './ClassItem';
// src/pages/course/mockData.js

export const MOCK_COURSES = [
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
//테스트를 위한 더미데이터입니다
const RegistrationListPageComponent = () => {
  const [classes, setClasses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('TITLE')
  const [sortType, setSortType] = useState('LATEST')
  useEffect(() => {
    setClasses(MOCK_COURSES)
  }, [])

  const fileterdClasses = classes.filter((cl)=>{
    const term = searchTerm.toLowerCase();
    if(term=='') return true;
    if(searchType=='TITLE'){
      return cl.title.toLowerCase().includes(term)
    }
    if(searchType==='INSTRUCTOR'){
      return cl.instructor.toLowerCase().includes(term)
    }
    return false;
  }) 
  return (
   <div className="max-w-5xl mx-auto p-6">
      
      <h1 className="text-3xl font-bold mb-8 border-b pb-4 border-gray-800">
        수강신청
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
        
        <div className="font-bold text-gray-700 mb-4 md:mb-0">
          총 <span className="text-blue-600">{fileterdClasses.length}</span>개 강좌
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          
          {/* 4. [추가] 검색 조건 선택 드롭다운 */}
          <select 
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="TITLE">강좌명</option>
            <option value="INSTRUCTOR">강사명</option>
          </select>

          {/* 검색어 입력창 */}
          <input
            type="text"
            placeholder="검색어를 입력하세요" // placeholder 문구 변경
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 정렬 버튼 */}
          <select 
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="LATEST">개강임박순</option>
            <option value="PRICE_ASC">낮은가격순</option>
            <option value="PRICE_DESC">높은가격순</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {fileterdClasses.length > 0 ? (
          fileterdClasses.map((course) => (
            <ClassItem key={course.id} classes={course} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

    </div>
  )
}

export default RegistrationListPageComponent








