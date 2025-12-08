import React, { useEffect, useState } from "react";
import { getRentalList } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
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

const RentalApprovalPage = () => {
  const [data, setData] = useState(initState);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { moveToAdminRentalDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRentalList({
          page,
          size,
          keyword,
          status: statusFilter,
          startDate: startDate || null,
          endDate: endDate || null,
        });
        setData(res);
      } catch (err) {
        console.error("대관 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const newValue = statusFilter === value ? null : value;
    setStatusFilter(newValue);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getRentalList({
        page,
        size,
        keyword,
        status: statusFilter,
        startDate: startDate || null,
        endDate: endDate || null,
      });
      setData(res);
    } catch (err) {
      console.error("대관 리스트 불러오기 실패:", err);
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
      case "APPROVED":
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
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        대관 신청내역
      </h1>

      {/* 🔹 검색폼 */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-wrap justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md gap-2"
      >
        <select className="border border-gray-300 rounded px-3 py-2">
          <option value="name">신청자명</option>
        </select>

        <input
          type="text"
          name="keyword"
          value={keyword}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <span>~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <div className="flex items-center gap-2">
          {[
            { label: "미승인", value: "PENDING" },
            { label: "승인", value: "APPROVED" },
            { label: "반려", value: "REJECTED" },
          ].map((item) => (
            <label
              key={item.value}
              className={`px-2 py-1 rounded-md border cursor-pointer text-sm flex items-center justify-center
        ${
          statusFilter === item.value
            ? "bg-gray-800 text-white border-gray-800"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        }
      `}
            >
              <input
                type="checkbox"
                className="hidden"
                value={item.value}
                checked={statusFilter === item.value}
                onChange={handleFilterChange}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      {/* 🔹 총 개수 */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-700">
          총 {data.totalCnt}건
        </div>
      </div>

      {/* 🔹 테이블 */}
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-20">번호</th>
            <th className="p-3">신청자명</th>
            <th className="p-3">대관 시설</th>
            <th className="p-3">대관 날짜</th>
            <th className="p-3">대관 시간</th>
            <th className="p-3">상태</th>
          </tr>
        </thead>

        <tbody>
          {data.dtoList.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-8 text-center text-gray-500">
                등록된 대관 신청이 없습니다.
              </td>
            </tr>
          ) : (
            data.dtoList.map((i, idx) => (
              <tr
                key={i.id}
                onClick={() => moveToAdminRentalDetail(i.id)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">{i.name}</td>
                <td className="p-3 text-sm text-gray-700">{i.facilityName}</td>
                <td className="p-3 text-sm text-gray-600">
                  {i.startTime.slice(0, 10)}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {i.startTime.slice(-8).slice(0, -3)} ~{" "}
                  {i.endTime.slice(-8).slice(0, -3)}
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

export default RentalApprovalPage;
