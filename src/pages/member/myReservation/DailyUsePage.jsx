import React, { useEffect, useState } from "react";
import DailyUseComponent from "./components/DailyUseComponent";
import {
  deleteDailyUse,
  deleteGymDailyUse,
  getDailyUseList,
  getGymDailyUseList,
} from "../../../api/dailyUseApi";

const DailyUsePage = () => {
  const [dailyUse, setDailyUse] = useState([]);
  const [gymDailyUse, setgymDailyUse] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        const dailyUseData = await getDailyUseList();
        const gymDailyUseData = await getGymDailyUseList();
        console.log(dailyUseData, gymDailyUseData);
        setDailyUse(dailyUseData);
        setgymDailyUse(gymDailyUseData);
      } catch (err) {
        console.error("데이터 가져오기 실패", err);
      }
    };
    f();
  }, []);

  const cancelDailyUseHandler = async (id) => {
    try {
      if (window.confirm("정말 취소하시겠습니까?")) {
        await deleteDailyUse(id);
        alert("신청이 취소되었습니다");
        window.location.reload();
      }
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };
  const cancelGymHandler = async (id) => {
    try {
      if (window.confirm("정말 취소하시겠습니까?")) {
        await deleteGymDailyUse(id);
        alert("신청이 취소되었습니다");
        window.location.reload();
      }
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <div>
      <DailyUseComponent
        dailyUse={dailyUse}
        gymDailyUse={gymDailyUse}
        cancelGymHandler={cancelGymHandler}
        cancelDailyUseHandler={cancelDailyUseHandler}
      />
    </div>
  );
};

export default DailyUsePage;
