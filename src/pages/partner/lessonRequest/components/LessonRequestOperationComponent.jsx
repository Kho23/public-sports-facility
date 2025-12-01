import React from "react";

const LessonRequestOperationComponent = ({ form, formChangeHandler }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
          강좌 신청
        </h2>
      </div>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          1. 인원
        </h3>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold w-28">
            최소 개설 인원
          </label>

          <input
            id="minPeople"
            name="minPeople"
            min={1}
            onChange={(e) => formChangeHandler(e)}
            className="
                w-28
                border border-gray-300 
                rounded-lg 
                p-2.5 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                text-right
                transition
              "
            placeholder="0"
          />

          <span className="text-gray-600 text-sm">명</span>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <label className="text-gray-700 font-semibold w-8">정원</label>

          <input
            id="maxPeople"
            name="maxPeople"
            max={100}
            onChange={(e) => formChangeHandler(e)}
            className="
                w-28
                border border-gray-300 
                rounded-lg 
                p-2.5 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                text-right
                transition
              "
            placeholder="0"
          />
          <span className="text-gray-600 text-sm">명</span>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          2. 필요 시설
        </h3>

        {form.facilityType === "POOL" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex flex-col w-full">
              <select
                id="facility"
                name="facilityRoomType"
                onClick={(e) => formChangeHandler(e)}
                className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
            "
              >
                <option value="" disabled selected>
                  수영 (기본 선택)
                </option>
                <option value="P1">1번 레인</option>
                <option value="P2">2번 레인</option>
                <option value="P3">3번 레인</option>
                <option value="P4">4번 레인</option>
                <option value="P5">5번 레인</option>
                <option value="P6">6번 레인</option>
              </select>

              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  시설 이용 안내 (수영)
                </h4>
                <span className="text-xs text-gray-500 space-y-2 leading-5 pl-1">
                  • 수영 : 한 레인당 최소 1명, 최대 6명 권장.
                  <br /> • 시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자
                  확인이 필요할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        )}
        {form.facilityType === "GOLF" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex flex-col w-full">
              <select
                id="facility"
                name="facilityRoomType"
                onClick={(e) => formChangeHandler(e)}
                className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
            "
              >
                <option value="" disabled selected>
                  골프 (기본 선택)
                </option>
                <option value="G1">1번 좌석</option>
                <option value="G2">2번 좌석</option>
                <option value="G3">3번 좌석</option>
                <option value="G4">4번 좌석</option>
                <option value="G5">5번 좌석</option>
                <option value="G6">6번 좌석</option>
                <option value="G7">7번 좌석</option>
                <option value="G8">8번 좌석</option>
                <option value="G9">9번 좌석</option>
                <option value="G10">10번 좌석</option>
                <option value="G11">11번 좌석</option>
                <option value="G12">12번 좌석</option>
                <option value="G13">13번 좌석</option>
                <option value="G14">14번 좌석</option>
                <option value="G15">15번 좌석</option>
                <option value="G16">16번 좌석</option>
                <option value="G17">17번 좌석</option>
                <option value="G18">18번 좌석</option>
                <option value="G19">19번 좌석</option>
                <option value="G20">20번 좌석</option>
              </select>
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  시설 이용 안내 (골프)
                </h4>
                <span className="text-xs text-gray-500 space-y-2 leading-5 pl-1">
                  • 골프 : 좌석은 1인 사용 원칙이며, 장비 사용 시 안전거리를
                  확보해 주세요.
                  <br /> • 시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자
                  확인이 필요할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        )}
        {form.facilityType === "FUTSAL" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex flex-col w-full">
              <select
                id="facility"
                name="facilityRoomType"
                onClick={(e) => formChangeHandler(e)}
                className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
            "
              >
                <option value="" disabled selected>
                  풋살 (기본 선택)
                </option>
                <option value="F1">A 경기장</option>
                <option value="F2">B 경기장</option>
                <option value="F3">C 경기장</option>
              </select>
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  시설 이용 안내 (풋살)
                </h4>
                <span className="text-xs text-gray-500 space-y-2 leading-5 pl-1">
                  • 풋살 : 경기장 1면 기준 약 10~12명 수용 가능하며, 팀 경기 시
                  보호 장비 착용을 권장합니다.
                  <br /> • 시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자
                  확인이 필요할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        )}
        {form.facilityType === "DANCE" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex flex-col w-full">
              <select
                id="facility"
                name="facilityRoomType"
                onClick={(e) => formChangeHandler(e)}
                className="
                w-full 
                border border-gray-300 
                rounded-lg 
                p-3 
                text-gray-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-200 
                focus:border-blue-500
                transition
            "
              >
                <option value="" disabled selected>
                  무용 (기본 선택)
                </option>
                <option value="D1">A 무용실</option>
                <option value="D2">B 무용실</option>
                <option value="D3">C 무용실</option>
              </select>
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  시설 이용 안내 (무용)
                </h4>
                <span className="text-xs text-gray-500 space-y-2 leading-5 pl-1">
                  • 무용 : A/B/C 무용실 정원은 약 10~15명이며, 실내 전용 신발
                  착용을 권장합니다.
                  <br /> • 시설 배정은 운영 상황에 따라 변경될 수 있으며, 관리자
                  확인이 필요할 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LessonRequestOperationComponent;
