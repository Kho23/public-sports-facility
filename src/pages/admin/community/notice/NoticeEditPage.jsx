import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneNotice } from "../../../../api/noticeApi";
import { modifyNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";

const initstate = {
  noticeId: 0,
  content: "",
  createAt: "",
  title: "",
  fileList: [],
};
const NoticeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  const [getOne, setGetOne] = useState(initstate);
  const [fileList, setFileList] = useState([]);
  const [newfileList, setNewFileList] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOneNotice(id);
        console.log("백엔드에서 가져온 데이터", res);
        setGetOne(res);
        setFileList(res.fileList);
      } catch (error) {
        console.error("가져오기실패", error);
      }
    };
    f();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGetOne({ ...getOne, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const files = [...e.target.files];
    setNewFileList((prev) => [...prev, ...files]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const f = async () => {
      try {
        let newFiles = [];

        if (newfileList.length > 0) {
          const formData = new FormData();
          newfileList.forEach((file) => formData.append("file", file));

          const fileRes = await fileRegister(formData, "notice");

          newFiles = fileRes.fileData.map((fileData, idx) => ({
            originalName: newfileList[idx].name,
            savedName: fileData.imageUrl.substring(
              fileData.imageUrl.lastIndexOf("/") + 1
            ),
            filePath: fileData.imageUrl,
            thumbnailPath: fileData.thumbnailUrl,
          }));
        }

        const finalFileList = [...fileList, ...newFiles];

        const finalNoticeData = {
          ...getOne,
          fileList: finalFileList,
          removeFileId: deletedFileIds,
        };

        const res = await modifyNotice(finalNoticeData);

        alert("공지 수정완료");
        navigate(-1);
      } catch (error) {
        console.error("수정 실패:", error);
        alert("공지 수정에 실패했습니다.");
      }
    };
    f();
  };

  const deleteFileHandler = (id) => {
    const data = fileList.filter((i) => i.id != id);
    setFileList(data);
    setDeletedFileIds((prev) => [...prev, id]);
  };

  const deleteNewFileHandler = (idx) => {
    setNewFileList((i) => i.filter((_, j) => j !== idx));
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">공지사항 수정</h1>
      </div>

      <div className="border-t border-b border-gray-300 py-4 mb-6">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <span className="px-2 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">
            제목
          </span>
          <input
            type="text"
            name="title"
            value={getOne.title}
            onChange={changeHandler}
            className="border border-black w-96 text-xl font-bold text-gray-800"
          />
        </div>
        <div className="flex text-sm text-gray-500 space-x-4">
          <span>작성자 : 관리자</span>
        </div>
      </div>

      <textarea
        name="content"
        onChange={changeHandler}
        value={getOne.content}
        className="min-h-[400px] border border-black bg-white p-8 flex flex-col justify-center w-full items-center  text-xl font-semibold text-gray-800 mb-6"
      />

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
              ? `${fileList.length + newfileList.length}개 파일 선택됨`
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

        {(fileList.length > 0 || newfileList.length > 0) && (
          <div className="mt-4 text-sm text-gray-700">
            <ul className="space-y-1">
              {fileList.map((file) => (
                <li
                  key={file.id}
                  className="bg-gray-100 px-3 py-1 rounded-md flex justify-between items-center"
                >
                  <span>{file.originalName}</span>
                  <button
                    type="button"
                    onClick={() => deleteFileHandler(file.id)}
                    className="ml-2 text-red-500 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-100"
                  >
                    삭제
                  </button>
                </li>
              ))}

              {newfileList.map((file, index) => (
                <li
                  key={`new-${index}`}
                  className="bg-gray-100 px-3 py-1 rounded-md flex justify-between items-center"
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => deleteNewFileHandler(index)}
                    className="ml-2 text-red-500 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-100"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8 gap-x-4">
        <button
          onClick={submitHandler}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
        >
          수정
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

export default NoticeEditPage;
