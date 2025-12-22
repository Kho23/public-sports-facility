import React, { useEffect, useState } from "react";
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../../../api/adminApi";
import usePageMove from "../../../../hooks/usePageMove";
import ScheduleListComponent from "./ScheduleListComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCnt: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};
const ScheduleListPage = () => {
  const [schedules, setSchedules] = useState(initState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const { page, size, moveToList } = usePageMove();

  const [data, setData] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const f = async () => {
      try {
        const response = await getScheduleList({ page, size });
        setSchedules(response);
      } catch (err) {
        console.error("스케줄 데이터 로딩 실패:", err);
      }
    };
    f();
  }, [page, size]);

  const openModal = (schedule) => {
    if (schedule) {
      setCurrentSchedule(schedule);
      setData({
        title: schedule.title,
        content: schedule.content,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
      });
    } else {
      setCurrentSchedule(null);
      setData({
        title: "",
        content: "",
        startDate: "",
        endDate: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (scheduleId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteSchedule(scheduleId);
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (err) {
        alert("삭제 중 오류!");
      }
    }
  };

  const handleSave = async () => {
    if (!data.title || !data.startDate || !data.endDate) {
      alert("제목과 날짜는 반드시 입력해주세요.");
      return;
    }
    try {
      if (currentSchedule) {
        await updateSchedule(currentSchedule.scheduleId, data);
        alert("수정 완료");
      } else {
        await createSchedule(data);
        alert("등록 완료");
      }
      setIsModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장 중 오류 발생");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <ScheduleListComponent
      openModal={openModal}
      schedules={schedules}
      page={page}
      size={size}
      handleDelete={handleDelete}
      moveToList={moveToList}
      isModalOpen={isModalOpen}
      currentSchedule={currentSchedule}
      handleChange={handleChange}
      data={data}
      setIsModalOpen={setIsModalOpen}
      handleSave={handleSave}
    />
  );
};

export default ScheduleListPage;
