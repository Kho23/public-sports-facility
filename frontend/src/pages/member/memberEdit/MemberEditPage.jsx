import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOne, modify } from "../../../api/memberApi";
import MemberEditComponent from "./components/MemberEditComponent";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const MemberEditPage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });

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
      if (data.memberBirthDate)
        setUserBirth(data.memberBirthDate.substring(0, 10));
      if (data.memberGender === "남자") setUserGender([true, false]);
      else setUserGender([false, true]);
    };
    f();
  }, []);

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

  const clickHandler = async (e) => {
    e.preventDefault();
    if (isCheck(formCheck)) {
      setAlertModal({
        open: true,
        type: "confirm",
        message: "회원 정보를 수정하시겠습니까?",
        onConfirm: async (i) => {
          setAlertModal({ open: false });
          if (i !== "ok") return;
          try {
            await modify(data);
            alert("회원 정보가 수정되었습니다.");
            navigate("/");
          } catch (err) {
            console.error("제출 실패", err);
            alert("제출 중 오류가 발생했습니다");
          }
        },
      });
    } else {
      alert("필수 정보를 모두 입력해 주세요");
    }
  };

  return (
    <div>
      <MemberEditComponent
        data={data}
        openAddress={openAddress}
        changeHandler={changeHandler}
        clickHandler={clickHandler}
        userGender={userGender}
        userBirth={userBirth}
      />
      {alertModal.open && (
        <ModalComponent
          type={alertModal.type}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
};

export default MemberEditPage;
