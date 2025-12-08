import React, { useEffect, useState } from "react";
import AttendanceComponent from "./components/AttendanceComponent";
import { useParams } from "react-router-dom";
import { getMyOneLesson } from "../../../api/partnerApi";
import { getLessonList, submitAttendance } from "../../../api/attendanceApi";

const AttendancePage = () => {
  const { lessonNo } = useParams();
  const [data, setData] = useState({});
  const [category, setCategory] = useState("");
  const [selectDate, setSelectDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [attendance, setAttendance] = useState([]);

  const categoryName = [
    { facilityType: "POOL", facilityName: "수영" },
    { facilityType: "HEALTH", facilityName: "헬스" },
    { facilityType: "GOLF", facilityName: "골프" },
    { facilityType: "FUTSAL", facilityName: "풋살" },
    { facilityType: "DANCE", facilityName: "무용" },
  ];

  useEffect(() => {
    const f = async () => {
      const res = await getMyOneLesson(lessonNo);
      const res2 = await getLessonList(lessonNo, selectDate);
      setData(res);
      setAttendance(
        res2.map((i) => ({
          studentNo: i.studentNo,
          attendanceId: i.attendanceId,
          name: i.name,
          attendanceDate: selectDate,
          memo: "",
          status: null,
        }))
      );
      console.log("attendance", attendance);
    };
    f();
  }, [lessonNo, selectDate]);

  useEffect(() => {
    setAttendance((i) =>
      i.map((j) => ({
        ...j,
        attendanceDate: selectDate,
      }))
    );
  }, [selectDate]);

  useEffect(() => {
    console.log("attendance", attendance);
  }, [attendance]);

  useEffect(() => {
    if (!data?.facilityType) return;
    setCategory(
      categoryName?.find((i) => i.facilityType === data.facilityType)
        .facilityName
    );
  }, [data.facilityType]);

  const selectDateHandler = (e) => {
    setSelectDate(e.target.value);
  };

  const setAttendanceHandler = (studentNo, e) => {
    const { name, value } = e.target;
    setAttendance((i) =>
      i.map((j) => (j.studentNo === studentNo ? { ...j, [name]: value } : j))
    );
  };

  const submitHandler = async () => {
    const res = await submitAttendance(attendance, lessonNo);
    alert("출석이 저장되었습니다.");
  };

  return (
    <div>
      <AttendanceComponent
        data={data}
        category={category}
        attendance={attendance}
        selectDate={selectDate}
        selectDateHandler={selectDateHandler}
        setAttendanceHandler={setAttendanceHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default AttendancePage;
