import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  changePartnerStatus,
  getOnePartnerRequest,
} from "../../../../api/adminApi";
const PartnerRequestPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOnePartnerRequest(id);
        setData(res);
      } catch (err) {
        console.error("파트너 신청 상세 조회 실패:", err);
      }
    };
    f();
  }, [id]);

  const statusChangeHandler = async (status) => {
    try {
      const res = await changePartnerStatus(id, status);
      console.log(res);
      alert("완료~!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("상태 변경 실패");
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
  if (!data) return <div className="text-gray-500 p-8">로딩중...</div>;
  return (
    <div className="container mx-auto max-w-4xl p-8 min-h-screen text-gray-900">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-10 border-b pb-4">
        파트너 승급 신청서
      </h1>
      {/* :압정: 기본 정보 박스 */}
      <div className="bg-white shadow-lg rounded-xl border p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-black">기본 정보</h2>
        <table className="w-full border rounded-lg  text-sm">
          <tbody className="divide-y">
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3 w-36">
                아이디
              </td>
              <td className="px-4 py-3">{data.member?.memberLoginId}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청자</td>
              <td className="px-4 py-3">{data.member?.memberName}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">성별</td>
              <td className="px-4 py-3">{data.member?.memberGender}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">생년월일</td>
              <td className="px-4 py-3">
                {data.member?.memberBirthDate.slice(0, 10)}
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">
                핸드폰 번호
              </td>
              <td className="px-4 py-3">{data.member?.memberPhoneNumber}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청일</td>
              <td className="px-4 py-3">
                {new Date(data.requestDate).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청 상태</td>
              <td className="px-4 py-3">{renderStatus(data.status)}</td>
            </tr>
            <tr>
              <td className="bg-gray-100 font-semibold px-4 py-3">신청 종목</td>
              <td className="px-4 py-3">{data.partnerClass?.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* :압정: 파일 박스 */}
      <div className="bg-white shadow-lg rounded-xl border p-6">
        <h2 className="text-xl font-semibold text-black mb-6">제출한 파일</h2>
        <div className="space-y-10">
          {/* 파일 목록 공통 테이블 */}
          {[
            { title: "이력서", list: data.resumeFiles },
            { title: "자격증", list: data.certFiles },
            { title: "통장 사본", list: data.bankFiles },
          ]
            .filter((item) => item.list && item.list.length > 0)
            .map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-3 border-b pb-1">
                  {section.title}
                </h3>
                <table className="w-full text-sm rounded-xl overflow-hidden">
                  <tbody>
                    {section.list.map((file) => (
                      <tr
                        key={file.fileId}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">{file.originalName}</td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href={`http://localhost:8080/download/${file.savedName}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-lg transition"
                          >
                            <span>다운로드</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
      {data.status === "PENDING" ? (
        <div className="mt-10 flex justify-center gap-20">
          <button
            className="px-16 py-3 rounded-lg font-semibold
               border-2 border-green-500 text-green-600
               hover:bg-green-500 hover:text-white
               active:scale-95 transition-all duration-200"
            onClick={() => statusChangeHandler("ACCEPTED")}
          >
            승 인
          </button>

          <button
            className="px-16 py-3 rounded-lg font-semibold
               border-2 border-red-500 text-red-600
               hover:bg-red-500 hover:text-white
               active:scale-95 transition-all duration-200"
            onClick={() => statusChangeHandler("REJECTED")}
          >
            반 려
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-end mt-5 gap-x-4 border-t">
        <Link
          to={-1}
          className="bg-gray-700 text-white font-bold py-2 px-6 mt-5 rounded hover:bg-gray-800 transition-colors"
        >
          목록
        </Link>
      </div>
    </div>
  );
};
export default PartnerRequestPage;
