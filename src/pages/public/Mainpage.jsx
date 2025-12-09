import React from "react";
import {
  Info,
  Layout,
  CalendarCheck,
  History,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import NoticePreview from "./NoticePreview";
import { useNavigate } from "react-router-dom";
import img from "../../images/메인페이지배경.png";
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
const MainPage = () => {
  const navigate = useNavigate();

  const menuItems = [
<<<<<<< Updated upstream
    { title: "이용안내", icon: Info, link: "/guide/time" },
    { title: "프로그램 안내", icon: BookOpen, link: "/program/1" },
    {
      title: "수강 신청",
      icon: Layout,
      link: "/reservation/registration",
    },
    {
      title: "대관 신청",
      icon: CalendarCheck,
      link: "/reservation/rental",
    },
    {
      title: "예약 내역 조회",
      icon: History,
      link: "/member/myReservation",
    },
    { title: "FAQ", icon: HelpCircle, link: "/community/faq" },
=======
    { title: "그린별\n이용안내", icon: Info, link: "/guide/time" },
    { title: "이용원\n프로그램", icon: BookOpen, link: "/program/1" },
    { title: "원자원\n프로그램", icon: Layout, link: "/reservation/registration" },
    { title: "계약하위\n장료", icon: CalendarCheck, link: "/reservation/rental" },
    { title: "집혀학교\n계약신청", icon: History, link: "/member/myReservation" },
    { title: "그린차\n커뮤니티", icon: HelpCircle, link: "/community/faq" },
>>>>>>> Stashed changes
  ];
  return (
<<<<<<< Updated upstream
    // relative w-full: 내부 컨텐츠의 기준점
    <div className="w-full relative">
      {/* [배경 이미지] */}
      {/* z-[-10] 설정: Layout의 Header, Footer(z-50)보다 뒤로 가게 함 */}
      {/* fixed inset-0: 스크롤을 내려도 배경은 화면에 꽉 차게 고정 */}
      <div
        className="fixed inset-0 w-full h-full z-[-10]"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 배경 필터 (검정색 40%) */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      {/* [메인 컨텐츠] */}
      {/* z-10: 배경보다는 앞, 하지만 Header보다는 뒤(Layout 구조상 자연스럽게 배치됨) */}
      <div className="relative z-10 flex flex-col items-center w-full pb-20">
        {/* 타이틀 섹션 */}
        <section className="relative w-full h-[400px] flex flex-col justify-center items-center text-center px-4 mt-10">
          <p className="text-white text-xl md:text-2xl font-semibold mb-2 tracking-tight [text-shadow:_1px_1px_2px_rgba(0,0,0,0.5)]">
            Join. Every. One. – JE:O
          </p>
          <h1
            className="text-white text-5xl md:text-[64px] font-extrabold
            [text-shadow:_2px_2px_4px_rgba(0,0,0,0.7)]"
          >
            재오복합체육센터
          </h1>
        </section>
        <main className="w-full max-w-[1200px] px-4">
          {/* 바로가기 메뉴 (카드형) */}
=======
    <div className="w-full relative">
      
      {/* [1. 배경 이미지] 화면 전체 고정, z-index -10으로 맨 뒤로 보냄 */}
      <div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 배경 필터 (검은색 40%) */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* [2. 메인 컨텐츠] z-index 10으로 배경보다 앞에 배치 */}
      <div className="relative z-10 flex flex-col items-center w-full pb-20 pt-32">
        
        {/* 슬로건 섹션 */}
        <section className="w-full h-[400px] flex flex-col justify-center items-center text-center px-4 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-8">
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-6xl md:text-8xl font-black text-white drop-shadow-lg">
                J<span className="text-blue-400">oy</span>
              </span>
              <span className="text-sm md:text-base text-gray-200 mt-2 font-light tracking-wider">
                운동의 즐거움
              </span>
            </div>
            <span className="hidden md:block text-4xl text-blue-500/50 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>•</span>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <span className="text-6xl md:text-8xl font-black text-white drop-shadow-lg">
                R<span className="text-blue-400">est</span>
              </span>
              <span className="text-sm md:text-base text-gray-200 mt-2 font-light tracking-wider">
                건강한 휴식
              </span>
            </div>
            <span className="hidden md:block text-4xl text-blue-500/50 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>•</span>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <span className="text-6xl md:text-8xl font-black text-white drop-shadow-lg">
                O<span className="text-blue-400">asis</span>
              </span>
              <span className="text-sm md:text-base text-gray-200 mt-2 font-light tracking-wider">
                도심 속 쉼터
              </span>
            </div>
          </div>
          <p className="text-blue-50/80 text-lg font-light tracking-[0.3em] uppercase animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            Green Complex Sports Center
          </p>
        </section>

        <main className="w-full max-w-[1200px] px-4">
          {/* 바로가기 메뉴 */}
>>>>>>> Stashed changes
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.link)}
                className="group flex flex-col items-center justify-center p-6 h-[160px]
