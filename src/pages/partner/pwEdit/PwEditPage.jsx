import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { changePassword, getOne } from "../../../api/memberApi";
import PwEditComponent from "./components/PwEditComponent";

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
      const data = await getOne(id);
      setData(data);
    };
    f();
  }, [id]);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...formCheck, [name]: value };
    setPwCorrect(pwCheckFn(newForm));
    setFormCheck(newForm);
    setData({ ...data, [name]: value });
  };

  const checkHandler = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setData({ ...data, [name]: value });
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(id, data);
      alert("비밀번호 변경이 완료되었습니다");
      navigate("/");
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <PwEditComponent
      changeHandler={changeHandler}
      clickHandler={clickHandler}
      pwCorrect={pwCorrect}
      checkHandler={checkHandler}
    />
  );
};

export default PwEditPage;
