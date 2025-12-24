import React, { useEffect, useState } from "react";
import { getRentalList } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";

import RentalApprovalComponent from "./components/RentalApprovalComponent";

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
    <>
      <RentalApprovalComponent
        handleSearchSubmit={handleSearchSubmit}
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        data={data}
        moveToAdminRentalDetail={moveToAdminRentalDetail}
        page={page}
        size={size}
        renderStatus={renderStatus}
        moveToList={moveToList}
      />
    </>
  );
};

export default RentalApprovalPage;
