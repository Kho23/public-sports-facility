import React, { useEffect, useState } from "react";
import MemberMyComponent from "./components/MemberMyComponent";
import axios from "axios";
import { getOne } from "../../../api/memberApi";
import { useSelector } from "react-redux";
import useCustomMove from "../../../hooks/useCustomMove";
import { getCookie } from "../../../util/cookieUtil";

const MemberMyPage = () => {
  const [data, setData] = useState({});
  const { memberId, isLoggedIn } = useSelector((state) => state.auth);
  const { moveToLogin } = useCustomMove();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("비정상적인 접근입니다. 먼저 로그인 해주세요.");
      moveToLogin();
      return;
    }
  }, []);

  useEffect(() => {
    var member = getCookie("member");
    if (isLoggedIn && member.memberId) {
      const f = async () => {
        try {
          const data = await getOne();
          setData(data);
        } catch (err) {
          console.error(err);
        }
      };
      f();
    }
  }, [isLoggedIn, memberId]);

  return <MemberMyComponent data={data} />;
};

export default MemberMyPage;
