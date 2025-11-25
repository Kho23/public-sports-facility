import React from "react";
import { Link } from "react-router-dom";

const ProgramListPageComponent = ({ data, adminPage, programId }) => {
  return (
    <div className="bg-white">
      <div className="max-w-5xl flex gap-10 py-4 px-4">
        <main className="flex-1">
          <nav className="text-sm text-gray-500 mb-6">
            홈 &gt; 프로그램 안내 &gt; {data?.programName ?? ""}
          </nav>

          <div className="flex items-end justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.programName ?? ""}프로그램 안내
            </h1>
          </div>

          <div className="border-b-2 border-gray-400 mb-6" />

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 min-h-[300px]">
            <article
              className="
                prose max-w-none 
                prose-h2:text-xl
                prose-h3:text-lg
                prose-p:text-gray-700
                prose-li:text-gray-700
                ck-content
              "
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
          <div className=" flex justify-center pr-10 pt-10 ">
            {adminPage ? (
              <Link
                to={`/admin/program/update/${programId}`}
                className="bg-gray-700 text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition-colors"
              >
                수정하기
              </Link>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgramListPageComponent;
