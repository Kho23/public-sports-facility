import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneNotice } from "../../../../api/noticeApi";
import { modifyNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";

import "../../../../styles/ckeditor-custom.css";
import NoticeEditComponent from "./Components/NoticeEditComponent";

const initstate = {
  noticeId: 0,
  content: "",
  createAt: "",
  title: "",
  fileList: [],
};
const NoticeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  const [getOne, setGetOne] = useState(initstate);
  const [fileList, setFileList] = useState([]);
  const [newfileList, setNewFileList] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOneNotice(id);
        console.log("백엔드에서 가져온 데이터", res);
        setGetOne(res);
        setFileList(res.fileList);
      } catch (error) {
        console.error("가져오기실패", error);
      }
    };
    f();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGetOne({ ...getOne, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const files = [...e.target.files];
    setNewFileList((prev) => [...prev, ...files]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const f = async () => {
      try {
        let newFiles = [];

        if (newfileList.length > 0) {
          const formData = new FormData();
          newfileList.forEach((file) => formData.append("file", file));

          const fileRes = await fileRegister(formData, "notice");

          newFiles = fileRes.fileData.map((fileData, idx) => ({
            originalName: newfileList[idx].name,
            savedName: fileData.imageUrl.substring(
              fileData.imageUrl.lastIndexOf("/") + 1
            ),
            filePath: fileData.imageUrl,
            thumbnailPath: fileData.thumbnailUrl,
          }));
        }

        const finalFileList = [...fileList, ...newFiles];

        const finalNoticeData = {
          ...getOne,
          fileList: finalFileList,
          removeFileId: deletedFileIds,
        };

        await modifyNotice(finalNoticeData);

        alert("공지 수정완료");
        navigate(-1);
      } catch (error) {
        console.error("수정 실패:", error);
        alert("공지 수정에 실패했습니다.");
      }
    };
    f();
  };

  const deleteFileHandler = (id) => {
    const data = fileList.filter((i) => i.id !== id);
    setFileList(data);
    setDeletedFileIds((prev) => [...prev, id]);
  };

  const deleteNewFileHandler = (idx) => {
    setNewFileList((i) => i.filter((_, j) => j !== idx));
  };

  return (
    <>
      <NoticeEditComponent
        getOne={getOne}
        changeHandler={changeHandler}
        setGetOne={setGetOne}
        fileList={fileList}
        newfileList={newfileList}
        noticeFileRef={noticeFileRef}
        fileChangeHandler={fileChangeHandler}
        deleteFileHandler={deleteFileHandler}
        deleteNewFileHandler={deleteNewFileHandler}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default NoticeEditPage;
