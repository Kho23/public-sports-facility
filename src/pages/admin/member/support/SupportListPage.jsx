import React, { useEffect, useState } from "react";
import { getAllListSupport } from "../../../../api/adminApi";
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
const SupportListPage = () => {
  const [data, setData] = useState(initState);
  const [type, setType] = useState("name");
  const [keyword, setKeyword] = useState("");
  const { moveToAdminSupportDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllListSupport({
          page,
          size,
          keyword,
          type,
        });
        setData(res);
      } catch (err) {
        console.error("문의내역 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await getAllListSupport({ page: 1, size: 10, keyword, type });
      setData(res);
    } catch (err) {
      console.error("문의내역 리스트 불러오기 실패:", err);
    }
  };

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
    <div className="container mx-auto max-w-full p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        1:1 문의내역
      </h1>

      <form
        onSubmit={searchSubmitHandler}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="name">이름</option>
          <option value="title">제목</option>
        </select>

        <input
          type="text"
          name="keyword"
          value={keyword}
          placeholder="검색어를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />

        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      <div className="text-sm mb-2">총 {data.totalCnt}건</div>
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
          {data.dtoList.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                1:1 문의 내역이 없습니다.
              </td>
            </tr>
          ) : (
            data.dtoList.map((i, idx) => (
              <tr
                key={i.supportNo}
                onClick={() => moveToAdminSupportDetail(i.supportNo)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {" "}
                  {(page - 1) * size + (idx + 1)}
                </td>
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
      <PageComponent serverData={data} movePage={moveToList} />
    </div>
  );
};

export default SupportListPage;
