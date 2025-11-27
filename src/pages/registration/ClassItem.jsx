import React from 'react'

const ClassItem = ({ classes }) => {
    const getClassStatus = (status) => {
        switch (status) {
            case 'OPEN':
                return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">접수중</span>;
            case 'CLOSE':
                return <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">마감</span>;
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
                    {classes.title} <span className="text-gray-500 text-sm font-normal">({classes.target})</span>
                </h3>

                {/* 상세 정보 (시간, 가격, 기간, 강사) */}
                <div className="text-gray-600 text-sm space-y-1 mt-3">
                    <p>📅 <strong>시간:</strong> {classes.days} {classes.time}</p>
                    <p>💰 <strong>수강료:</strong> {classes.price.toLocaleString()}원 (1인 기준)</p>
                    <p>🗓 <strong>기간:</strong> {classes.startDate} ~ {classes.endDate}</p>
                    <p>🧑‍🏫 <strong>강사:</strong> {classes.instructor}</p>
                </div>
            </div>

            {/* 오른쪽: 버튼 영역 */}
            <div className="ml-4 flex flex-col items-end">
                {classes.status === 'FULL' ? (
                    <button
                        disabled
                        className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-bold cursor-not-allowed"
                    >
                        마감되었습니다
                    </button>
                ) : (
                    <button
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                        onClick={() => alert(`${classes.title} 신청 페이지로 이동합니다.`)}
                    >
                        신청하러 가기
                    </button>
                )}
            </div>
        </div>
    )
}

export default ClassItem;   
