import React, { useEffect, useState } from "react";
import { getAllListSupport } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";

const SupportListPage = () => {
  const [data, setData] = useState([]);
  const { moveToAdminSupportDetail } = useCustomMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllListSupport();
        setData(res);
      } catch (err) {
        console.error("문의내역 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case "WAITING":
        return (
          <span className="px-2 py-1 rounded-lg text-black-800 bg-gray-200 font-semibold">
            답변 대기
          </span>
        );
      case "ANSWERED":
        return (
          <span className="px-2 py-1 rounded-lg text-green-800 bg-green-50 font-semibold">
            답변 완료
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        1:1 문의내역
      </h1>
      <div className="text-sm mb-2">총 {data.length}건</div>
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-20">번호</th>
            <th className="p-3">작성자</th>
            <th className="p-3">제목</th>
            <th className="p-3">접수일</th>
            <th className="p-3">상태</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                1:1 문의 내역이 없습니다.
              </td>
            </tr>
          ) : (
            data.map((i, idx) => (
              <tr
                key={i.supportNo}
                onClick={() => moveToAdminSupportDetail(i.supportNo)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">{idx + 1}</td>
                <td className="p-3 text-sm text-gray-600">
                  {i.member?.memberName} ( {i.member?.memberLoginId} )
                </td>
                <td className="p-3 text-sm text-gray-700">{i.supportTitle}</td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(i.createdDate).toLocaleDateString().slice(0, -1)}
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

export default SupportListPage;
