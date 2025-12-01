import React, { useEffect, useRef, useState } from "react";
import LessonRequestComponent from "./components/LessonRequestComponent";
import { getOne } from "../../../api/memberApi";
import LessonRequestDetailComponent from "./components/LessonRequestDetailComponent";
import LessonRequestOperationComponent from "./components/LessonRequestOperationComponent";
import { useNavigate } from "react-router-dom";
import { lessonRequest } from "../../../api/partnerApi";

const LessonRequestPage = () => {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    days: [],
    level: "",
    startTime: "",
    endTime: "",

    description: "",
    tools: "",
    memo: "",
    curriculum: "",

    minPeople: "",
    maxPeople: "",
    facilityType: "",
    facilityRoomType: "",
  });

  const [page, setPage] = useState(1);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const res = await getOne();
      setData(res);
    };
    f();
  }, []);

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((i) => ({
      ...i,
      [name]: value,
    }));
  };

  const dateChangeHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setForm((i) => ({ ...i, days: [...i.days, value] }));
    } else {
      setForm((i) => ({ ...i, days: i.days.filter((j) => j !== value) }));
    }
  };

  const submitHandler = () => {
    if (!form.minPeople) return alert("최소 인원을 입력해주세요.");
    if (!form.maxPeople) return alert("정원을 입력해주세요.");
    if (!form.facilityRoomType) return alert("필요한 시설을 선택해주세요.");

    lessonRequest(form);
    alert("접수가 완료되었습니다.");
    navigate("/partner");
  };

  const nextClickHandler = () => {
    if (page === 1) {
      if (!form.title) return alert("강좌 제목을 입력해주세요.");
      if (!form.facilityType) return alert("강좌 분야를 선택해주세요.");
      if (!form.level) return alert("난이도를 선택해주세요.");
      if (!form.startDate || !form.endDate)
        return alert("기간을 선택해주세요.");
      if (form.days.length === 0) return alert("요일을 선택해주세요.");
      if (!form.startTime || !form.endTime)
        return alert("시간을 선택해주세요.");
    }

    if (page === 2) {
      if (!form.description) return alert("강의 설명을 입력해주세요.");
      if (!form.tools) return alert("강의 준비물을 입력해주세요.");
      if (!form.memo) return alert("강의 특이사항을 입력해주세요.");
      if (!form.curriculum) return alert("커리큘럼을 입력해주세요.");
    }

    setPage((page) => page + 1);
  };

  return (
    <>
      {page === 1 && (
        <LessonRequestComponent
          form={form}
          data={data}
          formChangeHandler={formChangeHandler}
          dateChangeHandler={dateChangeHandler}
        />
      )}
      {page === 2 && (
        <LessonRequestDetailComponent
          form={form}
          formChangeHandler={formChangeHandler}
        />
      )}
      {page === 3 && (
        <LessonRequestOperationComponent
          form={form}
          formChangeHandler={formChangeHandler}
        />
      )}
      <div className="max-w-3xl mx-auto p-6 sm:p-10 mt-8">
        <div className="flex justify-between items-center">
          <div>
            {page > 1 && (
              <button
                className="px-10 py-3 rounded-xl
                  font-semibold border-2 border-gray-300
                hover:border-gray-400 hover:bg-gray-50
                text-gray-700 transition duration-150"
                onClick={() => setPage(page - 1)}
              >
                이전
              </button>
            )}
          </div>

          <div>
            {page < 3 && (
              <button
                className="
                  px-10 py-3 rounded-xl 
                  font-extrabold text-lg 
                  bg-blue-600 text-white 
                  hover:bg-blue-700 
                  shadow-lg hover:shadow-xl
                  transition duration-150
                "
                onClick={nextClickHandler}
              >
                다음
              </button>
            )}

            {page === 3 && (
              <button
                className="
                  px-10 py-3 rounded-xl 
                  font-extrabold text-lg 
                  bg-blue-600 text-white 
                  hover:bg-blue-700 
                  shadow-lg hover:shadow-xl
                  transition duration-150
                "
                onClick={submitHandler}
              >
                제출하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonRequestPage;
