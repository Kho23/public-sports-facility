import React, { useEffect, useState } from "react";
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../../../api/adminApi";
import usePageMove from "../../../../hooks/usePageMove";
import PageComponent from "../../../../components/common/PageComponent";

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

  // 모달 열기
  const openModal = (schedule) => {
    if (schedule) {
      // 수정 모드
      setCurrentSchedule(schedule);
      setData({
        title: schedule.title,
        content: schedule.content,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
      });
    } else {
      // 등록 모드
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

  // 삭제
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

  // 저장
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

  // 입력 변경 공통 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="container mx-auto max-w-full p-2 md:p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">일정 관리</h1>
        <button
          onClick={() => openModal(null)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 font-medium"
        >
          + 일정 등록
        </button>
      </div>

      <div className="text-sm mb-2">총 {schedules.totalCnt}건</div>

      {/* 리스트 테이블 */}
      <table className="w-full text-center border-t-2 border-gray-700 table-fixed">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-16">번호</th>
            <th className="p-3 w-50">제목</th>
            <th className="p-3 w-50">기간</th>
            <th className="p-3">내용</th>
            <th className="p-3 w-32">관리</th>
          </tr>
        </thead>

        <tbody>
          {schedules.dtoList.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-gray-500">
                등록된 스케줄이 없습니다.
              </td>
            </tr>
          ) : (
            schedules.dtoList.map((schedule, idx) => (
              <tr
                key={schedule.scheduleId}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 text-sm text-gray-600">
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm font-medium text-gray-700">
                  {schedule.title}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {schedule.startDate} ~ {schedule.endDate}
                </td>

                <td className="p-3 text-sm text-gray-500 text-left line-clamp-1 truncate">
                  {schedule.content}
                </td>

                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(schedule)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:bg-white"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.scheduleId)}
                      className="px-2 py-1 text-xs border border-red-200 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <PageComponent serverData={schedules} movePage={moveToList} />

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              {currentSchedule ? "스케줄 수정" : "스케줄 등록"}
            </h2>

            <div className="space-y-4">
              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  placeholder="일정 제목"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea
                  name="content"
                  value={data.content}
                  onChange={handleChange}
                  rows="4"
                  placeholder="세부 내용을 입력하세요"
                  className="w-full border border-gray-300 p-2 rounded resize-none"
                ></textarea>
              </div>

              {/* 날짜 */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    시작일
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={data.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    종료일
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={data.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleListPage;
