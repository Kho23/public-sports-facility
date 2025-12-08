import React, { useEffect, useState } from 'react';
import ClassItem from './ClassItem';
import { getLessonList } from '../../api/classApi';
import PageComponent from '../../components/common/page/PageComponent';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';


const CATEGORY = [
  {label:"전체", value:'' },
  {label:"풋살", value:'풋살장' },
  {label:"무용", value:'무용실' },
  {label:"헬스", value:'헬스장' },
  {label:"수영", value:'수영장' },
  {label:"골프", value:'골프장' },
]
const DAY = [
  {label:"월", value:'MON'},
  {label:"화", value:'TUE'},
  {label:"수", value:'WED'},
  {label:"목", value:'THU'},
  {label:"금", value:'FRI'},
  {label:"토", value:'SAT'},
  {label:"일", value:'SUN'},
]
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
  const [available, setAvailable] = useState(() => searchParam.get("available") == "true" || false)



  useEffect(() => {
    try {
      const get = async () => {
        const currentPage = searchParam.get("page") || 1
        const paramObj = {
          page: currentPage,
          size: searchParam.get("size") || 10,
          type: searchParam.get("type") || "t",
          keyword: searchParam.get("keyword") || "",
          sort: searchParam.get("sort") || "LATEST",
          category: searchParam.get("category") || "",
          startTime: searchParam.get("startTime"),
          endTime: searchParam.get("endTime"),
          days: searchParam.getAll("days"),
          available: searchParam.get("available") === "true"
        };
        const data = await getLessonList(paramObj);
        console.log("백엔드에서 온 데이터", data);
        setClasses(data.dtoList);
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

  const handleSelectDay = (dayVal) =>{
    if(days.includes(dayVal)){
      setDays(days.filter(day=>day!=dayVal))
    }else{
      setDays([...days, dayVal])
    }
  }
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* 네비게이션 & 타이틀 */}
        <nav className="text-sm text-gray-500 mb-6">
          홈 &gt; 수강신청 &gt; 강좌검색
        </nav>

        <div className="flex items-end justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">수강신청</h1>
        </div>
        <p className="text-gray-500 mb-8">다양한 스포츠 강좌를 검색하고 신청하세요.</p>

        {/* 1. 카테고리 탭 (검색 박스 위) */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORY.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                ${category === cat.value 
                  ? 'bg-blue-900 text-white border-blue-900 shadow-md transform scale-105' 
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2. 메인 검색 필터 박스 */}
        <div className="border border-gray-300 rounded-xl p-6 mb-8 bg-white shadow-sm">
          
          <div className="space-y-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
               
               {/* 요일 선택 */}
               <div className="flex-1">
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">요일 선택</label>
                  <div className="flex gap-2 flex-wrap">
                    {DAY.map((day) => (
                      <button
                        key={day.value}
                        onClick={() => handleSelectDay(day.value)}
                        className={`w-9 h-9 rounded-full text-sm font-bold transition-all border
                          ${days.includes(day.value)
                            ? 'bg-blue-100 text-blue-700 border-blue-200 ring-2 ring-blue-50'
                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600'}`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
               </div>

               {/* 시간 범위 */}
               <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">시간대</label>
                  <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                    <input 
                      type="time" 
                      value={startTime} 
                      onChange={(e) => setStartTime(e.target.value)}
                      className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none p-1"
                    />
                    <span className="text-gray-400 text-sm">~</span>
                    <input 
                      type="time" 
                      value={endTime} 
                      onChange={(e) => setEndTime(e.target.value)}
                      className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none p-1"
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* 하단: 검색어 & 버튼 & 정렬 (구분선 추가) */}
          <div className="flex flex-col md:flex-row gap-3 pt-5 border-t border-gray-100 items-end">
            
            {/* 조건 Select */}
            <div className="md:w-28 w-full">
              <label className="text-xs font-bold text-gray-500 mb-1 block">검색 조건</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="t">강좌명</option>
                <option value="c">강사명</option>
              </select>
            </div>

            {/* 검색어 Input */}
            <div className="flex-1 w-full relative">
              <label className="text-xs font-bold text-gray-500 mb-1 block">검색어</label>
              <Search className="absolute left-3 top-[2.1rem] transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* 정렬 Select */}
            <div className="md:w-32 w-full">
               <label className="text-xs font-bold text-gray-500 mb-1 block">정렬</label>
               <select
                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none"
                 value={sortType}
                 onChange={handleSortChange}
               >
                 <option value="LATEST">최신순</option>
                 <option value="FASTEST">개강일순</option>
               </select>
            </div>

            {/* 검색 버튼 */}
            <button
              onClick={handleSearchSubmit}
              className="w-full md:w-auto bg-blue-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 active:scale-95 transition-all shadow-md h-[42px]"
            >
              검색
            </button>
          </div>

          {/* 접수 가능만 보기 체크박스 */}
          <div className="flex justify-end mt-3">
             <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input 
                  type="checkbox" 
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="w-4 h-4 accent-blue-900 cursor-pointer"
                />
                <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-900 transition-colors">
                  접수 가능한 강좌만 보기
                </span>
             </label>
          </div>

        </div>

        {/* Total Count */}
        <div className="mb-4 flex items-center gap-2 text-gray-700 font-medium">
            <SlidersHorizontal className="w-5 h-5 text-blue-900" />
            <span>총 <span className="text-blue-900 font-bold text-lg">{pageData?.totalCnt || 0}</span>개의 강좌</span>
        </div>

        {/* Class List */}
        <div className="space-y-4 min-h-[500px]">
          {classes && classes.length > 0 ? (
            classes.map((course) => (
              <ClassItem key={course.lessonId} classes={course} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-300 text-center">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium text-lg">검색된 강좌가 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">다른 검색 조건으로 다시 시도해보세요.</p>
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