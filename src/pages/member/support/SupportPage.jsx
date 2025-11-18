import React, { useEffect, useState } from "react";
import SupportComponent from "./components/SupportComponent";
import { useNavigate, useParams } from "react-router-dom";
import { supportGetList } from "../../../api/memberApi";
import SupportDetailComponent from "./components/SupportDetailComponent";

const SupportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supportList, setSupportList] = useState([]);
  const [listCheck, setListCheck] = useState(false);

  useEffect(() => {
    const f = async () => {
      const res = await supportGetList(id);
      setSupportList(res);
      if (!supportList || supportList.length === 0) setListCheck(false);
    };
    f();
  }, [id]);

  const supportPageHandler = () => {
    navigate(`/member/${id}/support/write`);
  };

  const detailPageHandler = () => {
    navigate(`/member/${id}/support/detail`);
  };

  return (
    <div>
      <SupportComponent
        supportPageHandler={supportPageHandler}
        supportList={supportList}
        listCheck={listCheck}
        detailPageHandler={detailPageHandler}
      />
    </div>
  );
};

export default SupportPage;
