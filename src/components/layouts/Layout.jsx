import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ChatWidget from "../chatModal/ChatWidget";

const Layout = () => {
  const location = useLocation();

  const isMainPage = location.pathname === "/";
  const shouldShowSidebar = !isMainPage;

  // 서브 페이지일 때만 flex 클래스를 부모 컨테이너에 적용
  const contentWrapperClasses = `flex-1 w-full max-w-screen-2xl mx-auto ${shouldShowSidebar ? "flex" : ""
    }`;

  if (isMainPage) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={contentWrapperClasses}>
        <Sidebar />
        <main className={`flex-1 bg-white p-6 lg:pl-8`}>
          <Outlet />
        </main>
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;
