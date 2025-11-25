import React, { useEffect, useState } from "react";
import SupportComponent from "./components/SupportComponent";
import { useNavigate, useParams } from "react-router-dom";
import { supportGetList } from "../../../api/memberApi";
import SupportDetailComponent from "./components/SupportDetailComponent";

const SupportPage = () => {
  const navigate = useNavigate();
  const [supportList, setSupportList] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await supportGetList();
      setSupportList(res);
    };
    f();
  }, []);

  useEffect(() => {
    console.log("supportList", supportList);
  }, [supportList]);

  const supportPageHandler = () => {
    navigate(`/member/support/write`);
  };

  const detailPageHandler = () => {
    navigate(`/member/support/detail`);
  };

  return (
    <div>
      <SupportComponent
        supportPageHandler={supportPageHandler}
        supportList={supportList}
        detailPageHandler={detailPageHandler}
      />
    </div>
  );
};

export default SupportPage;
