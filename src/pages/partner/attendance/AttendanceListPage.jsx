import React, { useEffect, useState } from "react";
import AttendanceListComponent from "./components/AttendanceListComponent";
import { getMyLessons, getMySearchLesson } from "../../../api/partnerApi";

const AttendanceListPage = () => {
  const [data, setData] = useState([]);
  const [titleForSearch, setTitleForSearch] = useState("");

  useEffect(() => {
    const f = async () => {
      const res = await getMyLessons();
      setData(res);
    };
    f();
  }, []);

  const setSearchTitle = (e) => {
    setTitleForSearch(e.target.value);
  };

  const searchHandler = async () => {
    if (!titleForSearch.trim) {
      const res = await getMyLessons();
      setData(res);
    }

    const res = await getMySearchLesson(titleForSearch);
    setData(res);
  };

  const resetHandler = async () => {
    const res = await getMyLessons();
    setData(res);
  };

  return (
    <div>
      <AttendanceListComponent
        data={data}
        setSearchTitle={setSearchTitle}
        searchHandler={searchHandler}
        resetHandler={resetHandler}
      />
    </div>
  );
};

export default AttendanceListPage;
