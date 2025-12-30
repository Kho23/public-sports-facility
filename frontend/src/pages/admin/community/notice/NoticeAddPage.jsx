import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";
import NoticeAddComponent from "./Components/NoticeAddComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const initstate = {
  title: "",
  content: "",
};

const NoticeAddPage = () => {
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  const [noticeData, setNoticeData] = useState(initstate);
  const [fileList, setFileList] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  const fileChangeHandler = (e) => {
    setFileList([...e.target.files]);
  };

  const registerHandler = async () => {
    try {
      let addFiles = [];

      if (fileList.length > 0) {
        const formData = new FormData();
        fileList.forEach((file) => formData.append("file", file));

        const fileRes = await fileRegister(formData, "notice");

        addFiles = fileRes.fileData.map((fileData, idx) => ({
          originalName: fileList[idx].name,
          savedName: fileData.imageUrl.split("/").pop(),
          filePath: fileData.imageUrl,
          thumbnailPath: fileData.thumbnailUrl,
        }));
      }

      await registerNotice({
        ...noticeData,
        fileList: addFiles,
      });

      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  /** 추가 버튼 클릭 */
  const submitClickHandler = () => {
    setModal({
      open: true,
      type: "confirm",
      message: "공지를 추가하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          registerHandler();
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  /** 취소 버튼 클릭 */
  const cancelClickHandler = () => {
    setModal({
      open: true,
      type: "confirm",
      message: "공지 작성을 취소하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          navigate(-1);
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  return (
    <>
      <NoticeAddComponent
        noticeData={noticeData}
        setNoticeData={setNoticeData}
        changeHandler={changeHandler}
        fileList={fileList}
        noticeFileRef={noticeFileRef}
        fileChangeHandler={fileChangeHandler}
        submitClickHandler={submitClickHandler}
        cancelClickHandler={cancelClickHandler}
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

export default NoticeAddPage;
