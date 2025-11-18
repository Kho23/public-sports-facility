import React from "react";

const SupportAnsweredComponent = () => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
        답변 내용
      </h3>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-blue-800">관리자</span>
          <span className="text-sm text-gray-500">2023.11.17 18:00</span>{" "}
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">
          고객님, 문의하신 사항에 대해 확인했습니다.
          <br />
          <br />
          해당 오류는 최신 업데이트를 통해 해결되었습니다. 앱을 최신 버전으로
          업데이트하신 후 다시 시도해 주시기 바랍니다.
          <br />
          이용에 불편을 드려 죄송합니다.
        </p>
      </div>
    </div>
  );
};

export default SupportAnsweredComponent;
