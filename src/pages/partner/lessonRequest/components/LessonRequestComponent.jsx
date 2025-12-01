import React from "react";

const LessonRequestComponent = ({
  data,
  formChangeHandler,
  dateChangeHandler,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
          강좌 신청
        </h2>
        <div
          className="
            mt-6 
            p-5 
            bg-gray-50 
            border border-gray-300 
            rounded-xl 
            shadow-sm
          "
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">강사 정보</h3>

          <ul className="space-y-2 text-gray-700 text-base">
            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">강사명</span>
              <span>{data.memberName}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">생년월일</span>
              <span>{data.memberBirthDate?.slice(0, 10)}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">이메일</span>
              <span>{data.memberEmail}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">아이디</span>
              <span>{data.memberLoginId}</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="font-semibold w-32 text-blue-900">전화번호</span>
              <span>{data.memberPhoneNumber}</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3 border border-gray-200">
          <span className="text-sm font-bold text-blue-800">※</span>
          <span className="text-sm text-gray-700 leading-6">
            모든 항목은 <span className="font-semibold">필수 입력</span>{" "}
            사항입니다. 빠짐없이 작성해 주세요.
          </span>
        </div>
      </div>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          1. 강좌 제목
        </h3>
        <div>
          <input
            type="text"
            name="title"
            onChange={(e) => formChangeHandler(e)}
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
            placeholder="강좌 제목을 입력해주세요"
          />
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          2. 강좌 분야
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base">
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="facilityType"
              value={"POOL"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            수영
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="facilityType"
              value={"GOLF"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            골프
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="facilityType"
              value={"DANCE"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            무용
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="facilityType"
              value={"FUTSAL"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            풋살
          </label>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          3. 강좌 난이도
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base">
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="level"
              value={"하급"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            하급
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="level"
              value={"중급"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            중급
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="level"
              value={"상급"}
              onClick={(e) => formChangeHandler(e)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            상급
          </label>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          4. 기간
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">시작일</label>
            <input
              type="date"
              name="startDate"
              onChange={(e) => formChangeHandler(e)}
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
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">종료일</label>
            <input
              type="date"
              name="endDate"
              onChange={(e) => formChangeHandler(e)}
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
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          5. 강좌 요일
        </h3>
        <div
          onChange={(e) => dateChangeHandler(e)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base"
        >
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"MON"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            월
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"TUE"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            화
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"WED"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            수
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"THU"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            목
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"FRI"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            금
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="days"
              value={"SAT"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            토
          </label>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          5. 강좌 시간
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">
              시작 시간
            </label>
            <select
              name="startTime"
              onChange={(e) => formChangeHandler(e)}
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
                시간 선택
              </option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-gray-700 font-semibold mb-2">
              끝나는 시간
            </label>
            <select
              name="endTime"
              onChange={(e) => formChangeHandler(e)}
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
                시간 선택
              </option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LessonRequestComponent;
