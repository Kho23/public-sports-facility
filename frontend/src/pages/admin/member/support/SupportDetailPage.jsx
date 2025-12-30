import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supportGetOne } from "../../../../api/memberApi";
import { registerSupportResponse } from "../../../../api/adminApi";
import SupportDetailComponent from "./components/SupportDetailComponent";

const SupportDetailPage = () => {
  const { no } = useParams();
  const [data, setData] = useState({});
  const [response, setResponse] = useState({
    content: "",
  });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await supportGetOne(no);
        console.log(res);
        setData(res);
      } catch (error) {
        console.log("백엔드 데이터 로드 중 오류 발생", error);
      }
    };
    f();
  }, [no]);

  const addResponseHandler = () => {
    const f = async () => {
      try {
        const res = await registerSupportResponse(no, response);
        console.log(res);
        setData((prev) => ({
          ...prev,
          response: [...prev.response, res],
        }));
        setResponse({ content: "" });
      } catch (error) {
        console.log("백엔드 데이터 로드 중 오류 발생", error);
      }
    };
    f();
    window.location.reload();
  };

  return (
    <>
      <SupportDetailComponent
        data={data}
        response={response}
        setResponse={setResponse}
        addResponseHandler={addResponseHandler}
      />
    </>
  );
};

export default SupportDetailPage;
