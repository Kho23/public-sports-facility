import "../../../styles/calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const DailyUsePageComponent = ({
  facilities,
  clickFacilityHandler,
  facility,
  space,
  clickSpaceHandler,
  selectedSpace,
  selectedDate,
  handleDateClick,
  handleTimeClick,
  submitHandler,
  selectedTime,
  availableTime,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 예약신청 &gt; 일일이용예약
      </nav>
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">일일이용예약</h1>
      </div>
      <div className="border-b-2 border-gray-400 mb-6" />

      <div className="border rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-600 mb-3">
          일일이용예약을 진행할 시설과 장소를 선택하세요.
        </p>

        <div className="grid grid-cols-2 gap-4">
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
                    facility === f.id ? "bg-blue-900 text-white" : ""
                  }`}
                >
                  {f.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">장소</p>
            <div className="border rounded-md h-32 overflow-y-auto">
              {facility === 3 ? (
                <p className="text-xs p-2 text-gray-400">
                  헬스장은 공간 선택이 필요 없습니다.
                </p>
              ) : !space ? (
                <p className="text-xs p-2 text-gray-400">
                  시설 먼저 선택하세요.
                </p>
              ) : (
                space?.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => clickSpaceHandler(i.id)}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSpace === i.id ? "bg-blue-900 text-white" : ""
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
            dateClick={facility ? handleDateClick : undefined}
            dayCellContent={(arg) => arg.date.getDate()}
            dayCellClassNames={(arg) => {
              const cellDate = arg.date.toLocaleDateString("sv");
              return cellDate === selectedDate ? "selected-date" : "";
            }}
          />
        </div>

        <div className="w-1/3 border rounded-md p-4">
          <p className="font-semibold border-b pb-2">예약 정보</p>

          {facility === 3 ? (
            !selectedDate ? (
              <p className="text-gray-500 text-sm mt-4">날짜를 선택해주세요.</p>
            ) : (
              <div className="mt-4">
                <p className="text-sm mb-2">
                  선택한 날짜: <b>{selectedDate}</b>
                </p>
                <p className="text-sm mb-2">
                  시설: <b>{facilities.find((f) => f.id === facility).name}</b>
                </p>
                <p className="text-sm mb-3">
                  이용가능 시간: <b>06시 ~ 22시</b>
                </p>
                <button
                  className="w-full mt-4 bg-blue-900 text-white py-2 rounded"
                  onClick={submitHandler}
                >
                  예약 진행
                </button>
              </div>
            )
          ) : !space ? (
            <p className="text-gray-500 text-sm mt-4">시설 먼저 선택하세요.</p>
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

              <p className="text-sm font-semibold mt-4">시간 선택</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableTime?.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTimeClick(t)}
                    className={`border rounded-md p-2 text-sm hover:bg-gray-100 ${
                      selectedTime?.includes(t) ? "bg-blue-900 text-white" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {selectedTime && selectedTime.length > 0 && (
                <button
                  className="w-full mt-4 bg-blue-900 text-white py-2 rounded"
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

export default DailyUsePageComponent;
