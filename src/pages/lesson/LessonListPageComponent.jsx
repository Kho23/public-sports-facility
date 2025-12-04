import React, { useEffect, useState } from 'react'
import ClassItem from './ClassItem';
import { getLessonList } from '../../api/classApi';
import PageComponent from '../../components/common/page/PageComponent';
import { useSearchParams } from 'react-router-dom';
// src/pages/course/mockData.js

const initState = {
  dtoList: [],        // LessonListResDTO 배열이 들어올 곳
  pageNumList: [],    // 페이지 번호 리스트 ([1, 2, 3...])
  pageRequestDTO: null,
  prev: false,        // 이전 버튼 활성화 여부
  next: false,        // 다음 버튼 활성화 여부
  totalCnt: 0,        // 전체 데이터 개수
  prevPage: 0,        // 이전 페이지 번호
  nextPage: 0,        // 다음 페이지 번호
  totalPage: 0,       // 전체 페이지 수
  current: 1          // 현재 페이지
};
const LessonListPageComponent = () => {
  const [classes, setClasses] = useState([])
  const [searchParam, setSearchParam] = useSearchParams();
  const [pageData, setPageData] = useState({})
  const [searchTerm, setSearchTerm] = useState(() => searchParam.get("keyword") || "")//검색어
  const [searchType, setSearchType] = useState(() => searchParam.get("type") || "c")//강좌명/강사명 검색
  const [sortType, setSortType] = useState(() => searchParam.get("sort") || "LATEST")//정렬기준 최신순을 기본으로
  useEffect(() => {
    try {
      const get = async () => {
        const paramObj = {
          page: searchParam.get("page") || 1,
          size: searchParam.get("size") || 10,
          type: searchParam.get("type") || "c",
          keyword: searchParam.get("keyword") || "",
          sort: searchParam.get("sort") || "LATEST"
        }
        const data = await getLessonList(paramObj)
        console.log("백엔드에서 온 데이터", data)
        setClasses(data.dtoList.filter(i=>i.status=="ACCEPTED"))
        setPageData({
          pageNumList: data.pageNumList,
          prev: data.prev,
          next: data.next,
          current: data.current,
          totalCnt: data.totalCnt,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          totalPage: data.totalPage
        })
      }; get()
    } catch (error) {
      console.log(error)
    }
  }, [searchParam])

  const handleSearchSubmit = () => {
    setSearchParam({
      page: 1,
      size: 10,
      type: searchType,
      keyword: searchTerm,
      sort: sortType
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortType(newSort);
    setSearchParam({
      page: 1, // 정렬 바꾸면 1페이지로
      size: 10,
      type: searchType,
      keyword: searchTerm,
      sort: newSort
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8 border-b pb-4 border-gray-800">
        수강신청
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">

        <div className="font-bold text-gray-700 mb-4 md:mb-0">
          총 <span className="text-blue-600">{pageData && pageData.totalCnt ? pageData.totalCnt : 0}</span>개 강좌
        </div>

        <div className="flex gap-2 w-full md:w-auto">

          {/* 4. [추가] 검색 조건 선택 드롭다운 */}
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="t">강좌명</option>
            <option value="c">강사명</option>
          </select>

          {/* 검색어 입력창 */}
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearchSubmit}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            검색
          </button>

          {/* 정렬 버튼 */}
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="LATEST">개강일 빠른순</option>
            <option value="FASTEST">개강일 늦은순</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {classes && classes.length > 0 ? (
          classes.map((course) => (
            <ClassItem key={course.id} classes={course} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
      <PageComponent pageData={pageData} />
    </div>
  )
}

export default LessonListPageComponent








