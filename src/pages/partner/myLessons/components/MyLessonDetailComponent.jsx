import React from "react";

const MyLessonDetailComponent = ({ modalOpen, closeModal, getOneData }) => {
  console.log("getOneData", getOneData);
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-0">
            <div
              className="
                sticky top-0 
                bg-white 
                px-6 py-4 
                rounded-t-xl
                shadow-sm
                z-10
              "
            >
              <h2
                className="
                  text-2xl font-bold text-gray-900 tracking-tight 
                  px-5 py-3
                  bg-gray-50
                  border border-gray-400
                  rounded-xl
                  shadow-sm
                  flex items-center gap-3
                "
              >
                {getOneData.title}
              </h2>
              <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    준비물
                  </span>
                  {getOneData.tools}
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    설명
                  </span>
                  {getOneData.descriptions}
                  레슨 중 필요한 장비는 기본적으로 센터에서 제공되지만, 개인
                  클럽이 있는 경우 가져오시면 보다 빠르게 교정이 가능합니다.
                  복장은 움직임이 편한 운동복을 권장하며, 야외에서 진행되는 일부
                  연습은 기상 상황에 따라 일정이 변경될 수 있습니다. 수업 시작
                  10분 전까지 도착하여 충분한 스트레칭을 해 주시면 부상 예방에
                  도움이 됩니다. 또한 레슨은 개인별 차이를 고려해 진행되므로,
                  주어진 과제나 연습량이 다를 수 있습니다. 궁금한 점이나 어려운
                  부분이 있을 경우 언제든지 강사에게 편하게 질문해 주세요. 수업
                  종료 후에도 연습을 이어갈 수 있도록 간단한 체크리스트와 개인
                  맞춤 루틴을 제공할 예정이며, 지속적인 성장과 즐거운 골프
                  경험을 도와드리기 위한 안내 사항들이 포함될 수 있습니다.레슨
                  중 필요한 장비는 기본적으로 센터에서 제공되지만, 개인 클럽이
                  있는 경우 가져오시면 보다 빠르게 교정이 가능합니다. 복장은
                  움직임이 편한 운동복을 권장하며, 야외에서 진행되는 일부 연습은
                  기상 상황에 따라 일정이 변경될 수 있습니다. 수업 시작 10분
                  전까지 도착하여 충분한 스트레칭을 해 주시면 부상 예방에 도움이
                  됩니다. 또한 레슨은 개인별 차이를 고려해 진행되므로, 주어진
                  과제나 연습량이 다를 수 있습니다. 궁금한 점이나 어려운 부분이
                  있을 경우 언제든지 강사에게 편하게 질문해 주세요. 수업 종료
                  후에도 연습을 이어갈 수 있도록 간단한 체크리스트와 개인 맞춤
                  루틴을 제공할 예정이며, 지속적인 성장과 즐거운 골프 경험을
                  도와드리기 위한 안내 사항들이 포함될 수 있습니다.
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    커리큘럼
                  </span>
                  {getOneData.curriculum}
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  <span className="font-semibold text-gray-900 mr-1 text-lg block border-l-4 pl-2 border-blue-900">
                    메모
                  </span>
                  {getOneData.memo}
                </p>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={closeModal}
                className="
                  w-full py-2.5 rounded-lg font-semibold
                  bg-blue-900 text-white
                  hover:bg-blue-950 
                  transition shadow-sm
                "
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyLessonDetailComponent;
