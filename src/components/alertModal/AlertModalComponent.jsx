import React from "react";

// props로 message와 onClose 함수를 받는다고 가정
const AlertModalComponent = ({ message, onClose }) => {
  return (
    // 백드롭 (Backdrop)
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* 모달 컨테이너 (Container) */}
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
        {/* 모달 내용 */}
        <div className="p-6 sm:p-8">
          {/* 아이콘 (선택 사항: 경고/정보 아이콘) */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            {/* 이 예시에서는 간단한 느낌표 아이콘을 사용합니다 */}
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>

          {/* 메시지 본문 */}
          <div className="mt-2">
            <p className="text-sm text-gray-500 text-center">{message}</p>
          </div>
        </div>

        {/* 액션 버튼 영역 */}
        <div className="px-4 py-3 bg-gray-50 sm:px-6">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModalComponent;
