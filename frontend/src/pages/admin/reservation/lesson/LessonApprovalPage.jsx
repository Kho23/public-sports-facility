import React, { useEffect, useState } from "react";
import { getLessonList } from "../../../../api/adminApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import LessonApprovalComponent from "./components/LessonApprovalComponent";

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
const LessonApprovalPage = () => {
  const [data, setData] = useState(initState);
  const [category, setCategory] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const { moveToAdminLessonDetail } = useCustomMove();
  const { page, size, moveToList } = usePageMove();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLessonList({
          page,
          size,
          keyword,
          type: category,
          role: statusFilter,
        });
        setData(res);
      } catch (err) {
        console.error("강의개설 리스트 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [page, size]);

  const handleFilterChange = async (e) => {
    const value = e.target.value;
    const newValue = statusFilter === value ? null : value;
    setStatusFilter(newValue);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getLessonList({
        page,
        size,
        keyword,
        type: category,
        role: statusFilter,
      });
      setData(res);
    } catch (err) {
      console.error("파트너 리스트 불러오기 실패:", err);
    }
  };

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
      <LessonApprovalComponent
        handleSearchSubmit={handleSearchSubmit}
        category={category}
        setCategory={setCategory}
        keyword={keyword}
        setKeyword={setKeyword}
        statusFilter={statusFilter}
        handleFilterChange={handleFilterChange}
        data={data}
        moveToAdminLessonDetail={moveToAdminLessonDetail}
        page={page}
        size={size}
        renderStatus={renderStatus}
        moveToList={moveToList}
      />
    </>
  );
};

export default LessonApprovalPage;
