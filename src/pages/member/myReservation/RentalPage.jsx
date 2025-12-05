import React, { useEffect, useState } from "react";
import RentalComponent from "./components/RentalComponent";
import { deleteRental, getRentalList } from "../../../api/rentalApi";

const RentalPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await getRentalList();
      setData(res);
    };
    f();
    console.log("data", data);
  }, []);

  const cancelHandler = async (oneData) => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      await deleteRental(oneData.id);
      alert("신청이 취소되었습니다");
      window.location.reload();
    }
  };

  return (
    <div>
      <RentalComponent data={data} cancelHandler={cancelHandler} />
    </div>
  );
};

export default RentalPage;
