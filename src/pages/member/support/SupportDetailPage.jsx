import React, { useEffect, useState } from "react";
import SupportDetailComponent from "./components/SupportDetailComponent";
import { useParams } from "react-router-dom";
import { supportGetList } from "../../../api/memberApi";

const SupportDetailPage = () => {
  const { id } = useParams();
  const [supportList, setSupportList] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await supportGetList(id);
      setSupportList(res);
    };
    f();
  }, [id]);

  return <SupportDetailComponent supportList={supportList} />;
};

export default SupportDetailPage;
