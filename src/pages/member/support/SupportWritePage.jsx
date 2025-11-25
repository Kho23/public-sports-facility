import { useRef, useState } from "react";
import SupportWriteComponent from "./components/SupportWriteComponent";
import { useNavigate, useParams } from "react-router-dom";
import { supportReqRegister } from "../../../api/memberApi";

const SupportWritePage = () => {
  const [support, setSupport] = useState({ title: "", content: "" });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const supportFiles = useRef(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setSupport({ ...support, [name]: value });
  };

  const fileHandler = (e) => {
    const { files } = e.target;
    const fileName = [];
    for (const file of files) {
      fileName.push(file.name);
    }
    setFiles(fileName);
  };

  const cancelHandler = () => {
    setSupport({ title: "", content: "" });
    setFiles([]);
    navigate(`/member/${id}`);
  };

  const submitHandler = async () => {
    if (support.title.length >= 2 && support.content.length >= 5) {
      const formData = new FormData();

      const supportFile = supportFiles.current.files;
      for (let i of supportFile) {
        formData.append("supportFiles", i);
      }
      formData.append("supportTitle", support.title);
      formData.append("supportContent", support.content);
      formData.append("memberId", id);

      for (let pair of formData.entries()) {
        console.log(pair);
      }
      try {
        await supportReqRegister(id, formData);
        alert("문의가 제출되었습니다. 빠른 시일 내에 답변드리겠습니다.");
        navigate(`/member/${id}`);
      } catch (err) {
        alert("제출 중 오류가 발생했습니다");
      }
    } else if (support.title.length < 2 && support.content.length >= 5) {
      alert("제목은 두 글자 이상 적어주세요");
    } else if (support.title.length >= 2 && support.content.length < 5) {
      alert("내용은 다섯 글자 이상 적어주세요");
    } else {
      alert("제목은 두 글자 이상, 내용은 다섯 글자 이상 적어주세요");
    }
  };

  return (
    <SupportWriteComponent
      changeHandler={changeHandler}
      supportFiles={supportFiles}
      fileHandler={fileHandler}
      files={files}
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
    />
  );
};

export default SupportWritePage;
