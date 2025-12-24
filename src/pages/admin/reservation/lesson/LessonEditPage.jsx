import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { changeLessonStatus, getOneLesson } from "../../../../api/adminApi";
import LessonEditComponent from "./components/LessonEditComponent";
const LessonEditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOneLesson(id);
        setData(res);
      } catch (err) {
        console.error("파트너 신청 상세 조회 실패:", err);
      }
    };
    f();
  }, [id]);

  const statusChangeHandler = async (status) => {
    if (price == 0) {
      alert("가격을 입력해주세요.");
      return;
    }
    try {
      const res = await changeLessonStatus({
        id: id,
        status: status,
        price: price,
      });
      console.log(res);
      alert("완료~!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("상태 변경 실패");
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 rounded-lg text-black-800 bg-gray-200 font-semibold">
            심사 중
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 rounded-lg text-green-800 bg-green-50 font-semibold">
            승인
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 rounded-lg text-red-800 bg-red-50 font-semibold">
            반려
          </span>
        );
      default:
        return status;
    }
  };
  if (!data) return <div className="text-gray-500 p-8">로딩중...</div>;
  return (
    <>
      <LessonEditComponent
        data={data}
        setPrice={setPrice}
        renderStatus={renderStatus}
        statusChangeHandler={statusChangeHandler}
      />
    </>
  );
};
export default LessonEditPage;
