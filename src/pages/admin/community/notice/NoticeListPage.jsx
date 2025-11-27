import React, { useEffect, useState } from "react";
import { formatter, getNoticeList } from "../../../../api/noticeApi";

import { Link, useSearchParams } from "react-router-dom";
import useCustomMove from "../../../../hooks/useCustomMove";

const NoticeListPage = () => {
  const [notices, setNotices] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchingTitle, setSearchingTitle] = useState(
    () => searchParam.get("query") || ""
  );
  const [submitSearchingTitle, setSubmitSearchingTitle] = useState(
    () => searchParam.get("query") || ""
  );
  const [category, setCategory] = useState(
    () => searchParam.get("category") || 1
  );
  const [submitCategory, setSubmitCategory] = useState(
    () => searchParam.get("category") || 1
  );
  const { moveToAdminNoticeDetail } = useCustomMove();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getNoticeList();
        setNotices(data);
      } catch (error) {
        console.log("공지사항을 불러올 수 없습니다. 에러내용:", error);
      }
    };
    getData();
  }, []);

  const handleSearchChange = (e) => {
    console.log("필터변경중", e.target.value);
    setSearchingTitle(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("버튼눌림 검색어", searchingTitle);
    setSubmitSearchingTitle(searchingTitle);
    setSubmitCategory(category);
    setSearchParam({ query: searchingTitle, category: category });
    console.log(filteredNotice);
  };

  const filteredNotice = notices
    .filter((i) => {
      const data = submitSearchingTitle.toLowerCase();
      if (!data) return true;
      if (submitCategory == 1) return i.title.toLowerCase().includes(data);
      if (submitCategory == 2) return i.content.toLowerCase().includes(data);
      if (submitCategory == 3)
        return (
          i.title.toLowerCase().includes(data) ||
          i.content.toLowerCase().includes(data)
        );
      return false;
    })
    .reverse();

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // --- 🎨 여기부터 디자인 적용된 JSX ---
  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* 1. 페이지 제목 */}
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        공지사항
      </h1>

      {/* 2. 검색 폼 */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={category}
          onChange={handleCategory}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="1">제목</option>
          <option value="2">내용</option>
          <option value="3">제목+내용</option>
        </select>

        <input
          type="text"
          name="searchingTitle"
          value={searchingTitle}
          placeholder="검색어 키워드를 입력하세요"
          onChange={(e) => handleSearchChange(e)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />

        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>

      {/* 3. 총 게시물 수 */}
      <div className="text-sm mb-2">총 {filteredNotice.length}건</div>

      {/* 4. 공지사항 테이블 */}
      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">번호</th>
            <th className="p-3">제목</th>
            <th className="p-3">등록일</th>
            <th className="p-3">조회수</th>
          </tr>
        </thead>
        <tbody>
          {/* 5. .map() 루프: 로직은 동일, 태그만 <tr>로 변경 */}
          {filteredNotice.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-8 text-center text-gray-500">
                검색된 공지사항이 없습니다.
              </td>
            </tr>
          ) : (
            filteredNotice.map((i) => (
              <tr
                key={i.noticeId} // key는 map의 최상위 요소에
                onClick={() => moveToAdminNoticeDetail(i.noticeId)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">{i.noticeId}</td>
                <td className="p-3 text-sm text-gray-600">{i.title}</td>
                <td className="p-3 text-sm text-gray-600">{formatter(i)}</td>
                <td className="p-3 text-sm text-gray-600">{i.viewCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end mr-4">
        <Link
          type="button"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 mt-4 hover:bg-gray-800 "
          to={`add`}
        >
          공지사항 추가
        </Link>
      </div>
    </div>
  );
};

export default NoticeListPage;
