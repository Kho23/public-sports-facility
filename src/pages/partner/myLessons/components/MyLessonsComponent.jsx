import React from "react";

const MyLessonsComponent = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-6">
      {/* 페이지 제목 */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
        <span className="block w-2 h-8 bg-blue-950 rounded-sm"></span>
        <span className="tracking-tight">내 강의 목록</span>
      </h1>

      {/* ===== 강의 카드 ===== */}
      <div className="bg-white shadow-sm hover:shadow-lg transition border border-gray-200 rounded-xl p-6">
        {/* 상단: 번호 + 제목 + 버튼 */}
        <div className="flex items-center justify-between mb-4">
          {/* 번호 + 제목 */}
          <div className="flex items-center gap-3">
            {/* 제목 */}
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="block w-1.5 h-5 bg-teal-600 rounded"></span>
              골프해요~
            </h2>
          </div>

          {/* 상태 + 버튼 */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
              운영중
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* 정보 grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm leading-relaxed">
          <div>
            <span className="font-semibold text-gray-900">분야</span>
            <div className="mt-0.5 flex items-center gap-1 text-gray-800">
              ⛳ 골프
            </div>
          </div>

          <div>
            <span className="font-semibold text-gray-900">기간</span>
            <div className="mt-0.5 text-gray-800">12월 1일 ~ 12월 31일</div>
          </div>

          <div>
            <span className="font-semibold text-gray-900">수업 시간</span>
            <div className="mt-0.5 text-gray-800">월, 수, 금 / 3시 ~ 4시</div>
          </div>

          <div>
            <span className="font-semibold text-gray-900">난이도</span>
            <div className="mt-0.5 text-gray-800">중급</div>
          </div>

          <div>
            <span className="font-semibold text-gray-900">정원</span>
            <div className="mt-0.5 text-gray-800">2명 ~ 8명</div>
          </div>

          <div>
            <span className="font-semibold text-gray-900">시설</span>
            <div className="mt-0.5 text-gray-800 flex justify-between items-start">
              <span>골프 2번 좌석</span>

              <button className="px-3 py-1.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md shadow-sm">
                상세보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLessonsComponent;
