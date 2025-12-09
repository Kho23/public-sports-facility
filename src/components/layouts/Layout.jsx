import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ChatWidget from "../chatModal/ChatWidget";
const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const shouldShowSidebar = !isMainPage;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  // [수정] 서브 페이지일 때 상단 여백을 넉넉하게 (헤더 높이 + 여유분)
  // pt-[140px] 정도로 늘려서 헤더와 겹치지 않게 함
  const contentWrapperClasses = `flex-1 w-full max-w-screen-2xl mx-auto pt-[140px] pb-20 ${
    shouldShowSidebar ? "flex" : ""
  }`;
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  if (isMainPage) {
    return (
      <div className="flex flex-col min-h-screen relative">
        <Header />
        {/* 메인 페이지는 헤더가 투명이므로 여백 없음 (또는 디자인에 따라 조절) */}
        <main className="flex-1 w-full relative z-0">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 서브 페이지 헤더 */}
      <Header />
<<<<<<< Updated upstream
=======
      
>>>>>>> Stashed changes
      {/* 본문 영역 */}
      <div className={contentWrapperClasses}>
        <Sidebar />
        <main className="flex-1 bg-white p-6 lg:pl-8 min-h-[600px]">
          <Outlet />
        </main>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
};
<<<<<<< Updated upstream
export default Layout;
=======

export default Layout;
>>>>>>> Stashed changes
