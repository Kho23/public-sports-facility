import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneNotice } from "../../../../api/noticeApi";
import { deleteNotice } from "../../../../api/adminApi";
import NoticeReadComponent from "./Components/NoticeReadComponent";

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
    const f = async () => {
      try {
        const res = await deleteNotice(id);
        console.log(res);
        alert("삭제가 완료되었습니다.");
        navigate(-1);
      } catch (error) {
        console.error("삭제 error", error);
      }
    };
    f();
  };

  return (
    <>
      <NoticeReadComponent
        notice={notice}
        id={id}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default NoticeReadPage;
