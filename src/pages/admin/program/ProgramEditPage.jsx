import React, { useEffect, useState } from "react";
import { getOne } from "../../../api/programApi";
import { programModify } from "../../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import ProgramEditComponent from "./ProgramEditComponent";

const initState = {
  content: "",
  programName: "",
};
const ProgramEditPage = () => {
  const [data, setData] = useState(initState);
  const { programId } = useParams();
  const navigate = useNavigate();

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

  const submitHandler = (e) => {
    e.preventDefault();
    const f = async () => {
      try {
        const res = await programModify(programId, data);
        console.log(res);
        alert("수정 완료");
        navigate(-1);
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
      />
    </div>
  );
};

export default ProgramEditPage;
