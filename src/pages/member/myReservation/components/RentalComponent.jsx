import { Link } from "lucide-react";
import React from "react";
import { PiNoteDuotone } from "react-icons/pi";

const RentalComponent = ({ data, facilityName, cancelHandler }) => {
  return (
    <>
      {data == "" ? (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            대관 신청 내역이 없습니다.
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            대관 신청을 원하실 경우, 대관 신청 페이지를 이용해 주세요.
            <br />
            <Link
              to="/reservation/rental"
              className="
                inline-block mt-8 px-8 py-3 
                bg-blue-900 text-white font-semibold 
                rounded-xl shadow-md 
                hover:bg-blue-800 hover:shadow-lg 
                transition-all duration-200
              "
            >
              대관 신청 바로가기
            </Link>
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-5 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <span className="block w-2 h-8 bg-blue-950 rounded-sm"></span>
            <span className="tracking-tight">대관 신청 목록</span>
          </h1>

          {data?.map((i) => (
            <div className="bg-white border border-gray-200 shadow-md hover:shadow-lg duration-200 rounded-xl p-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-14">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-5 bg-blue-800 rounded-sm"></span>
                    예약 정보
                  </h2>
                  <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        예약일
                      </span>
                      <span>{i.startTime.slice(0, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">시간</span>
                      <span>
                        {i.startTime.slice(11, 16)} ~ {i.endTime.slice(11, 16)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        시설·장소
                      </span>
                      <span>
                        {facilityName.find((j) => j.id == i.spaceId).name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        이용 금액
                      </span>
                      <span>{i.price} 원</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-5 bg-blue-800 rounded-sm"></span>
                    신청자 정보
                  </h2>
                  <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">이름</span>
                      <span>{i.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        전화번호
                      </span>
                      <span>{i.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-600">
                        요청사항
                      </span>
                      <span>{i.memo}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => cancelHandler(i)}
                      className="
                        px-5 py-2.5 mt-4
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
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RentalComponent;
