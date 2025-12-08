import React, { useEffect, useState } from "react";
import { formatter, getNoticeList, increaseViewCount } from "../../api/noticeApi";
import { useSearchParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../../components/common/page/PageComponent";

const NoticeListPageComponent = () => {
  const [notices, setNotices] = useState([]);
  
  const [pageData, setPageData] = useState({
    pageNumList: [],
    prev: false,
    next: false,
    current: 1,
    totalCnt: 0,
    prevPage: 0,
    nextPage: 0
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [searchingTitle, setSearchingTitle] = useState(() => searchParam.get("keyword") || ""); 
  const [category, setCategory] = useState(() => searchParam.get("type") || "t");

  const { moveToNoticeDetail } = useCustomMove();

  // [수정 포인트 1] 의존성 배열에 .toString() 추가 (확실하게 감지함)
  useEffect(() => {
    const getData = async () => {
      try {
        const page=searchParam.get("page")
        console.log("useEffect가 보고 있는 페이지 번호:", page);
        const paramObj = {
            page: searchParam.get("page") || 1,
            size: searchParam.get("size") || 10,
            type: searchParam.get("type") || "t",
            keyword: searchParam.get("keyword") || ""
        };
        console.log("📡 백엔드로 보낼 데이터:", paramObj);
        const data = await getNoticeList(paramObj);
        console.log("✅ 백엔드에서 받은 데이터:", data);
        setNotices(data.dtoList);
        setPageData({
            pageNumList: data.pageNumList,
            prev: data.prev,
            next: data.next,
            current: data.current,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            totalCnt: data.totalCnt
        });
      } catch (error) {
        console.error("❌ 에러 발생 (백엔드 주소 확인필요):", error);
      }
    };
    getData();
  }, [searchParam.toString()]);

 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParam({ page: 1, size: 10, type: category, keyword: searchingTitle });
  };

  const addViewCount = async (id) => {
      setNotices((prev) => prev.map((n) => n.noticeId === id ? { ...n, viewCount: n.viewCount + 1 } : n));
      try { await increaseViewCount(id); moveToNoticeDetail(id); } catch (e) { console.error(e); }
  };

  const handleSearchChange = (e) => setSearchingTitle(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">공지사항</h1>
      
      <form onSubmit={handleSearchSubmit} className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md">
        <select value={category} onChange={handleCategory} className="border border-gray-300 rounded px-3 py-2">
          <option value="t">제목</option>
          <option value="c">내용</option>
          <option value="tc">제목+내용</option>
        </select>
        <input type="text" value={searchingTitle} onChange={handleSearchChange} placeholder="검색어 입력" className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs" />
        <button type="submit" className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800">검색</button>
      </form>

      <div className="text-sm mb-2">총 {pageData.totalCnt}건</div>

      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr><th className="p-3">번호</th><th className="p-3 text-left w-3/5">제목</th><th className="p-3">등록일</th><th className="p-3">조회수</th></tr>
        </thead>
        <tbody>
          {notices.length === 0 ? (
            <tr><td colSpan="4" className="p-8 text-center text-gray-500">데이터가 없습니다.</td></tr>
          ) : (
            notices.map((i) => (
              <tr key={i.noticeId} onClick={() => addViewCount(i.noticeId)} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="p-3 text-sm text-gray-600">{i.noticeId}</td>
                <td className="p-3 text-left">{i.title}</td>
                <td className="p-3 text-sm text-gray-600">{formatter(i)}</td>
                <td className="p-3 text-sm text-gray-600">{i.viewCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
     <PageComponent pageData={pageData}/>
    </div>
  );
};

export default NoticeListPageComponent;