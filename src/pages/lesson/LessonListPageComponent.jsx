import React, { useEffect, useState } from 'react';
import ClassItem from './ClassItem';
import { getLessonList } from '../../api/classApi';
import PageComponent from '../../components/common/page/PageComponent';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';

const LessonListPageComponent = () => {
  const [classes, setClasses] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [pageData, setPageData] = useState({});
  const [searchTerm, setSearchTerm] = useState(() => searchParam.get("keyword") || "");
  const [searchType, setSearchType] = useState(() => searchParam.get("type") || "c");
  const [sortType, setSortType] = useState(() => searchParam.get("sort") || "LATEST");
  const [category, setCategory] = useState(() => searchParam.get("category") || "");
  const [startTime, setStartTime] = useState(() => searchParam.get("startTime") || "");
  const [endTime, setEndTime] = useState(() => searchParam.get("endTime") || "");
  const [days, setDays] = useState(() => searchParam.getAll("days") || [])
  const [available, setAvailable] = useState(() => searchParam.get("available")=="true" || false)



  useEffect(() => {
    try {
      const get = async () => {
        const paramObj = {
          page: 1,
          size: 10,
          type: searchType,
          keyword: searchTerm,
          sort: sortType,
          category: category,
          startTime: startTime,
          endTime: endTime,
          days: days,
          available: available
        };
        const data = await getLessonList(paramObj);
        console.log("백엔드에서 온 데이터", data);
        setClasses(data.dtoList.filter(i => i.status === "ACCEPTED"));
        setPageData({
          pageNumList: data.pageNumList,
          prev: data.prev,
          next: data.next,
          current: data.current,
          totalCnt: data.totalCnt,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          totalPage: data.totalPage
        });
      };
      get();
    } catch (error) {
      console.log(error);
    }
  }, [searchParam]);

  const handleSearchSubmit = () => {
    setSearchParam({
      page: 1,
      size: 10,
      type: searchType,
      keyword: searchTerm,
      sort: sortType,
      category: category,
      startTime: startTime,
      endTime: endTime,
      days: days,
      available: available
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortType(newSort);
    setSearchParam();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Breadcrumb Navigation (Reference Style) */}
        <nav className="text-sm text-gray-500 mb-6">
          홈 &gt; 수강신청 &gt; 강좌검색
        </nav>

        {/* Page Title (Reference Style) */}
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">수강신청</h1>
        </div>
        <p className="text-gray-500 mb-8">다양한 스포츠 강좌를 검색하고 신청하세요.</p>

        {/* Filter & Search Section (Reference Container Style) */}
        <div className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 pb-3 mb-5 border-b border-gray-300">
            강좌 검색
          </h2>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* 검색 조건 선택 */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-gray-700 font-semibold mb-1 text-sm">검색 조건</label>
              <select
                className="w-full md:w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="t">강좌명</option>
                <option value="c">강사명</option>
              </select>
            </div>

            {/* 검색어 입력창 */}
            <div className="flex flex-col flex-1 w-full">
              <label className="text-gray-700 font-semibold mb-1 text-sm">검색어</label>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* 정렬 선택 */}
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-gray-700 font-semibold mb-1 text-sm">정렬</label>
              <select
                className="w-full md:w-40 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900"
                value={sortType}
                onChange={handleSortChange}
              >
                <option value="LATEST">개강일 빠른순</option>
                <option value="FASTEST">개강일 늦은순</option>
              </select>
            </div>

            {/* 검색 버튼 (Reference Button Style) */}
            <button
              onClick={handleSearchSubmit}
              className="w-full md:w-auto bg-blue-900 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition focus:outline-none focus:ring-1 focus:ring-blue-900 h-[42px]"
            >
              검색
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            ※ 원하는 강좌를 검색하여 상세 정보를 확인하세요.
          </p>
        </div>

        {/* Total Count & Content Area */}
        <div className="mb-4 flex items-center gap-2 text-gray-700 font-medium">
          <SlidersHorizontal className="w-5 h-5 text-blue-900" />
          <span>총 <span className="text-blue-900 font-bold text-lg">{pageData && pageData.totalCnt ? pageData.totalCnt : 0}</span>개의 강좌</span>
        </div>

        {/* Class List */}
        <div className="space-y-4 min-h-[500px]">
          {classes && classes.length > 0 ? (
            classes.map((course) => (
              <ClassItem key={course.id} classes={course} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-300 text-center">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium text-lg">검색된 강좌가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">다른 검색어나 카테고리로 다시 시도해보세요.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-10 mb-20">
          <PageComponent pageData={pageData} />
        </div>
      </div>
    </div>
  );
};

export default LessonListPageComponent;