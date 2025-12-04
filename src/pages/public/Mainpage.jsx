import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import {
  Info,
  Layout,
  CalendarCheck,
  History,
  HelpCircle,
  BookOpen,
} from "lucide-react";

import ImageSlider from "./ImageSlider";
import NoticePreview from "./NoticePreview";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const menuItems = [
    { title: "이용안내", icon: <Info size={24} />, link: "/guide/time" },
    {
      title: "프로그램 안내",
      icon: <BookOpen size={24} />,
      link: "/program/1",
    },
    {
      title: "수강 신청",
      icon: <Layout size={24} />,
      link: "/reservation/registration",
    },
    {
      title: "대관 신청",
      icon: <CalendarCheck size={24} />,
      link: "/reservation/rental",
    },
    {
      title: "예약 내역 조회",
      icon: <History size={24} />,
      link: "/member/myReservation",
    },
    { title: "FAQ", icon: <HelpCircle size={24} />, link: "/community/faq" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <main className="w-full max-w-[1400px] mx-auto px-6 py-10 mt-16">
        {/* 전체 컨테이너 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="grid grid-cols-12 gap-6 h-[462px]">
            {/* 1. 왼쪽 메뉴 (짙은 인디고 배경 + 아이콘) */}
            <aside className="col-span-3 flex flex-col h-full rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-indigo-800 h-full p-0">
                <div className="grid grid-cols-2 h-full divide-x divide-y divide-indigo-700">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(item.link)}
                      className={`w-full h-full min-h-[90px] flex flex-col items-center justify-center text-white font-semibold text-base md:text-lg 
                      shadow-none transition-all duration-300 hover:bg-indigo-700 break-keep p-2 text-center`}
                    >
                      <div className="mb-2">{item.icon}</div>
                      <span className="leading-tight">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* 2. 가운데 이벤트 영역 (슬라이더) */}
            <section className="col-span-6">
              <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-inner relative flex flex-col justify-center items-center h-[462px]">
                <ImageSlider />
              </div>
            </section>

            {/* 3. 오른쪽 공지 및 지도 API */}
            <aside className="col-span-3 flex flex-col gap-4 h-full">
              {/* 공지사항 영역 */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
                <div className="w-full h-full">
                  <NoticePreview />
                </div>
              </div>

              {/* 지도 영역 */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-200">
                  <Map
                    center={{ lat: 37.3498095, lng: 127.1069927 }}
                    style={{ width: "100%", height: "100%" }}
                    level={5}
                  >
                    <MapMarker
                      position={{ lat: 37.3498095, lng: 127.1069927 }}
                    />
                  </Map>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
