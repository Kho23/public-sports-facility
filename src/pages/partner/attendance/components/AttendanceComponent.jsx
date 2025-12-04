import React, { useState } from "react";
import { FaUserCheck, FaRegCalendarAlt } from "react-icons/fa";

const AttendanceComponent = () => {
  const students = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "김철수" },
    { id: 3, name: "이영희" },
    { id: 4, name: "박문수" },
  ];

  const statusColor = {
    출석: "bg-green-100 text-green-800",
    지각: "bg-yellow-100 text-yellow-800",
    조퇴: "bg-orange-100 text-orange-800",
    결석: "bg-red-100 text-red-800",
  };

  const [date, setDate] = useState("");
  const [records, setRecords] = useState(
    students.map((s) => ({
      ...s,
      status: "출석",
      memo: "",
    }))
  );

  const handleStatusChange = (id, value) => {
    setRecords((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: value } : item))
    );
  };

  const handleMemoChange = (id, value) => {
    setRecords((prev) =>
      prev.map((item) => (item.id === id ? { ...item, memo: value } : item))
    );
  };

  const changeAllStatus = (value) => {
    setRecords((prev) => prev.map((item) => ({ ...item, status: value })));
  };

  const submitAttendance = () => {
    if (!date) return alert("날짜를 먼저 선택해주세요.");
    console.log("출석 데이터:", records);
    alert("출석 기록이 저장되었습니다.");
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 제목 */}
      <div className="flex items-center gap-3 mb-8">
        <FaUserCheck className="text-4xl text-blue-700" />
        <h1 className="text-3xl font-extrabold text-gray-900">
          출석 관리 - 골프
        </h1>
      </div>

      {/* 날짜 선택 */}
      <div className="flex items-center gap-4 mb-6">
        <FaRegCalendarAlt className="text-2xl text-gray-500" />
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* 전체 체크 버튼 */}
      <div className="flex gap-3 mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={() => changeAllStatus("출석")}
        >
          전체 출석
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          onClick={() => changeAllStatus("지각")}
        >
          전체 지각
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          onClick={() => changeAllStatus("결석")}
        >
          전체 결석
        </button>
      </div>

      {/* 테이블 */}
      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 w-20">번호</th>
            <th className="py-3">이름</th>
            <th className="py-3">출석 상태</th>
            <th className="py-3">메모</th>
          </tr>
        </thead>

        <tbody>
          {records.map((student, idx) => (
            <tr key={student.id} className="text-center border-b">
              <td className="py-3">{idx + 1}</td>
              <td className="py-3 font-semibold">{student.name}</td>

              <td className="py-3">
                <select
                  className={`border rounded-lg px-2 py-1 font-semibold ${
                    statusColor[student.status]
                  }`}
                  value={student.status}
                  onChange={(e) =>
                    handleStatusChange(student.id, e.target.value)
                  }
                >
                  <option value="출석">출석</option>
                  <option value="지각">지각</option>
                  <option value="조퇴">조퇴</option>
                  <option value="결석">결석</option>
                </select>
              </td>

              <td className="py-3">
                <input
                  type="text"
                  className="border px-3 py-1 rounded-lg w-11/12"
                  placeholder="메모"
                  value={student.memo}
                  onChange={(e) => handleMemoChange(student.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 저장 버튼 */}
      <div className="text-right mt-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg"
          onClick={submitAttendance}
        >
          출석 저장
        </button>
      </div>
    </div>
  );
};

export default AttendanceComponent;
