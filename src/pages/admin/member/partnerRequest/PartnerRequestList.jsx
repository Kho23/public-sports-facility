import React, { useEffect, useState } from "react";
import { getListPartnerRequest } from "../../../../api/adminApi";
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
    <div className="container mx-auto max-w-full p-2 md:p-4">
      {/* 🔹 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        파트너 신청 목록
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
            <th className="p-3">신청자 이름</th>
            <th className="p-3">신청 종목</th>
            <th className="p-3">신청일</th>
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
                key={i.requestNo}
                onClick={() => moveToAdminPartnerRequestDetail(i.requestNo)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {i.member?.memberName}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {i.partnerClass?.join(", ")}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(i.requestDate).toLocaleDateString()}
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
