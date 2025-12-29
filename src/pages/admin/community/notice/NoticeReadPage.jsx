import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneNotice } from "../../../../api/noticeApi";
import { deleteNotice } from "../../../../api/adminApi";
import NoticeReadComponent from "./Components/NoticeReadComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const initState = {
  content: "",
  createdAt: "",
  noticeId: 0,
  title: "",
  viewCount: 0,
};

const NoticeReadPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(initState);
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneNotice(id);
        console.log(data);
        setNotice(data);
      } catch (error) {
        console.log("백엔드 데이터 로드 중 오류 발생", error);
      }
    };
    getOne();
  }, [id]);

  const deleteHandler = () => {
    setModal({
      open: true,
      type: "confirm",
      message: "공지를 삭제하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          const f = async () => {
            try {
              await deleteNotice(id);
              navigate(-1);
            } catch (error) {
              console.error("삭제 error", error);
            }
          };
          f();
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  return (
    <>
      <NoticeReadComponent
        notice={notice}
        id={id}
        deleteHandler={deleteHandler}
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

export default NoticeReadPage;
