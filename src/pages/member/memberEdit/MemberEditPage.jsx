import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, modify } from "../../../api/memberApi";
import MemberEditComponent from "./components/MemberEditComponent";

const MemberEditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [formCheck, setFormCheck] = useState(data);
  const [userGender, setUserGender] = useState([false, false]);
  const [userBirth, setUserBirth] = useState("");
  const navigate = useNavigate();

  const isCheck = () => {
    const { memberEmail, memberPhoneNumber } = formCheck;
    if (memberEmail === "" || memberPhoneNumber === "") return false;
    else return true;
  };

  useEffect(() => {
    const f = async () => {
      const data = await getOne();
      setData(data);
      console.log("data", data);
      if (data.memberBirthDate)
        setUserBirth(data.memberBirthDate.substring(0, 10));

      if (data.memberGender === "남자") setUserGender([true, false]);
      else setUserGender([false, true]);
    };
    f();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setFormCheck({ ...formCheck, [name]: value });
  };

  const openAddress = () => {
    new window.daum.Postcode({
      oncomplete: (addressData) => {
        setData((data) => ({
          ...data,
          ["memberAddress"]: addressData.address,
        }));
      },
    }).open();
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if (isCheck(formCheck)) {
      modify(data);
      alert("수정이 완료되었습니다");
      navigate("/");
    } else {
      alert("필수 정보를 모두 입력해 주세요");
    }
  };

  return (
    <MemberEditComponent
      data={data}
      openAddress={openAddress}
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      userGender={userGender}
      userBirth={userBirth}
    />
  );
};

export default MemberEditPage;
