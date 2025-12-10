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
  const { memberId, isLoggedIn } = useSelector((state) => state.auth);
  const { moveToLogin } = useCustomMove();

  useEffect(() => {
    if (!isLoggedIn) {
      //로그인이 안되어있는데 URL 로 직접 접속 시도 시 막음
      alert("비정상적인 접근입니다. 먼저 로그인 해주세요.");
      moveToLogin();
      return; // 즉시 함수를 종료하도록 함
      //비로그인 상태에서 URL로 마이페이지 접근 시 막는 로직
    }
  }, []);

    //이제 로그인 상태에서만 f 함수 실행
  }, []);
  useEffect(() => {
    if (isLoggedIn && memberId) {
      const f = async () => {
        try {
          const data = await getOne();
          setData(data);
        } catch (err) {
          console.error(err);
        }
      };
      f();
    } else if (!isLoggedIn) {
      // 이 useEffect는 isLoggedIn이 false로 변할 때(로그아웃)도 실행됨
      // 이미 1번 useEffect에서 초기 진입은 막았으므로,
      // 여기서 false가 된 것은 "사용자가 로그아웃 버튼을 눌렀다"는 뜻임
      // 따라서 경고창 없이 조용히 로그인 페이지로 보냄
      moveToLogin();
    }
  }, [isLoggedIn, memberId]);

  return <MemberMyComponent data={data} />;
};

export default MemberMyPage;
