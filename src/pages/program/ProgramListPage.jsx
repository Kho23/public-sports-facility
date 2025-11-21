import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getOne } from "../../api/programApi";
import ProgramListPageComponent from "./ProgramListPageComponent";

const initState = {
  content: "",
  programeName: "",
};

const ProgramListPage = () => {
  const { programId } = useParams();
  const [data, setData] = useState(initState);
  const location = useLocation();
  const adminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOne(programId);
        console.log("가져온 Data", res);
        setData(res);
      } catch (error) {
        console.error("가져오기 실패", error);
      }
    };
    f();
  }, [programId]);

  return (
    <div>
      <ProgramListPageComponent
        data={data}
        adminPage={adminPage}
        programId={programId}
      />
    </div>
  );
};

export default ProgramListPage;
