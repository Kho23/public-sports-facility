import React, { useState, useEffect } from "react";
import { Users, ClipboardCheck, MessageCircle, Calendar } from "lucide-react";
import {
  adminApprovals,
  adminCounts,
  adminMainSearch,
  adminScheduleList,
} from "../../../api/adminApi";
import usePageMove from "../../../hooks/usePageMove";
import useCustomMove from "../../../hooks/useCustomMove";
import AdminPageComponent from "./AdminPageComponent";

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [counts, setCounts] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const { moveToList } = usePageMove();
  const { moveToAdminApprovals } = useCustomMove();

  useEffect(() => {
    const keyword = search.trim();
    if (keyword.length < 2) {
      setSearchResult([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      adminMainSearch(keyword).then((res) => setSearchResult(res));
    } catch (error) {
      console.error("회원 검색 실패:", error);
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await adminApprovals();
        const sch = await adminScheduleList();
        const cnt = await adminCounts();
        setSchedule(sch);
        setPendingApprovals(res);
        setCounts(cnt);
      } catch (err) {
        console.error("가져오기 실패", err);
      }
    };
    f();
  }, []);

  const handleMemberClick = (member) => {
    moveToList(
      {
        page: 1,
        size: 10,
        type: "id",
        keyword: member.memberLoginId,
        openModal: "true",
        memberIdToOpen: member.memberId,
      },
      "/admin/member/memberInfo"
    );
    setSearch("");
    setSearchResult([]);
  };

  const stats = [
    {
      title: "신규 회원 (오늘)",
      value: `${counts.memberCnt}명`,
      iconColor: "bg-blue-50 text-blue-500",
      icon: <Users size={20} />,
    },
    {
      title: "승인 대기",
      value: `${pendingApprovals.length}건`,
      iconColor: "bg-red-50 text-red-500",
      icon: <ClipboardCheck size={20} />,
    },
    {
      title: "미답변 문의",
      value: `${counts.supportCnt}건`,
      iconColor: "bg-orange-50 text-orange-500",
      icon: <MessageCircle size={20} />,
    },
    {
      title: "오늘의 예약",
      value: `${counts.reservationCnt}건`,
      iconColor: "bg-green-50 text-green-500",
      icon: <Calendar size={20} />,
    },
  ];

  return (
    <AdminPageComponent
      search={search}
      setSearch={setSearch}
      loading={loading}
      searchResult={searchResult}
      handleMemberClick={handleMemberClick}
      stats={stats}
      pendingApprovals={pendingApprovals}
      moveToAdminApprovals={moveToAdminApprovals}
      schedule={schedule}
    />
  );
};

export default AdminPage;
