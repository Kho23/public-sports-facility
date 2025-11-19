import React, { useEffect, useState } from "react";
import { getListPartnerRequest } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";

const PartnerRequestList = () => {
  const [data, setData] = useState([]);
  const { moveToAdminPartnerRequestDetail } = useCustomMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListPartnerRequest();
        setData(res);
      } catch (err) {
        console.error("파트너 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, []);

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
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* 🔹 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        파트너 신청 목록
      </h1>

      {/* 🔹 총 개수 */}
      <div className="text-sm mb-2">총 {data.length}건</div>

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
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                등록된 파트너 신청이 없습니다.
              </td>
            </tr>
          ) : (
            data.map((i) => (
              <tr
                key={i.requestNo}
                onClick={() => moveToAdminPartnerRequestDetail(i.requestNo)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">{i.requestNo}</td>
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
    </div>
  );
};

export default PartnerRequestList;
