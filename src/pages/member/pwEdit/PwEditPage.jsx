import React, { useEffect, useState } from "react";
import PwEditComponent from "./components/PwEditComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, modify } from "../../../api/memberApi";

const PwEditPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [formCheck, setFormCheck] = useState(data);
  const [pwCorrect, setPwCorrect] = useState(false);
  const navigate = useNavigate();

  const pwCheckFn = (formCheck) => {
    const { memberPassword, memberPasswordCheck } = formCheck;
    if (memberPasswordCheck > 0 && memberPassword === memberPasswordCheck)
      return true;
    else return false;
  };

  useEffect(() => {
    const f = async () => {
      const data = await getOne();
      //더이상 멤버 아이디로 가져오지 않아서 id 인자 제거
      setData(data);
    };
    f();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...formCheck, [name]: value };
    setPwCorrect(pwCheckFn(newForm));
    setFormCheck(newForm);
    setData({ ...data, [name]: value });
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if (pwCheckFn(formCheck)) {
      modify(data);
      alert("비밀번호 변경이 완료되었습니다");
      navigate("/");
    } else {
      alert("비밀번호를 다시 확인해 주세요");
    }
  };

  return (
    <PwEditComponent
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      pwCorrect={pwCorrect}
    />
  );
};

export default PwEditPage;
