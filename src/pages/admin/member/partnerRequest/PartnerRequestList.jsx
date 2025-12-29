import React, { useEffect, useState } from "react";
import { getListPartnerRequest } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import PartnerRequestListComponent from "./components/PartnerRequestListComponent";

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
  const { moveToAdminPartnerRequestDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListPartnerRequest({ page, size });
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
      const res = await getListPartnerRequest({
        page,
        size,
        role: newValue,
      });
      setData(res);
    } catch (err) {
      console.error("파트너 리스트 불러오기 실패:", err);
    }
  };

  // 상태 텍스트 + 색상 반환 함수
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
      <PartnerRequestListComponent
        data={data}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        moveToAdminPartnerRequestDetail={moveToAdminPartnerRequestDetail}
        page={page}
        size={size}
        renderStatus={renderStatus}
        moveToList={moveToList}
      />
    </>
  );
};

export default PartnerRequestList;
