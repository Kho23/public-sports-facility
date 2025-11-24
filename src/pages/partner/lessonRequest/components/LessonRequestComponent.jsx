import React from "react";

const LessonRequestComponent = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
          강좌 신청
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          강사 정보 (자동 입력 readonly)
        </p>
      </div>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          1. 강좌 제목
        </h3>
        <div>
          <input
            type="text"
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
              name="classCategory"
              id={"수영"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            수영
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="classCategory"
              id={"헬스"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            헬스
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="classCategory"
              id={"골프"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            골프
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="classCategory"
              id={"무용"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            무용
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="classCategory"
              id={"풋살"}
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
              name="classLevel"
              id={"하급"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            하급
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="classLevel"
              id={"중급"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            중급
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="radio"
              name="classLevel"
              id={"상급"}
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
              id="startDate"
              name="classTermStart"
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
              id="finishDate"
              name="classTermEnd"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base">
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="classDay"
              id={"월요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            월
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="classDay"
              id={"화요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            화
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="classDay"
              id={"수요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            수
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="classDay"
              id={"목요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            목
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
            <input
              type="checkbox"
              name="classDay"
              id={"금요일"}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
            />
            금
          </label>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
          5. 강좌 시간
        </h3>

        <div className="mb-6">
          <label className="block font-semibold text-gray-800 mb-2">
            시작 시간
          </label>
          <select
            name="classStartTime"
            className="
              w-full sm:w-1/2
              border border-gray-300 
              rounded-lg 
              p-3 
              bg-white
              text-gray-800 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-200 
              focus:border-blue-500
              transition
            "
          >
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-2">
            수업 길이
          </label>
          <select
            name="classDuration"
            className="
              w-full sm:w-1/2
              border border-gray-300 
              rounded-lg 
              p-3 
              bg-white
              text-gray-800 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-200 
              focus:border-blue-500
              transition
            "
          >
            <option value="1">1시간</option>
            <option value="2">2시간</option>
            <option value="3">3시간</option>
          </select>
        </div>
      </section>

      <div className="flex justify-end gap-4 mt-10">
        <button className="px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 transition duration-150">
          취소
        </button>

        <button
          className="
                px-10 py-3 rounded-xl 
                font-extrabold text-lg 
                bg-blue-600 text-white 
                hover:bg-blue-700 
                shadow-lg hover:shadow-xl
                transition duration-150
              "
        >
          신청하기
        </button>
      </div>
    </div>
  );
};

export default LessonRequestComponent;
