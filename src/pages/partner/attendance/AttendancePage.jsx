import React, { useEffect, useState } from "react";
import AttendanceComponent from "./components/AttendanceComponent";
import { useParams } from "react-router-dom";
import { getMyOneLesson } from "../../../api/partnerApi";
import { getLessonList, submitAttendance } from "../../../api/attendanceApi";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const AttendancePage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });
  const categoryName = [
    { facilityType: "POOL", facilityName: "수영" },
    { facilityType: "HEALTH", facilityName: "헬스" },
    { facilityType: "GOLF", facilityName: "골프" },
    { facilityType: "FUTSAL", facilityName: "풋살" },
    { facilityType: "DANCE", facilityName: "무용" },
  ];
  const { lessonNo } = useParams();
  const [data, setData] = useState({});
  const [category, setCategory] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [selectDate, setSelectDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getMyOneLesson(lessonNo);
        const res2 = await getLessonList(lessonNo, selectDate);
        setData(res);
        setAttendance(
          res2.map((i) => ({
            studentNo: i.studentNo,
            attendanceId: i.attendanceId,
            name: i.name,
            attendanceDate: selectDate,
            memo: i.memo,
            status: i.status,
          }))
        );
      } catch (err) {
        console.error("출석 데이터 조회 실패", err);
        alert("출석 정보를 불러오는 중 오류가 발생했습니다.");
      }
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
    try {
      await submitAttendance(attendance, lessonNo);
      setAlertModal({
        open: true,
        type: "alert",
        message: "출석이 저장되었습니다.",
        onConfirm: () => {
          setAlertModal((i) => ({ ...i, open: false }));
          window.location.reload();
        },
      });
    } catch (err) {
      console.error("출석 저장 실패", err);
    }
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
      {alertModal.open && (
        <ModalComponent
          type={alertModal.type}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
};

export default AttendancePage;
