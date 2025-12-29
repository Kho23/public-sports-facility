import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../../api/programApi";
import { programModify } from "../../../api/adminApi";
import { useParams } from "react-router-dom";
import ProgramEditComponent from "./ProgramEditComponent";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const initState = {
  content: "",
  programName: "",
  uploadFiles: [],
};
const ProgramEditPage = () => {
  const [data, setData] = useState(initState);
  const { programId } = useParams();
  const programFiles = useRef(null);
  const [newfileList, setNewFileList] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOne(programId);
        setData(res);
      } catch (error) {
        console.error("가져오기 실패", error);
      }
    };
    f();
  }, [programId]);

  const deleteHandler = (e) => {
    const { name } = e.target;
    setDeletedFileIds((prev) => [...prev, name]);
    const filtered = data.uploadFiles.filter((i) => i.fileNo != name);
    setData({
      ...data,
      uploadFiles: filtered,
    });
  };

  const fileUploadHandler = (e) => {
    const { files } = e.target;
    const fileList = [];
    for (var i of files) {
      fileList.push(i);
    }
    setNewFileList(fileList);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const programUploadFile = programFiles.current.files;
    for (var i of programUploadFile) {
      formData.append("files", i);
    }
    formData.append("pno", data.pno);
    formData.append("content", data.content);
    formData.append("programName", data.programName);
    formData.append("deletedNo", deletedFileIds);

    const f = async () => {
      try {
        setAlertModal({
          open: true,
          type: "confirm",
          message: "내용을 수정하시겠습니까?",
          onConfirm: async (i) => {
            setAlertModal({ open: false });
            if (i !== "ok") return;
            await programModify(programId, formData);
            window.location.reload();
          },
        });
      } catch (error) {
        console.error("보내기 실패", error);
      }
    };
    f();
  };

  const cancelHandler = () => {
    setAlertModal({
      open: true,
      type: "confirm",
      message: "내용을 취소하시겠습니까?",
      onConfirm: (i) => {
        setAlertModal({ open: false });
        if (i !== "ok") return;
        window.location.reload();
      },
    });
  };

  return (
    <div>
      <ProgramEditComponent
        submitHandler={submitHandler}
        data={data}
        setData={setData}
        fileUploadHandler={fileUploadHandler}
        programFiles={programFiles}
        deleteHandler={deleteHandler}
        newfileList={newfileList}
        cancelHandler={cancelHandler}
      />
      {alertModal.open && (
        <ModalComponent
          type={alertModal.type}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
};

export default ProgramEditPage;
