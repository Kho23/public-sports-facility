import React from "react";
import { PiNoteDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const DailyUseComponent = ({
  dailyUse,
  gymDailyUse,
  cancelGymHandler,
  cancelDailyUseHandler,
}) => {
  return (
    <>
      {dailyUse?.length === 0 && gymDailyUse?.length === 0 ? (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            일일이용예약 신청 내역이 없습니다.
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            일일이용 예약을 원하실 경우, 일일이용예약 페이지를 이용해 주세요.
            <br />
            <Link
              to="/reservation/dailyUse"
              className="
                inline-block mt-8 px-8 py-3 
                bg-blue-900 text-white font-semibold 
                rounded-xl shadow-md 
                hover:bg-blue-800 hover:shadow-lg 
                transition-all duration-200
              "
            >
              일일이용예약 바로가기
            </Link>
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-5 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <span className="block w-2 h-8 bg-blue-950 rounded-sm"></span>
            <span className="tracking-tight">일일 이용예약 목록</span>
          </h1>
          {dailyUse?.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg duration-200 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-800 rounded-sm"></span>
                  예약 정보
                </h2>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">예약일</span>
                  <span>{i.startTime?.slice(0, 10)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">시간</span>
                  <span>
                    {i.startTime?.slice(11, 16)} ~ {i.endTime?.slice(11, 16)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">시설·장소</span>
                  <span>
                    {i.facilityName} · {i.spaceName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">이용 금액</span>
                  <span>{i.price} 원</span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => cancelDailyUseHandler(i.id)}
                  className="
                    px-4 py-2
                    text-sm font-semibold
                    bg-red-500 
                    hover:bg-red-700 
                    text-white 
                    rounded-lg 
                    shadow-sm hover:shadow-md
                    transition-all
                  "
                >
                  취소하기
                </button>
              </div>
            </div>
          ))}
          {gymDailyUse?.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg duration-200 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-800 rounded-sm"></span>
                  예약 정보
                </h2>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">예약일</span>
                  <span>{i.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">시설</span>
                  <span>헬스장</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">이용 금액</span>
                  <span>{i.price} 원</span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => cancelGymHandler(i.id)}
                  className="
                    px-4 py-2
                    text-sm font-semibold
                    bg-red-500 
                    hover:bg-red-700 
                    text-white 
                    rounded-lg 
                    shadow-sm hover:shadow-md
                    transition-all
                  "
                >
                  취소하기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DailyUseComponent;
