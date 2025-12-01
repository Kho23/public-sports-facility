import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../../styles/calendar.css";

const RentalReqComponent = () => {
  const facilities = [
    { id: 1, name: "무용실" },
    { id: 2, name: "풋살장" },
  ];
  const spaces = {
    1: ["무용실 A", "무용실 B", "무용실 C", "무용실 D"],
    2: ["풋살장 A", "풋살장 B", "풋살장 C"],
  };

  const [facility, setFacility] = useState(null);
  const [space, setSpace] = useState(null);

  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState(null);

  const handleDateClick = (i) => {
    setSelectDate(i.dateStr);
  };

  return (
    <div className="bg-white">
      <div className="max-w-5xl flex gap-10 py-4 px-4">
        <main className="flex-1">
          <nav className="text-sm text-gray-500 mb-6">
            홈 &gt; 이용안내 &gt; 대관신청
          </nav>

          <div className="flex items-end justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">대관신청</h1>
          </div>

          <div className="border-b-2 border-gray-400 mb-6" />
          <div className="border rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-3">
              대관 예약을 진행할 시설과 장소를 선택하세요.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">시설</p>
                <div className="border rounded-md h-32 overflow-y-auto">
                  {facilities.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => {
                        setFacility(i.id);
                      }}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        facility === i.id ? "bg-blue-900 text-white" : ""
                      }`}
                    >
                      {i.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">장소</p>
                <div className="border rounded-md h-32 overflow-y-auto">
                  {!facility ? (
                    <p className="text-xs p-2 text-gray-400">
                      시설 먼저 선택하세요.
                    </p>
                  ) : (
                    spaces[facility].map((i) => (
                      <div
                        key={i}
                        onClick={() => setSpace(i)}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          space === i ? "bg-blue-900 text-white" : ""
                        }`}
                      >
                        {i}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ※ 시설, 장소를 모두 선택해야 날짜 예약이 가능합니다.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="w-2/3">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                height="auto"
                headerToolbar={{
                  start: "prev",
                  center: "title",
                  end: "next",
                }}
                dayCellContent={(arg) => arg.date.getDate()}
                dateClick={facility && space ? handleDateClick : null}
                dayCellClassNames={(arg) => {
                  const cellDate = arg.date.toLocaleDateString("sv");
                  return cellDate === selectDate ? "selected-date" : "";
                }}
              />
            </div>

            <div className="w-1/3 border rounded-md p-4">
              <p className="font-semibold border-b pb-2">예약 정보</p>
              {!facility || !space ? (
                <p className="text-gray-500 text-sm mt-4">
                  시설과 장소를 먼저 선택해주세요.
                </p>
              ) : !selectDate ? (
                <p className="text-gray-500 text-sm mt-4">
                  날짜를 선택해주세요.
                </p>
              ) : (
                <div className="mt-4">
                  <p className="text-sm mb-2">
                    <b>{selectDate}</b>
                  </p>
                  <p className="text-sm">
                    시설:{" "}
                    <b>{facilities.find((i) => i.id === facility).name}</b>
                  </p>
                  <p className="text-sm mb-3">
                    장소: <b>{space}</b>
                  </p>
                  <p className="text-sm font-semibold mt-4">시간 선택</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => setSelectTime("10:00 ~ 11:00")}
                      className={`border rounded-md p-2 text-sm hover:bg-gray-100 ${
                        selectTime === "10:00 ~ 11:00"
                          ? "bg-blue-900 text-white"
                          : ""
                      }`}
                    >
                      10:00 ~ 11:00
                    </button>
                    <button
                      onClick={() => setSelectTime("11:00 ~ 12:00")}
                      className={`border rounded-md p-2 text-sm hover:bg-gray-100 ${
                        selectTime === "11:00 ~ 12:00"
                          ? "bg-blue-900 text-white"
                          : ""
                      }`}
                    >
                      11:00 ~ 12:00
                    </button>
                  </div>
                  {selectTime && (
                    <button className="w-full mt-4 bg-blue-900 text-white py-2 rounded">
                      예약 진행
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RentalReqComponent;
