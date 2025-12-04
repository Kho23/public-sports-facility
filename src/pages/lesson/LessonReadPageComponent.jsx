import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneLesson } from '../../api/classApi';
import { registrationById } from '../../api/memberApi';
import useCustomMove from '../../hooks/useCustomMove';

const LessonReadPageComponent = () => {
  const [lesson, setLesson] = useState(null) // 초기값 null로 변경 (로딩 처리 위해)
  const { id } = useParams();
  const {moveToLessonList}=useCustomMove()
  const navigate = useNavigate();

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneLesson(id);
        setLesson(data)
      } catch (err) {
        console.error("데이터 로딩 실패", err)
      }
    };
    getOne()
  }, [id]);

  const handleClickRegister = async () => {

    try {
      await registrationById(id)
      alert("수강 신청이 완료되었습니다! 🎉")
      moveToLessonList()
    } catch (error) {
      alert("신청 중 오류가 발생했습니다.")
      console.error(error)
    }
  }

  // 데이터 로딩 중일 때 표시
  if (!lesson) {
    return <div className="p-10 text-center text-gray-500">강의 정보를 불러오는 중입니다...</div>
  }

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      {/* 1. 상단 카드 (제목 및 기본 정보) */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* 헤더 영역 */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold mb-3 tracking-wide">
                {lesson.category === 'GOLF' ? '⛳ 골프' : lesson.category === 'FUTSAL' ? '⚽ 풋살' : '🏊 수영'}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                {lesson.title}
              </h1>
              <p className="text-gray-500 text-sm">강의 번호: #{id}</p>
            </div>
            {/* 상태 뱃지 */}
            <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                lesson.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
            }`}>
                {lesson.status === 'ACCEPTED' ? '접수중' : '마감됨'}
            </div>
          </div>
        </div>

        {/* 2. 상세 정보 그리드 */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            
            {/* 강사 정보 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                🧑‍🏫
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Instructor</p>
                <p className="font-semibold text-gray-800 text-lg">{lesson.partnerName || '강사 정보 없음'}</p>
              </div>
            </div>

            {/* 기간 정보 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                🗓
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Period</p>
                <p className="font-semibold text-gray-800">
                  {lesson.startDate} ~ {lesson.endDate}
                </p>
              </div>
            </div>

            {/* 시간 정보 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                ⏰
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Time</p>
                <p className="font-semibold text-gray-800">
                  {lesson.startTime?.substring(0,5)} - {lesson.endTime?.substring(0,5)}
                </p>
              </div>
            </div>

             {/* 요일 정보 (데이터가 배열이라 가정) */}
             <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Days</p>
                <p className="font-semibold text-gray-800">
                   {/* 배열이 아닐 경우를 대비한 안전 장치 */}
                   {Array.isArray(lesson.days) ? lesson.days.join(', ') : lesson.days}
                </p>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <hr className="my-8 border-gray-100" />

          {/* 3. 강의 설명/내용 영역 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">강의 소개</h3>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-xl">
              {lesson.description || "등록된 강의 소개 내용이 없습니다."}
            </div>
          </div>
        </div>

        {/* 4. 하단 액션 버튼 (신청하기) */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-end gap-3">
            <button 
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
            >
                뒤로가기
            </button>

            <button 
                onClick={handleClickRegister}
                disabled={lesson.status !== 'ACCEPTED'} // 접수중이 아니면 비활성화
                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5
                    ${lesson.status === 'ACCEPTED' 
                        ? 'bg-black hover:bg-gray-800 hover:shadow-xl' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                {lesson.status === 'ACCEPTED' ? '수강 신청하기' : '신청 마감'}
            </button>
        </div>

      </div>
    </div>
  )
}

export default LessonReadPageComponent