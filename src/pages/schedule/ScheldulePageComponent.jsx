import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

// 아까 만든 API 함수
import { getScheduleByDate } from "../../api/scheduleApi";

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [currentMonthStr, setCurrentMonthStr] = useState("");

  const handleDatesSet = async (dateInfo) => {
    const startStr = dateInfo.startStr.substring(0, 10);
    const endStr = dateInfo.endStr.substring(0, 10);
    setCurrentMonthStr(dateInfo.view.title);

    try {
      const data = await getScheduleByDate(startStr, endStr);

      const mappedEvents = data.map((item) => ({
        id: item.scheduleId,
        title: item.title,
        start: item.startDate,
        end: item.endDate,
        extendedProps: { content: item.content },
        color: "#3b82f6",
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventClick = (info) => {
    alert(`[${info.event.title}]\n${info.event.extendedProps.content}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <style>{`
        /* 1. 기본 폰트 및 버튼 스타일 */
        .fc-toolbar-title { font-size: 1.5rem !important; font-weight: 700 !important; }
        .fc-button-primary {
          background-color: white !important;
          border-color: #e5e7eb !important;
          color: #374151 !important;
          font-weight: 600 !important;
        }
        .fc-button-active { background-color: #f3f4f6 !important; color: black !important; }
        
        /* 2. 요일 헤더 (일, 월, 화...) 및 날짜 기본 스타일 */
        .fc-col-header-cell-cushion, .fc-daygrid-day-number {
          text-decoration: none !important;
          color: #374151; /* 평일은 기본 회색 */
          font-weight: 600;
        }

        /* ⭐ 3. 토요일(파랑), 일요일(빨강) 색상 강제 적용 ⭐ */
        
        /* (1) 헤더 텍스트 색상 */
        .fc-col-header-cell.fc-day-sun .fc-col-header-cell-cushion { color: #ef4444 !important; } /* 일요일 빨강 */
        .fc-col-header-cell.fc-day-sat .fc-col-header-cell-cushion { color: #2563eb !important; } /* 토요일 파랑 */
        
        /* (2) 달력 안의 날짜 숫자 색상 */
        .fc-day-sun .fc-daygrid-day-number { color: #ef4444 !important; }
        .fc-day-sat .fc-daygrid-day-number { color: #2563eb !important; }

        /* 기타 스타일 */
        .fc-day-today { background-color: #eff6ff !important; }
        .fc-theme-standard td, .fc-theme-standard th { border-color: #e5e7eb !important; }
      `}</style>

      <h2 className="text-3xl font-bold text-gray-900 mb-8">월별 일정</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          events={events}
          datesSet={handleDatesSet}
          eventClick={handleEventClick}
          height="auto"
          dayMaxEvents={true}
          /* ⭐ 날짜 숫자에서 '일' 제거하는 핵심 설정 ⭐ */
          dayCellContent={(info) => {
            // '23일' -> '일'을 빈 문자열로 치환하여 숫자만 남김
            return info.dayNumberText.replace("일", "");
          }}
        />
      </div>

      {/* 리스트 영역 (이전과 동일) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="mr-2">📅</span> {currentMonthStr} 일정 목록
          </h3>
        </div>
        {events.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            해당 월에는 등록된 일정이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium w-1/4">기간</th>
                  <th className="px-6 py-3 font-medium">제목</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="font-medium">{evt.start}</span>
                        {evt.start !== evt.end && (
                          <>
                            <span className="hidden sm:inline text-gray-400">
                              ~
                            </span>
                            <span className="font-medium">{evt.end}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-base font-semibold text-gray-800 block mb-1">
                        {evt.title}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
