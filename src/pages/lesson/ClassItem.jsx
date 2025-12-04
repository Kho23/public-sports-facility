import React, { useState } from 'react'
import { checkRegistration } from '../../api/classApi'
import useCustomMove from '../../hooks/useCustomMove';
import { useSelector } from 'react-redux';

const ClassItem = ({ classes }) => {
    const {moveToLessonDetail, moveToLogin} = useCustomMove()
    const [isRegistered, setIsRegistered] = useState(false);
    const { isLoggedIn} = useSelector((state) => state.auth);
    const handleClick =async (id) => {
        try {
            if(!isLoggedIn){
                alert("로그인이 필요한 서비스입니다. 먼저 로그인 해주세요.")
                moveToLogin()
            }
            console.log(id)
            const data = await checkRegistration(id)
            console.log(data)
            if(data){
                alert("이미 신청된 강의입니다.")
                return;
            }
            setIsRegistered(data)
            moveToLessonDetail(id)
        } catch (error) {
            console.log("실행중 에러 발생",error)
        }

    }
    const getClassStatus = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">접수중</span>;
            case 'PENDING':
                return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">개설 대기중</span>;
            default: return null;
        }
    }
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-4 flex justify-between items-center hover:shadow-md transition-shadow">

            {/* 왼쪽: 강좌 정보 영역 */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    {/* 카테고리 뱃지 */}
                    <span className="text-blue-600 font-bold">[{classes.category === 'GOLF' ? '골프' : classes.category === 'FUTSAL' ? '풋살' : '수영'}]</span>

                    {/* 개강일 표시 */}
                    <span className="text-gray-500 text-sm">{classes.startDate.replaceAll('-', '.').substring(5)} 개강</span>

                    {/* 접수 상태 뱃지 */}
                    {getClassStatus(classes.status)}
                </div>

                {/* 강좌 제목 & 대상 */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {classes.title} <span className="text-gray-500 text-sm font-normal">({classes.level})</span>
                </h3>

                {/* 상세 정보 (시간, 가격, 기간, 강사) */}
                <div className="text-gray-600 text-sm space-y-1 mt-3">
                    <p>🗓 <strong>기간:</strong> {classes.startDate} ~ {classes.endDate}</p>
                    <p>📅 <strong>요일:</strong> {classes.days.join(", ")}</p>
                    <p>📅 <strong>시간:</strong> {classes.startTime.substring(0, 5)}~{classes.endTime.substring(0, 5)}</p>
                    <p>🧑‍🏫 <strong>강사:</strong> {classes.partnerName}</p>
                </div>
            </div>

            {/* 오른쪽: 버튼 영역 */}
            <div className="ml-4 flex flex-col items-end">
                {classes.status !== 'ACCEPTED' ? (
                    <button
                        disabled
                        className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-bold cursor-not-allowed"
                    >
                        마감되었습니다
                    </button>
                ) : (
                    <button
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                        onClick={() => handleClick(classes.lessonId)}
                    >
                        신청하러 가기
                    </button>
                )}
            </div>
        </div>
    )
}

export default ClassItem;   
