import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../../../styles/ckeditor-custom.css";

const initstate = {
  content: "",
  title: "",
};

const NoticeAddPage = () => {
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  const [noticeData, setNoticeData] = useState(initstate);
  const [fileList, setFileList] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const files = [...e.target.files];
    setFileList(files);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const f = async () => {
      try {
        let addFiles = [];
        if (fileList && fileList.length > 0) {
          const formData = new FormData();
          fileList.forEach((file) => {
            formData.append("file", file);
          });
          const fileRes = await fileRegister(formData, "notice");
          addFiles = fileRes.fileData.map((fileData, idx) => {
            const savedName = fileData.imageUrl.substring(
              fileData.imageUrl.lastIndexOf("/") + 1
            );
            return {
              originalName: fileList[idx].name,
              savedName: savedName,
              filePath: fileData.imageUrl,
              thumbnailPath: fileData.thumbnailUrl,
            };
          });
          console.log("backend에 파일 내용 전달", fileRes);
        }

        const noticeDataWithFiles = {
          ...noticeData,
          fileList: addFiles,
        };
        const noticeRes = await registerNotice(noticeDataWithFiles);

        console.log("backend에 공지 내용 전달", noticeRes);

        alert("공지 등록 완료");

        navigate(-1);
      } catch (error) {
        console.error("backend 전달 실패", error);
      }
    };
    f();
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* 상단 제목 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">공지사항 추가</h1>
      </div>

      {/* 제목 입력 */}
      <div className="border-t border-b border-gray-300 py-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">
            제목
          </span>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            className="border border-black w-96 text-xl font-bold text-gray-800 px-2 py-1 rounded"
          />
        </div>
        <div className="flex text-sm text-gray-500 space-x-4">
          <span>작성자 : 관리자</span>
        </div>
      </div>

      {/* 내용 입력 */}
      {/* <textarea
        name="content"
        onChange={changeHandler}
        className="min-h-[400px] border border-black bg-white p-8 w-full text-xl font-semibold text-gray-800 mb-6 rounded"
      // /> */}
      <div className="mb-6">
        <CKEditor
          editor={ClassicEditor}
          data={noticeData.content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNoticeData({ ...noticeData, content: data });
          }}
        />
      </div>

      <div className="border-t border-gray-300 pt-4 mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">첨부파일</h3>
        <div className="flex items-center gap-3">
          <label
            htmlFor="noticeFile"
            className="cursor-pointer bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            파일 선택
          </label>
          <span className="text-gray-600 text-sm">
            {fileList.length > 0
              ? `${fileList.length}개 파일 선택됨`
              : "선택된 파일이 없습니다."}
          </span>
        </div>
        <input
          id="noticeFile"
          type="file"
          multiple
          ref={noticeFileRef}
          onChange={fileChangeHandler}
          className="hidden"
        />

        {/* 선택한 파일 목록 표시 (삭제 버튼 제거) */}
        {fileList.length > 0 && (
          <div className="mt-4 text-sm text-gray-700">
            <ul className="space-y-1">
              {fileList.map((file, index) => (
                <li key={index} className="bg-gray-100 px-3 py-1 rounded-md">
                  {file.name}{" "}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end mt-8 gap-x-4">
        <button
          type="submit"
          onClick={submitHandler}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          추가
        </button>
        <Link
          to={-1}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          취소
        </Link>
      </div>
    </div>
  );
};

export default NoticeAddPage;
