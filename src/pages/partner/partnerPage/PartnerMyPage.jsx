import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PartnerMyComponent from "./components/PartnerMyComponent";
import { getOne } from "../../../api/memberApi";

const PartnerMyPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const f = async () => {
      const res = await getOne(id);
      console.log("res", res);
      setData(res);
    };
    f();
  }, [id]);

  return <PartnerMyComponent data={data} />;
};

export default PartnerMyPage;
