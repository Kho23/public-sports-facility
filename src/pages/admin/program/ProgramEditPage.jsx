import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../../api/programApi";
import { programModify } from "../../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import ProgramEditComponent from "./ProgramEditComponent";

const initState = {
  content: "",
  programName: "",
  uploadFiles: [],
};
const ProgramEditPage = () => {
  const [data, setData] = useState(initState);
  const { programId } = useParams();
  const navigate = useNavigate();
  const programFiles = useRef(null);
  const [newfileList, setNewFileList] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOne(programId);
        setData(res);
        console.log(res);
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
        const res = await programModify(programId, formData);
        console.log(res);
        alert("수정 완료");
        window.location.reload();
      } catch (error) {
        console.error("보내기 실패", error);
      }
    };
    f();
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
      />
    </div>
  );
};

export default ProgramEditPage;
