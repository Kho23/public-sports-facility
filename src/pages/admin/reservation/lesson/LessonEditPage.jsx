import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeLessonStatus, getOneLesson } from "../../../../api/adminApi";
import LessonEditComponent from "./components/LessonEditComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const LessonEditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [price, setPrice] = useState(0);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOneLesson(id);
        setData(res);
      } catch (err) {
        console.error("조회 실패", err);
      }
    };
    f();
  }, [id]);

  const statusChangeHandler = (status) => {
    if (status === "ACCEPTED" && price == 0) {
      setModal({
        open: true,
        type: "alert",
        message: "가격을 입력해주세요.",
        onConfirm: () => setModal({ open: false }),
      });
      return;
    }

    setModal({
      open: true,
      type: "confirm",
      message:
        status === "ACCEPTED"
          ? "강좌 개설을 승인하시겠습니까?"
          : "강좌 개설을 반려하시겠습니까?",
      onConfirm: async (result) => {
        setModal({ open: false });
        if (result !== "ok") return;

        try {
          await changeLessonStatus({
            id,
            status,
            price: status === "ACCEPTED" ? price : 0,
          });
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 rounded-lg bg-gray-200 font-semibold">
            심사 중
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 rounded-lg bg-green-50 text-green-800 font-semibold">
            승인
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 rounded-lg bg-red-50 text-red-800 font-semibold">
            반려
          </span>
        );
      default:
        return status;
    }
  };

  if (!data) return <div className="p-8">로딩중...</div>;

  return (
    <>
      <LessonEditComponent
        data={data}
        setPrice={setPrice}
        renderStatus={renderStatus}
        statusChangeHandler={statusChangeHandler}
      />

      {modal.open && (
        <ModalComponent
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
        />
      )}
    </>
  );
};

export default LessonEditPage;
