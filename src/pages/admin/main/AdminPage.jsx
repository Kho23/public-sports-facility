import React, { useState, useEffect } from "react";
import {
  Users,
  ClipboardCheck,
  MessageCircle,
  Calendar,
  ChevronRight,
  Search,
  User,
  Megaphone,
  PlusCircle,
  Image,
  HelpCircle,
} from "lucide-react";
import {
  adminApprovals,
  adminCounts,
  adminMainSearch,
  adminScheduleList,
} from "../../../api/adminApi";
import usePageMove from "../../../hooks/usePageMove";
import useCustomMove from "../../../hooks/useCustomMove";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [counts, setCounts] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const { moveToList } = usePageMove();
  const { moveToAdminApprovals } = useCustomMove();

  useEffect(() => {
    const keyword = searchTerm.trim();
    if (keyword.length < 2) {
      setSearchResult([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    adminMainSearch(keyword)
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        console.error("회원 검색 실패:", error);
        setSearchResult([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

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

    setSearchTerm("");
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
    <div className="flex flex-col bg-gray-50 min-h-screen p-6 md:p-8 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
          <p className="text-gray-500 text-sm">
            오늘도 활기찬 시설 운영을 시작해보세요!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="회원 이름 또는 ID 검색"
              className="pl-10 pr-4 py-2 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />

            {searchTerm && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-blue-500 text-sm">
                    검색 중...
                  </div>
                ) : (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 border-b">
                      검색 결과 ({searchResult.length}건)
                    </p>
                    {searchResult.length > 0 ? (
                      searchResult.map((member) => (
                        <div
                          key={member.memberId}
                          className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleMemberClick(member)}
                        >
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-500" />
                            <div>
                              <p className="font-semibold text-sm">
                                {member.memberName}{" "}
                                <span className="text-gray-400 font-normal">
                                  ({member.memberLoginId})
                                </span>
                              </p>
                              <span
                                className={`text-xs ${
                                  member.memberRole === "ROLE_PARTNER"
                                    ? "text-green-500 font-bold"
                                    : member.memberRole === "ROLE_ADMIN"
                                    ? "text-red-500 font-bold"
                                    : "text-gray-500"
                                }`}
                              >
                                {member.memberRole === "ROLE_USER"
                                  ? "일반 회원"
                                  : member.memberRole === "ROLE_PARTNER"
                                  ? "파트너 회원"
                                  : "관리자"}
                              </span>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        "{searchTerm}"에 대한 결과가 없습니다.
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 주요 현황 카드 (KPI Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* 아이콘 및 색상 적용 부분 수정 */}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.iconColor}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                승인 대기 내역
                {pendingApprovals.length > 0 && (
                  <span className="text-red-500 text-sm font-normal">
                    ({pendingApprovals.length}건)
                  </span>
                )}
              </h2>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group cursor-pointer"
                  onClick={() => moveToAdminApprovals(item.type, item.id)}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        item.type === "강좌개설"
                          ? "bg-purple-100 text-purple-600"
                          : item.type === "대관신청"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.type}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.name} · {item.date}
                      </p>
                    </div>
                  </div>
                  <button
                    className="bg-white border border-gray-200 text-sm font-medium px-4 py-2 rounded-lg text-gray-600 
                  group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all"
                  >
                    검토하기
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 업무 2: 통계 그래프 영역 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 flex flex-col justify-center items-center text-gray-400">
            <p>📊 주간 방문자 및 매출 통계 그래프 영역</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">이번달 주요 일정</h2>
            <ul className="space-y-4 relative border-l-2 border-gray-100 ml-2 pl-4">
              {schedule?.map((i, idx) => (
                <li className="relative" key={idx}>
                  <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></span>
                  <p className="text-xs text-gray-400 mb-1">
                    {i.startDate} ~ {i.endDate}
                  </p>
                  <p className="text-sm font-semibold">{i.title}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* 퀵 메뉴 (자주 쓰는 기능) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4">빠른 실행</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* 1. 공지 등록 */}
              <Link
                to={"/admin/notice/add"}
                className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors text-left border border-purple-100 group shadow-sm flex flex-col items-start"
              >
                <Megaphone
                  size={20}
                  className="text-purple-600 mb-2 group-hover:scale-105 transition-transform"
                />
                <span className="text-sm font-semibold text-gray-800">
                  공지 등록
                </span>
                <span className="text-xs text-gray-500">새로운 소식 알림</span>
              </Link>

              {/* 2. 일정 추가 (기존 to={"/admin/schedule"}는 일정 리스트 페이지이므로, 등록을 위한 쿼리 파라미터를 추가했습니다.) */}
              <Link
                to={"/admin/schedule?action=register"}
                className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-left border border-blue-100 group shadow-sm flex flex-col items-start"
              >
                <PlusCircle
                  size={20}
                  className="text-blue-600 mb-2 group-hover:scale-105 transition-transform"
                />
                <span className="text-sm font-semibold text-gray-800">
                  일정 추가
                </span>
                <span className="text-xs text-gray-500">
                  주요 행사 및 스케줄
                </span>
              </Link>

              {/* 3. 갤러리 등록 */}
              <Link
                to={"/admin/gallery/register"}
                className="p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors text-left border border-green-100 group shadow-sm flex flex-col items-start"
              >
                <Image
                  size={20}
                  className="text-green-600 mb-2 group-hover:scale-105 transition-transform"
                />
                <span className="text-sm font-semibold text-gray-800">
                  갤러리 등록
                </span>
                <span className="text-xs text-gray-500">
                  시설 사진 및 이벤트
                </span>
              </Link>

              {/* 4. FAQ 추가 */}
              <Link
                to={"/admin/faq"}
                className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors text-left border border-orange-100 group shadow-sm flex flex-col items-start"
              >
                <HelpCircle
                  size={20}
                  className="text-orange-600 mb-2 group-hover:scale-105 transition-transform"
                />
                <span className="text-sm font-semibold text-gray-800">
                  FAQ 추가
                </span>
                <span className="text-xs text-gray-500">
                  자주 묻는 질문 관리
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
