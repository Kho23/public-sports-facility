import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../../styles/ckeditor-custom.css";
import { Link } from "react-router-dom";

const ProgramEditComponent = ({ submitHandler, data, setData }) => {
  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold"> {data.programName}프로그램 수정</h1>
        <div className="flex text-sm pt-4 text-gray-500 space-x-4">
          <span>작성자 : 관리자</span>
        </div>
      </div>

      <div className="mb-6">
        <CKEditor
          key={data.pno}
          editor={ClassicEditor}
          data={data?.content ?? ""}
          onChange={(event, editor) => {
            const editorData = editor.getData();
            setData({ ...data, content: editorData });
          }}
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          이미지 추가
          <div className="text-sm text-gray-500">
            업로드한 이미지는 글 가장 아래에 적용됩니다.
          </div>
        </label>

        <div
          className="flex items-center justify-center px-6 py-8 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
          // onClick={() => i.current.click()}
        >
          {/* <input type="file" ref={i} hidden /> */}
          <div className="text-center text-gray-500">
            <div className="text-5xl font-bold text-gray-400 leading-none mb-3">
              +
            </div>
            <p className="font-medium">이미지를 추가하려면 클릭하세요</p>
            <p className="text-sm text-gray-400">(JPG · PNG · GIF 지원)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 gap-x-4">
        <button
          type="submit"
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

export default ProgramEditComponent;
