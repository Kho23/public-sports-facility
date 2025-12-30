import React, { useEffect, useState } from "react";
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../../../api/adminApi";
import usePageMove from "../../../../hooks/usePageMove";
import ScheduleListComponent from "./ScheduleListComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

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

  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "alert",
    onConfirm: null,
  });

  const openMessageModal = ({ message, type = "alert", onConfirm }) => {
    setModal({ open: true, message, type, onConfirm });
  };

  const closeMessageModal = () => {
    setModal({ ...modal, open: false });
  };

  useEffect(() => {
    const f = async () => {
      try {
        const response = await getScheduleList({ page, size });
        setSchedules(response);
      } catch (err) {
        openMessageModal({ message: "데이터 로딩 실패" });
      }
    };
    f();
  }, [page, size]);

  const openFormModal = (schedule) => {
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

  const handleDelete = (scheduleId) => {
    openMessageModal({
      message: "정말 삭제하시겠습니까?",
      type: "confirm",
      onConfirm: async (result) => {
        if (result === "ok") {
          try {
            await deleteSchedule(scheduleId);
            openMessageModal({
              message: "삭제되었습니다.",
              onConfirm: () => window.location.reload(),
            });
          } catch {
            openMessageModal({ message: "삭제 중 오류 발생" });
          }
        }
      },
    });
  };

  const handleSave = async () => {
    if (!data.title || !data.startDate || !data.endDate) {
      openMessageModal({ message: "제목과 날짜는 필수입니다." });
      return;
    }

    try {
      if (currentSchedule) {
        await updateSchedule(currentSchedule.scheduleId, data);
        openMessageModal({
          message: "수정 완료",
          onConfirm: () => window.location.reload(),
        });
      } else {
        await createSchedule(data);
        openMessageModal({
          message: "등록 완료",
          onConfirm: () => window.location.reload(),
        });
      }
      setIsModalOpen(false);
    } catch {
      openMessageModal({ message: "저장 실패" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <ScheduleListComponent
        openModal={openFormModal}
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

      {modal.open && (
        <ModalComponent
          message={modal.message}
          type={modal.type}
          onConfirm={(result) => {
            modal.onConfirm?.(result);
            closeMessageModal();
          }}
        />
      )}
    </>
  );
};

export default ScheduleListPage;
