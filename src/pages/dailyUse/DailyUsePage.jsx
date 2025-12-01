import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/calendar.css";
import { findByFacilityId, registerDailyUse } from "../../api/dailyUseApi";
import { getAvailableTime } from "../../api/commonApi";

// 시설 / 장소 mock
const facilities = [
  { id: 1, name: "골프장" },
  { id: 2, name: "수영장" },
  { id: 3, name: "헬스장" },
];

const DailyUsePage = () => {
  const [facility, setFacility] = useState(null);
  const [space, setSpace] = useState(null);
  const [selectedSpace, setselectedSpace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTime, setAvailableTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);

  const [finalData, setFinalData] = useState({
    startTime: "",
    endTime: "",
    spaceId: 0,
  });

  useEffect(() => {
    if (!selectedDate || !selectedTime || selectedTime.length === 0) return;

    // 원본 훼손 방지용 복사 후 정렬
    const sorted = [...selectedTime].sort();

    if (sorted.length === 0) return; // 안전장치

    const startHour = sorted[0].slice(0, 5);
    const endHourNumber = Number(sorted[sorted.length - 1].slice(0, 2)) + 1;
    const endHour = `${String(endHourNumber).padStart(2, "0")}:00`;

    const startDateTime = `${selectedDate}T${startHour}`;
    const endDateTime = `${selectedDate}T${endHour}`;

    setFinalData({
      ...finalData,
      startTime: startDateTime,
      endTime: endDateTime,
      spaceId: selectedSpace,
    });
  }, [selectedTime, selectedDate, selectedSpace]);

  const clickFacilityHandler = (id) => {
    try {
      const f = async () => {
        const res = await findByFacilityId(id);
        setFacility(id);
        setSpace(res);
        setselectedSpace(null);
        setAvailableTime(null);
        setSelectedTime([]);
        setSelectedDate(null);
      };
      f();
    } catch (error) {
      console.error("space가져오기 실패", error);
    }
  };

  const clickSpaceHandler = (id) => {
    setselectedSpace(id);
    setAvailableTime(null);
    setSelectedDate(null);
    setFinalData((i) => ({ ...i, spaceId: id }));
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);

    const f = async () => {
      const res = await getAvailableTime(selectedSpace, info.dateStr);
      const formatted = res.map((t) => {
        const h = Number(t.slice(0, 2));
        return `${t.slice(0, 5)}~${String(h + 1).padStart(2, "0")}:00`;
      });
      setAvailableTime(formatted);
    };

    f();
  };

  const handleTimeClick = (time) => {
    const index = selectedTime.indexOf(time);

    if (index > -1) {
      // 이미 선택된 시간 클릭 → 제거
      const newTimes = [...selectedTime];
      newTimes.splice(index, 1);
      setSelectedTime(newTimes);
    } else {
      if (selectedTime.length === 0) {
        // 아무것도 선택 안됐으면 바로 추가
        setSelectedTime([time]);
      } else {
        // 기존 선택된 시간과 연속인지 확인
        const timesInNumber = selectedTime.map((t) => Number(t.slice(0, 2)));
        const min = Math.min(...timesInNumber);
        const max = Math.max(...timesInNumber);
        const clickedHour = Number(time.slice(0, 2));

        if (clickedHour === min - 1 || clickedHour === max + 1) {
          setSelectedTime([...selectedTime, time].sort());
        } else {
          alert("연속된 시간만 선택 가능합니다.");
        }
      }
    }
  };

  const submitHandler = async () => {
    try {
      const res = await registerDailyUse(finalData);
      console.log(res);
    } catch (err) {
      console.error("일일이용예약 실패", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 예약신청 &gt; 일일이용예약
      </nav>

      <div className="flex items-end justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">일일이용예약</h1>
      </div>

      <div className="border-b-2 border-gray-400 mb-6" />

      {/* 상단 선택 UI */}
      <div className="border rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-600 mb-3">
          일일이용예약을 진행할 시설과 장소를 선택하세요.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* 시설 리스트 */}
          <div>
            <p className="font-semibold mb-2">시설</p>
            <div className="border rounded-md h-32 overflow-y-auto">
              {facilities.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    clickFacilityHandler(f.id);
                  }}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    facility === f.id ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {f.name}
                </div>
              ))}
            </div>
          </div>

          {/* 장소 리스트 */}
          <div>
            <p className="font-semibold mb-2">장소</p>
            <div className="border rounded-md h-32 overflow-y-auto">
              {!space ? (
                <p className="text-xs p-2 text-gray-400">
                  시설 먼저 선택하세요.
                </p>
              ) : (
                space?.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => clickSpaceHandler(i.id)}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSpace === i.id ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {i.spaceName}
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

      {/* 아래 영역 2분할 */}
      <div className="flex gap-6">
        {/* 캘린더 */}
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
            dateClick={facility && space ? handleDateClick : undefined}
            dayCellContent={(arg) => arg.date.getDate()}
            dayCellClassNames={(arg) => {
              const cellDate = arg.date.toLocaleDateString("sv");
              return cellDate === selectedDate ? "selected-date" : "";
            }}
          />
        </div>

        {/* 예약 정보 테이블 */}
        <div className="w-1/3 border rounded-md p-4">
          <p className="font-semibold border-b pb-2">예약 정보</p>

          {!facility || !space ? (
            <p className="text-gray-500 text-sm mt-4">
              시설과 장소를 먼저 선택해주세요.
            </p>
          ) : !selectedDate ? (
            <p className="text-gray-500 text-sm mt-4">날짜를 선택해주세요.</p>
          ) : (
            <div className="mt-4">
              <p className="text-sm mb-2">
                선택한 날짜: <b>{selectedDate}</b>
              </p>

              <p className="text-sm">
                시설: <b>{facilities.find((f) => f.id === facility).name}</b>
              </p>
              <p className="text-sm mb-3">
                장소:{" "}
                <b>{space.find((s) => s.id === selectedSpace).spaceName}</b>
              </p>

              <p className="text-sm font-semibold mt-4"> 시간 선택</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableTime?.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTimeClick(t)}
                    className={`border rounded-md p-2 text-sm hover:bg-gray-100 ${
                      selectedTime?.includes(t) ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <button
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
                  onClick={submitHandler}
                >
                  예약 진행
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyUsePage;
