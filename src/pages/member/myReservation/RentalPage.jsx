import React, { useEffect, useState } from "react";
import RentalComponent from "./components/RentalComponent";
import { deleteRental, getRentalList } from "../../../api/rentalApi";

const RentalPage = () => {
  const facilityName = [
    { id: 101, name: "A실" },
    { id: 102, name: "B실" },
    { id: 103, name: "C실" },
    { id: 104, name: "D실" },
    { id: 201, name: "1구장" },
    { id: 202, name: "2구장" },
    { id: 203, name: "3구장" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await getRentalList();
      setData(res);
    };
    f();
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
      <RentalComponent
        data={data}
        facilityName={facilityName}
        cancelHandler={cancelHandler}
      />
    </div>
  );
};

export default RentalPage;
