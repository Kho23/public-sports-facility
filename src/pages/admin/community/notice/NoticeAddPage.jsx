import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";

import "../../../../styles/ckeditor-custom.css";
import NoticeAddComponent from "./Components/NoticeAddComponent";

const initstate = {
  content: "",
  title: "",
};

const NoticeAddPage = () => {
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  const [noticeData, setNoticeData] = useState(initstate);
  const [fileList, setFileList] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const files = [...e.target.files];
    setFileList(files);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const f = async () => {
      try {
        let addFiles = [];
        if (fileList && fileList.length > 0) {
          const formData = new FormData();
          fileList.forEach((file) => {
            formData.append("file", file);
          });
          const fileRes = await fileRegister(formData, "notice");
          addFiles = fileRes.fileData.map((fileData, idx) => {
            const savedName = fileData.imageUrl.substring(
              fileData.imageUrl.lastIndexOf("/") + 1
            );
            return {
              originalName: fileList[idx].name,
              savedName: savedName,
              filePath: fileData.imageUrl,
              thumbnailPath: fileData.thumbnailUrl,
            };
          });
          console.log("backend에 파일 내용 전달", fileRes);
        }

        const noticeDataWithFiles = {
          ...noticeData,
          fileList: addFiles,
        };
        const noticeRes = await registerNotice(noticeDataWithFiles);

        console.log("backend에 공지 내용 전달", noticeRes);

        alert("공지 등록 완료");

        navigate(-1);
      } catch (error) {
        console.error("backend 전달 실패", error);
      }
    };
    f();
  };

  return (
    <>
      <NoticeAddComponent
        changeHandler={changeHandler}
        noticeData={noticeData}
        setNoticeData={setNoticeData}
        fileList={fileList}
        noticeFileRef={noticeFileRef}
        fileChangeHandler={fileChangeHandler}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default NoticeAddPage;
