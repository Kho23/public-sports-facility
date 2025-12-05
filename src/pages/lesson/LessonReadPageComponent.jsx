import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneLesson } from '../../api/classApi';
import { registrationById } from '../../api/memberApi';
import useCustomMove from '../../hooks/useCustomMove';
import { Calendar, Clock, User, MapPin, AlignLeft, CheckCircle, AlertCircle } from 'lucide-react';

const LessonReadPageComponent = () => {
  const [lesson, setLesson] = useState(null); // 초기값 null로 변경 (로딩 처리 위해)
  const { id } = useParams();
  const { moveToLessonList } = useCustomMove();
  const navigate = useNavigate();

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneLesson(id);
        // 이미 신청된 강의일 경우 처리
        if (data.registered === true) {
          alert("이미 신청된 강의입니다. 강의 상세내역은 마이페이지-예약내역 조회-수강신청 목록에서 확인해주세요.");
          moveToLessonList();
        }
        setLesson(data);
      } catch (err) {
        console.error("데이터 로딩 실패", err);
      }
    };
    getOne();
  }, [id]);

  const handleClickRegister = async () => {
    if (!window.confirm("이 강의를 수강 신청하시겠습니까?")) return;

    try {
      await registrationById(id);
      alert("수강 신청이 완료되었습니다! 🎉");
      moveToLessonList();
    } catch (error) {
      alert("신청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  // 데이터 로딩 중일 때 표시
  if (!lesson) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">강의 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-6">
          홈 &gt; 수강신청 &gt; 강좌상세
        </nav>

        {/* Page Title Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide
                        ${lesson.category === 'GOLF' ? 'bg-green-100 text-green-700' : 
                          lesson.category === 'FUTSAL' ? 'bg-blue-100 text-blue-700' : 
                          'bg-cyan-100 text-cyan-700'}`}>
                        {lesson.category === 'GOLF' ? 'GOLF' : lesson.category === 'FUTSAL' ? 'FUTSAL' : 'SWIMMING'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border
                        ${lesson.status === 'ACCEPTED' ? 'border-blue-900 text-blue-900' : 'border-gray-400 text-gray-400'}`}>
                        {lesson.status === 'ACCEPTED' ? '접수중' : '마감'}
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
            </div>
        </div>

        {/* Main Content Box */}
        <div className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 pb-3 mb-5 border-b border-gray-300 flex items-center gap-2">
             <CheckCircle className="w-5 h-5 text-blue-900" />
             강좌 상세 정보
          </h2>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            
            <div className="flex items-start gap-3">
               <div className="mt-1 bg-gray-100 p-2 rounded-lg text-gray-600">
                   <User className="w-5 h-5" />
               </div>
               <div>
                   <p className="text-sm font-bold text-gray-500 mb-1">강사명</p>
                   <p className="text-gray-900 font-semibold text-lg">{lesson.partnerName || '정보 없음'}</p>
               </div>
            </div>

            <div className="flex items-start gap-3">
               <div className="mt-1 bg-gray-100 p-2 rounded-lg text-gray-600">
                   <MapPin className="w-5 h-5" />
               </div>
               <div>
                   <p className="text-sm font-bold text-gray-500 mb-1">장소/시설</p>
                   <p className="text-gray-900 font-semibold text-lg">
                       {lesson.facilityType || '시설 정보'} 
                       <span className="text-sm font-normal text-gray-500 ml-2">({lesson.category})</span>
                   </p>
               </div>
            </div>

            <div className="flex items-start gap-3">
               <div className="mt-1 bg-gray-100 p-2 rounded-lg text-gray-600">
                   <Calendar className="w-5 h-5" />
               </div>
               <div>
                   <p className="text-sm font-bold text-gray-500 mb-1">교육 기간 & 요일</p>
                   <p className="text-gray-900 font-medium">
                       {lesson.startDate} ~ {lesson.endDate}
                   </p>
                   <p className="text-blue-900 font-bold text-sm mt-1">
                       매주 {Array.isArray(lesson.days) ? lesson.days.join(', ') : lesson.days}
                   </p>
               </div>
            </div>

            <div className="flex items-start gap-3">
               <div className="mt-1 bg-gray-100 p-2 rounded-lg text-gray-600">
                   <Clock className="w-5 h-5" />
               </div>
               <div>
                   <p className="text-sm font-bold text-gray-500 mb-1">교육 시간</p>
                   <p className="text-gray-900 font-semibold text-lg">
                       {lesson.startTime?.substring(0, 5)} ~ {lesson.endTime?.substring(0, 5)}
                   </p>
               </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                  <AlignLeft className="w-5 h-5 text-gray-600" />
                  <h3 className="text-md font-bold text-gray-900">강의 소개</h3>
              </div>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm min-h-[100px]">
                {lesson.description || "등록된 강의 소개 내용이 없습니다."}
              </div>
          </div>
          
          <div className="flex items-start gap-2 mt-4 text-xs text-gray-500">
             <AlertCircle className="w-4 h-4 mt-0.5" />
             <p>수강 취소는 개강 3일 전까지만 가능하며, 이후 취소 시 위약금이 발생할 수 있습니다.</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pb-20">
            <button 
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-colors h-[48px]"
            >
                목록으로
            </button>

            <button 
                onClick={handleClickRegister}
                disabled={lesson.status !== 'ACCEPTED'}
                className={`px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all h-[48px] flex items-center gap-2
                    ${lesson.status === 'ACCEPTED' 
                        ? 'bg-blue-900 hover:bg-blue-800' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
            >
                {lesson.status === 'ACCEPTED' ? (
                    <>
                        <span>수강 신청하기</span>
                        <CheckCircle className="w-4 h-4" />
                    </>
                ) : '신청 마감'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default LessonReadPageComponent;