<<<<<<< Updated upstream
                  bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/40
=======
                  bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20
>>>>>>> Stashed changes
                  hover:bg-blue-900 hover:border-blue-800 hover:scale-105
                  transition-all duration-300 ease-in-out"
              >
                <div className="mb-4 p-3 rounded-full bg-blue-50 group-hover:bg-white/10 transition-colors">
<<<<<<< Updated upstream
                  <item.icon
                    size={32}
                    className="text-blue-800 group-hover:text-white transition-colors"
=======
                  <item.icon 
                    size={32} 
                    className="text-blue-800 group-hover:text-white transition-colors" 
>>>>>>> Stashed changes
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-slate-800 font-bold text-base leading-snug whitespace-pre-line group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </button>
            ))}
          </section>
<<<<<<< Updated upstream
          {/* 정보 패널 (일정 / 공지사항) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 왼쪽: 일정 안내 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/40">
              <div className="px-6 py-5 border-b border-slate-200/60 flex justify-between items-center">
                <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
                  마감임박 강의목록
                </h2>
                <button
                  onClick={() => navigate("/guide/time")}
=======

          {/* 하단 패널 (일정/공지사항) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="px-6 py-5 border-b border-slate-200/60 flex justify-between items-center">
                <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-800 rounded-full"></span>
                  월별 일정 안내
                </h2>
                <button 
                  onClick={() => navigate('/guide/time')}
>>>>>>> Stashed changes
                  className="text-slate-600 text-sm hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  더보기 <ChevronRight size={16} />
                </button>
              </div>
              <div className="p-6 h-[300px] bg-slate-50/50 flex flex-col items-center justify-center text-slate-400">
<<<<<<< Updated upstream
                <CalendarCheck
                  size={48}
                  className="mb-3 text-slate-300"
                  strokeWidth={1}
                />
                <p className="text-sm font-medium text-black">
                  등록된 일정이 없습니다.
                </p>
              </div>
            </div>
            {/* 오른쪽: 공지사항 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/40">
              <div className="px-6 py-5 border-b border-slate-200/60 flex justify-between items-center">
                <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
                  공지사항
                </h2>
                <button
                  onClick={() => navigate("/community/notice")}
=======
                <CalendarCheck size={48} className="mb-3 text-slate-300" strokeWidth={1} />
                <p className="text-sm font-medium text-slate-500">등록된 일정이 없습니다.</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="px-6 py-5 border-b border-slate-200/60 flex justify-between items-center">
                <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                  공지사항
                </h2>
                <button 
                  onClick={() => navigate('/community/notice')}
>>>>>>> Stashed changes
                  className="text-slate-600 text-sm hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  더보기 <ChevronRight size={16} />
                </button>
              </div>
              <div className="h-[300px] overflow-hidden bg-white/50">
<<<<<<< Updated upstream
                <div className="h-full overflow-y-auto custom-scrollbar p-2">
                  <NoticePreview />
                </div>
=======
                 <div className="h-full overflow-y-auto custom-scrollbar p-2">
                    <NoticePreview />
                 </div>
>>>>>>> Stashed changes
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
<<<<<<< Updated upstream
export default MainPage;
=======

export default MainPage;
>>>>>>> Stashed changes
