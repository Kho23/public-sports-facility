import React from "react";
import { useState } from "react";
import RentalReqComponent from "./components/RentalReqComponent";
import { useNavigate } from "react-router-dom";
import { findByFacilityId } from "../../api/dailyUseApi";
import { getAvailableTime } from "../../api/commonApi";
import { lessonRequest } from "../../api/rentalApi";

const RentalReqPage = () => {
  const facilities = [
    { id: 1, name: "무용실" },
    { id: 2, name: "풋살장" },
  ];

  const [getSpace, setGetSpace] = useState([]);

  const [facility, setFacility] = useState(null);
  const [space, setSpace] = useState(null);

  const [scheduleData, setScheduleData] = useState([]);

  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState([]);

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleDateClick = (i) => {
    setSelectDate(i.dateStr);
    const f = async () => {
      const res = await getAvailableTime(space, i.dateStr);
      const list = res.map(
        (j) =>
          `${j.slice(0, 5)}` +
          "~" +
          `${String(Number(j.slice(0, 2)) + 1).padStart(2, "0")}` +
          ":00"
      );
      setScheduleData(list);
    };
    f();
  };

  const timeCheck = (i) => {
    if (!i || i.length <= 1) return true;

    const changeToNumber = i
      .map((j) => parseInt(j.split(":")[0]))
      .sort((a, b) => a - b);

    for (let k = 0; k < changeToNumber.length - 1; k++) {
      if (changeToNumber[k + 1] - changeToNumber[k] != 1) {
        return false;
      }
    }
    return true;
  };

  const findFacilityFn = (id) => {
    setFacility(id);
    const f = async () => {
      const res = await findByFacilityId(id);
      setGetSpace(res);
    };
    f();
  };

  const infoHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const selectTimeFn = (i) => {
    setSelectTime((j) =>
      j.includes(i) ? j.filter((t) => t !== i) : [...j, i]
    );
  };

  const reservationHandler = () => {
    if (!timeCheck(selectTime)) {
      alert("연속된 시간만 예약할 수 있습니다");
      return;
    }
    if (selectTime.length == 0) {
      alert("시간을 선택해 주세요");
      return;
    }

    const first = selectTime[0].split("~")[0];
    const last = selectTime[selectTime.length - 1].split("~")[1];

    const startTime = `${selectDate}T${first}`;
    const endTime = `${selectDate}T${last}`;

    const finalData = {
      ...formData,
      spaceId: space,
      startTime: startTime,
      endTime: endTime,
    };

    const f = async () => {
      const res = await lessonRequest(finalData);
    };
    f();

    navigate("/");
  };

  return (
    <div>
      <RentalReqComponent
        infoHandler={infoHandler}
        facilities={facilities}
        findFacilityFn={findFacilityFn}
        facility={facility}
        getSpace={getSpace}
        setSpace={setSpace}
        space={space}
        selectTimeFn={selectTimeFn}
        selectDate={selectDate}
        selectTime={selectTime}
        handleDateClick={handleDateClick}
        scheduleData={scheduleData}
        reservationHandler={reservationHandler}
      />
    </div>
  );
};

export default RentalReqPage;
