import React, { useEffect, useState } from "react";
import { getLessonList } from "../../../api/adminApi";
import useCustomMove from "../../../hooks/useCustomMove";
import usePageMove from "../../../hooks/usePageMove";
import PageComponent from "../../../components/common/PageComponent";

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
const PartnerRequestList = () => {
  const [data, setData] = useState(initState);
  const [statusFilter, setStatusFilter] = useState(null);
  const { moveToAdminLessonDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLessonList({ page, size });
        setData(res);
      } catch (err) {
        console.error("파트너 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  const handleFilterChange = async (e) => {
    const value = e.target.value;
    const newValue = statusFilter === value ? null : value;
    setStatusFilter(newValue);
    try {
      const res = await getLessonList({
        page,
        size,
        role: newValue,
      });
      setData(res);
    } catch (err) {
      console.error("파트너 리스트 불러오기 실패:", err);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 rounded-lg text-black-800 bg-gray-200 font-semibold">
            심사 중
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="px-2 py-1 rounded-lg text-green-800 bg-green-50 font-semibold">
            승인
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 rounded-lg text-red-800 bg-red-50 font-semibold">
            반려
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto max-w-full p-2 md:p-4">
      {/* 🔹 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        강좌개설 신청내역
      </h1>

      {/* 🔹 총 개수 */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          총 {data.totalCnt}건
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-1 cursor-pointer">
            <input
              type="checkbox"
              value="PENDING"
              checked={statusFilter === "PENDING"}
              onChange={handleFilterChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">미승인</span>
          </label>
          <label className="flex items-center space-x-1 cursor-pointer">
            <input
              type="checkbox"
              value="ACCEPTED"
              checked={statusFilter === "ACCEPTED"}
              onChange={handleFilterChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded"
            />
            <span className=" text-gray-700">승인</span>
          </label>
          <label className="flex items-center space-x-1 cursor-pointer">
            <input
              type="checkbox"
              value="REJECTED"
              checked={statusFilter === "REJECTED"}
              onChange={handleFilterChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded"
            />
            <span className=" text-gray-700">반려</span>
          </label>
        </div>
      </div>

      {/* 🔹 테이블 */}
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-20">번호</th>
            <th className="p-3">강사 이름</th>
            <th className="p-3">강의명</th>
            <th className="p-3">강의 기간</th>
            <th className="p-3">강의 시간</th>
            <th className="p-3">상태</th>
          </tr>
        </thead>

        <tbody>
          {data.dtoList.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                등록된 파트너 신청이 없습니다.
              </td>
            </tr>
          ) : (
            data.dtoList.map((i, idx) => (
              <tr
                key={i.lessonId}
                onClick={() => moveToAdminLessonDetail(i.lessonId)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">{i.partnerName}</td>
                <td className="p-3 text-sm text-gray-700">{i.title}</td>
                <td className="p-3 text-sm text-gray-600">
                  {i.startDate} ~ {i.endDate}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {i.startTime.slice(0, -3)} ~ {i.endTime.slice(0, -3)}
                </td>
                <td className="p-3 text-gray-600">{renderStatus(i.status)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <PageComponent serverData={data} movePage={moveToList} />
    </div>
  );
};

export default PartnerRequestList;
