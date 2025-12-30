import React, { useEffect, useState } from "react";
import { getNoticeList } from "../../../../api/noticeApi";
import useCustomMove from "../../../../hooks/useCustomMove";
import usePageMove from "../../../../hooks/usePageMove";
import NoticeListComponent from "./Components/NoticeListComponent";

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
const NoticeListPage = () => {
  const [notices, setNotices] = useState(initState);
  const [category, setCategory] = useState("t");
  const [keyword, setKeyword] = useState("");
  const { page, size, moveToList } = usePageMove();
  const { moveToAdminNoticeDetail } = useCustomMove();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getNoticeList({
          page,
          size,
          keyword,
          type: category,
        });
        setNotices(data);
      } catch (error) {
        console.log("공지사항을 불러올 수 없습니다. 에러내용:", error);
      }
    };
    getData();
  }, [page, size]);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await getNoticeList({
        page: 1,
        size: 10,
        keyword,
        type: category,
      });
      setNotices(res);
    } catch (err) {
      console.error("문의내역 리스트 불러오기 실패:", err);
    }
  };

  return (
    <>
      <NoticeListComponent
        searchSubmitHandler={searchSubmitHandler}
        category={category}
        setCategory={setCategory}
        keyword={keyword}
        setKeyword={setKeyword}
        notices={notices}
        moveToAdminNoticeDetail={moveToAdminNoticeDetail}
        page={page}
        size={size}
        moveToList={moveToList}
      />
    </>
  );
};

export default NoticeListPage;
