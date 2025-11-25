import React, { useEffect, useState } from "react";
import SupportDetailComponent from "./components/SupportDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { supportGetOne } from "../../../api/memberApi";

const SupportDetailPage = () => {
  const { id } = useParams();
  const { no } = useParams();
  const [supportList, setSupportList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      const getOne = await supportGetOne(no);
      setSupportList(getOne);
    };
    f();
  }, [id]);

  const toListHandler = () => {
    navigate(`/member/${id}/support`);
  };

  return (
    <SupportDetailComponent
      supportList={supportList}
      toListHandler={toListHandler}
    />
  );
};

export default SupportDetailPage;
