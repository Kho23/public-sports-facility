import React from "react";
import SupportAnsweredComponent from "./SupportAnsweredComponent";

const SupportDetailComponent = ({ supportList }) => {
  return (
    <div className="container mx-auto max-w-4xl p-6 md:p-10">
      {supportList.map((i, idx) => {
        return (
          <div
            key={i.supportNo}
            className="bg-white shadow-md rounded-xl p-8 mb-10 border border-gray-200"
          >
            {/* 🔥 상단: 제목(왼쪽) + 상태(오른쪽) */}
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-extrabold text-gray-900 border-l-8 border-blue-700 pl-4">
                1:1 문의 상세
              </h1>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    i.status === "WAITING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }
                `}
              >
                {i.status === "WAITING" ? "답변 대기" : "답변 완료"}
              </span>
            </div>

            {/* 번호 + 등록일 */}
            <div className="flex justify-between text-sm text-gray-600 mb-6 pb-3 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-blue-700">문의 번호</span>
                <span>{idx + 1}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-semibold text-blue-700">등록일</span>
                <span>{i.createdDate?.slice(0, 10)}</span>
              </div>
            </div>

            {/* 제목 */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-blue-700"> 제목 </span>
              <span>{i.supportTitle}</span>
            </div>

            {/* 내용 */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed">
              <p className="font-bold text-lg mb-3 text-blue-700">문의 내용</p>
              <p>{i.supportContent}</p>
            </div>
          </div>
        );
      })}

      {/* 관리자 답변 */}
      <SupportAnsweredComponent />

      {/* 뒤로가기 버튼 */}
      <div className="text-center mt-12">
        <button className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-md">
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default SupportDetailComponent;
