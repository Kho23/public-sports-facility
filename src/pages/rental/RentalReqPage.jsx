import React, { useEffect } from "react";
import { useState } from "react";
import RentalReqComponent from "./components/RentalReqComponent";
import { useNavigate } from "react-router-dom";
import { findByFacilityId } from "../../api/dailyUseApi";
import { getAvailableTime } from "../../api/commonApi";
import { rentalRequest } from "../../api/rentalApi";
import AlertModalComponent from "../../components/alertModal/AlertModalComponent";

const RentalReqPage = () => {
  const facilities = [
    { id: 5, name: "무용실", AMprice: "10000", PMprice: "15000" },
    { id: 4, name: "풋살장", AMprice: "20000", PMprice: "25000" },
  ];

  const [getSpace, setGetSpace] = useState([]);

  const [facility, setFacility] = useState(null);
  const [space, setSpace] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [scheduleData, setScheduleData] = useState([]);

  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState([]);

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleDateClick = (i) => {
    setSelectTime([]);
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

  useEffect(() => {
    console.log("scheduleData", scheduleData);
  }, [scheduleData]);

  const priceCalc = () => {
    if (!selectTime) return 0;

    const selected = facilities.find((i) => i.id === facility);
    const AMprice = selected.AMprice;
    const PMprice = selected.PMprice;

    const AMCount = selectTime?.filter(
      (i) => parseInt(i.slice(0, 2)) <= 16
    ).length;

    const PMCount = selectTime?.filter(
      (i) => parseInt(i.slice(0, 2)) > 16
    ).length;

    return AMCount * AMprice + PMCount * PMprice;
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
    setSelectTime((j) => {
      let final = j.includes(i) ? j.filter((t) => t !== i) : [...j, i];

      return final.sort(
        (a, b) => parseInt(a.slice(0, 2)) - parseInt(b.slice(0, 2))
      );
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage("");
  };

  const reservationHandler = () => {
    if (!formData.name) {
      setModalMessage("신청자 이름을 입력해 주세요");
      setModalOpen(true);
      return;
    }

    if (!formData.phoneNumber) {
      alert("신청자 번호를 입력해 주세요");
      return;
    }

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
      price: priceCalc(),
    };

    const f = async () => {
      const res = await rentalRequest(finalData);
    };
    f();

    alert("신청이 완료되었습니다.");
    navigate("/");
  };

  return (
    <div>
      <RentalReqComponent
        infoHandler={infoHandler}
        facilities={facilities}
        findFacilityFn={findFacilityFn}
        priceCalc={priceCalc}
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
      {modalOpen && (
        <AlertModalComponent message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default RentalReqPage;
