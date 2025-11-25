import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import useCustomMove from "../../hooks/useCustomMove";
import { useEffect } from "react";

const AdminLayout = () => {
  const { moveToLogin } = useCustomMove();
  const { isLoggedIn, memberRole } = useSelector((state) => state.auth);
  useEffect(() => {
    //관리자 페이지에 들어오면 로그인 상태와 권환을 확인하여 조건에 충족하지 않으면 로그인 페이지로 이동시킴
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.")
      setTimeout(() => {
        moveToLogin();
      }, 0)

    } else if (memberRole != "ROLE_ADMIN") {
      alert("접근 권한이 없습니다.")
      setTimeout(() => {
        moveToLogin();
      }, 0)
    }
  }, [isLoggedIn, memberRole, moveToLogin])
  //관리자 페이지 접근 시 로그인 여부와 권한을 확인하여 비로그인 또는 관리자 권한이 아닌 경우
  //로그인 페이지로 이동합니다

  return (
    <div className="flex flex-col min-h-screen bg-[#2e3441] text-gray-100">
      <AdminHeader />
      <div className={`flex flex-1 flex-col"}`}>
        <AdminSidebar />
        <main className="flex-1 bg-white text-gray-800 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
