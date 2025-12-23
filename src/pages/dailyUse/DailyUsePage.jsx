import React, { useEffect, useState } from "react";
import {
  findByFacilityId,
  registerDailyUse,
  registerGymDailyUse,
} from "../../api/dailyUseApi";
import { getAvailableTime } from "../../api/commonApi";
import DailyUsePageComponent from "./components/DailyUsePageComponent";
import AlertModalComponent from "../../components/alertModal/AlertModalComponent";

const facilities = [
  { id: 1, name: "수영장", price: 5000 },
  { id: 2, name: "헬스장", price: 3000 },
  { id: 3, name: "골프장", price: 7000 },
];

const DailyUsePage = () => {
  const [facility, setFacility] = useState(null);
  const [space, setSpace] = useState(null);
  const [selectedSpace, setselectedSpace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTime, setAvailableTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (!facility) return;
    const f = facilities.find((i) => i.id === facility);
    if (f) setPrice(f.price * selectedTime.length);
  }, [selectedTime, facility]);

  const resetFn = () => {
    setselectedSpace(null);
    setAvailableTime(null);
    setSelectedTime([]);
    setSelectedDate(null);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const clickFacilityHandler = async (id) => {
    setFacility(id);
    resetFn();

    if (id === 2) {
      setSpace(null);
      return;
    }

    try {
      const res = await findByFacilityId(id);
      setSpace(res);
    } catch (error) {
      console.error("space가져오기 실패", error);
    }
  };

  const clickSpaceHandler = (id) => {
    setselectedSpace(id);
    setAvailableTime(null);
    setSelectedDate(null);
  };

  const handleDateClick = async (info) => {
    setSelectedDate(info.dateStr);
    setSelectedTime([]);
    if (facility === 2) return;
    if (!selectedSpace) return;
    const res = await getAvailableTime(selectedSpace, info.dateStr);
    const formatted = res.map((t) => {
      const h = Number(t.slice(0, 2));
      return `${t.slice(0, 5)}~${String(h + 1).padStart(2, "0")}:00`;
    });
    setAvailableTime(formatted);
  };

  const handleTimeClick = (time) => {
    setSelectedTime((prev) => {
      if (prev.includes(time)) return prev.filter((t) => t !== time);

      const timesInNumber = prev.map((t) => Number(t.slice(0, 2)));

      if (prev.length === 0) return [time];

      const min = Math.min(...timesInNumber);
      const max = Math.max(...timesInNumber);
      const clickedHour = Number(time.slice(0, 2));

      if (clickedHour === min - 1 || clickedHour === max + 1) {
        return [...prev, time].sort();
      } else {
        setModalOpen(true);
        return prev;
      }
    });
  };

  const handlePayment = () => {
    if (facility === 2) {
      return {
        title: "헬스장 일일이용권",
        date: selectedDate,
        price: facilities[1].price,
        productType: "GYM_DAILY_USE",
      };
    }

    const sorted = [...selectedTime].sort();
    const startHour = sorted[0].slice(0, 5);
    const endHour = `${String(
      Number(sorted[sorted.length - 1].slice(0, 2)) + 1
    ).padStart(2, "0")}:00`;

    return {
      title: "일일이용권",
      price: price,
      productType: "DAILY_USE",
      startTime: `${selectedDate}T${startHour}`,
      endTime: `${selectedDate}T${endHour}`,
      lessonId: selectedSpace,
    };
  };

  return (
    <>
      <DailyUsePageComponent
        facilities={facilities}
        clickFacilityHandler={clickFacilityHandler}
        facility={facility}
        space={space}
        clickSpaceHandler={clickSpaceHandler}
        selectedSpace={selectedSpace}
        selectedDate={selectedDate}
        handleDateClick={handleDateClick}
        handleTimeClick={handleTimeClick}
        handlePayment={handlePayment}
        selectedTime={selectedTime}
        availableTime={availableTime}
        price={price}
      />
      {modalOpen && (
        <AlertModalComponent
          message={"연속된 시간만 선택 가능합니다."}
          type="alert"
          onConfirm={closeModal}
        />
      )}
    </>
  );
};

export default DailyUsePage;
