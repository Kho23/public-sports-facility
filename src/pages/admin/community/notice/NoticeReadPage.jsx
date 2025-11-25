import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { formatter, getOneNotice } from "../../../../api/noticeApi";
import { deleteNotice } from "../../../../api/adminApi";

const initState = {
  content: "",
  createdAt: "",
  noticeId: 0,
  title: "",
  viewCount: 0,
};

const NoticeReadPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(initState);
  const navigate = useNavigate();

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneNotice(id);
        console.log(data);
        setNotice(data);
      } catch (error) {
        console.log("백엔드 데이터 로드 중 오류 발생", error);
      }
    };
    getOne();
  }, [id]);

  const deleteHandler = () => {
    const f = async () => {
      try {
        const res = await deleteNotice(id);
        console.log(res);
        alert("삭제가 완료되었습니다.");
        navigate(-1);
      } catch (error) {
        console.error("삭제 error", error);
      }
    };
    f();
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* 상단 제목 및 아이콘들 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">공지사항</h1>
        <div className="flex space-x-2 text-gray-600">
          {/* 아이콘 예시 (실제 아이콘 라이브러리 필요) */}
          <button className="p-2 hover:bg-gray-100 rounded">
            {/* <FaPrint /> */}
            <span className="text-lg">🖨️</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            {/* <FaShareAlt /> */}
            <span className="text-lg">🔗</span>
          </button>
        </div>
      </div>

      {/* 공지 상세 헤더 */}
      <div className="border-t border-b border-gray-300 py-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          {/* 공지 아이콘 */}
          <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">
            공지
          </span>
          <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>
        </div>
        <div className="flex text-sm text-gray-500 space-x-4">
          <span>작성자 : 관리자</span>
          {notice.createdAt && <span>등록일자 : {formatter(notice)}</span>}
          <span>조회 : {notice.viewCount}</span>
        </div>
      </div>

      <article className="min-h-[400px] border border-gray-300 bg-white p-8 mb-6">
        <div
          className="prose prose-gray max-w-none ck-content"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        ></div>
      </article>

      {notice.fileList && notice.fileList.length > 0 && (
        <div className="border-t border-gray-300 pt-4 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">첨부파일</h3>
          <ul className="space-y-2">
            {notice.fileList.map((file) => (
              <li
                key={file.id}
                className="bg-gray-100 px-3 py-2 rounded-md flex justify-between items-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-800 text-sm font-medium">
                  {file.originalName}
                </span>
                <div className="flex gap-2">
                  <a
                    href={`http://localhost:8080${file.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-xs px-3 py-1 bg-gray-700 rounded hover:bg-gray-800 transition-colors"
                  >
                    미리보기
                  </a>
                  <a
                    href={`http://localhost:8080/download/${file.savedName}`}
                    className="text-white text-xs px-3 py-1 bg-gray-700 rounded hover:bg-gray-800 transition-colors"
                  >
                    다운로드
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="border-t-2 border-black my-6"></div>

      <div className="flex justify-end mt-5 gap-x-4">
        <Link
          to={"/admin/notice"}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          목록
        </Link>

        <Link
          to={`/admin/notice/update/${id}`}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          수정
        </Link>
        <button
          type="button"
          onClick={deleteHandler}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default NoticeReadPage;
