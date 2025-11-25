import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MemberMyComponent from "./components/MemberMyComponent";
import axios from "axios";
import { getOne } from "../../../api/memberApi";
import { useSelector } from "react-redux";
import useCustomMove from "../../../hooks/useCustomMove";

const MemberMyPage = () => {
  const [data, setData] = useState({});
  // const { id } = useParams(); 더이상 id 로 멤버를 찾지 않습니다 
  const { memberId, isLoggedIn } = useSelector((state) => state.auth)
  const { moveToLogin } = useCustomMove()

  useEffect(() => {
    if (!isLoggedIn) {
      //로그인이 안되어있는데 URL 로 직접 접속 시도 시 막음
      alert("비정상적인 접근입니다. 먼저 로그인 해주세요.")
      moveToLogin()
      return;// 즉시 함수를 종료하도록 함 
      //비로그인 상태에서 URL로 마이페이지 접근 시 막는 로직
    }
    const f = async () => {
      const data = await getOne();
      setData(data);
    };
    f();
    //이제 로그인 상태에서만 f 함수 실행
  }, [isLoggedIn, memberId])

  return <MemberMyComponent data={data} />;
};

export default MemberMyPage;
