import useCustomMove from "../../hooks/useCustomMove";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { allMenuItems } from "../../util/navData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
const Header = () => {
  const { moveToMain, moveToAdmin } = useCustomMove();
  const location = useLocation();
  const { isLoggedIn, memberRole } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
<<<<<<< Updated upstream
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMainPage = location.pathname === "/";
=======

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMainPage = location.pathname === "/";

>>>>>>> Stashed changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleLogout = () => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    moveToMain();
  };
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleMouseEnter = (id) => {
    setHoveredMenuId(id);
    setIsMenuOpen(true);
  };
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  const handleMouseLeave = () => {
    setHoveredMenuId(null);
    setIsMenuOpen(false);
  };
<<<<<<< Updated upstream
  // --- 스타일 정의 ---
  const isSolidHeader = isScrolled || isMenuOpen;
  const headerContainerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
    isMainPage && !isSolidHeader
      ? "bg-black/20 backdrop-blur-[3px] border-white/10"
      : "bg-white/90 border-gray-200 shadow-sm"
  }`;
  const logoColor =
    isMainPage && !isSolidHeader ? "text-white drop-shadow-md" : "text-black";
  const menuTextColor =
    isMainPage && !isSolidHeader ? "text-white/90" : "text-slate-700";
  const menuHoverColor =
    isMainPage && !isSolidHeader
      ? "hover:text-blue-200"
      : "hover:text-blue-800";
  const topBarClass = `flex space-x-6 h-[50px] justify-end px-8 py-2 text-[14px] font-medium transition-colors duration-300 ${
    isMainPage && !isSolidHeader
      ? "bg-transparent border-b border-white/10 text-white/80"
      : "bg-white/10 border-b border-gray-200 text-slate-500"
  }`;
  return (
    <header className={headerContainerClass} onMouseLeave={handleMouseLeave}>
      {/* 1. 최상단 유틸리티 바 */}
      <div className={topBarClass}>
        <div className="flex items-center tracking-wide mr-64">
          {isLoggedIn ? (
            <>
              {memberRole === "ROLE_ADMIN" && (
                <button
                  onClick={moveToAdmin}
                  className="mr-5 text-amber-500 hover:text-amber-600 transition-colors font-bold"
                >
                  관리자 페이지
                </button>
              )}
              {memberRole === "ROLE_USER" && (
                <Link
                  to={`/member`}
                  className="mr-10 hover:text-blue-600 transition-colors"
                >
                  마이페이지
                </Link>
              )}
              {memberRole === "ROLE_PARTNER" && (
                <Link
                  to={`/partner`}
                  className="mr-5 hover:text-blue-600 transition-colors"
                >
                  파트너 페이지
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-blue-600 transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="mr-5 hover:text-blue-600 transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/auth/register"
                className="hover:text-blue-600 transition-colors"
              >
                회원가입
              </Link>
=======

  // --- 스타일 정의 ---
  const isSolidHeader = isScrolled || isMenuOpen;

  const headerContainerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
    isMainPage && !isSolidHeader
      ? "bg-black/20 backdrop-blur-[3px] border-white/10"
      : "bg-white border-gray-200 shadow-sm"
  }`;

  const logoColor = isMainPage && !isSolidHeader ? "text-white drop-shadow-md" : "text-blue-900";
  const menuTextColor = isMainPage && !isSolidHeader ? "text-white/90" : "text-slate-700";
  const menuHoverColor = isMainPage && !isSolidHeader ? "hover:text-blue-200" : "hover:text-blue-800";
  
  const topBarClass = `flex space-x-6 justify-end px-8 py-2 text-xs font-medium transition-colors duration-300 ${
    isMainPage && !isSolidHeader
      ? "bg-transparent border-b border-white/10 text-white/80"
      : "bg-slate-50 border-b border-gray-200 text-slate-500"
  }`;

  return (
    <header
      className={headerContainerClass}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. 최상단 유틸리티 바 */}
      <div className={topBarClass}>
        <div className="flex items-center tracking-wide">
          {isLoggedIn ? (
            <>
              {memberRole === "ROLE_ADMIN" && (
                <button onClick={moveToAdmin} className="mr-5 hover:text-amber-500 transition-colors font-bold">ADMIN</button>
              )}
              {memberRole === "ROLE_USER" && (
                <Link to={`/member`} className="mr-5 hover:text-blue-600 transition-colors">MY PAGE</Link>
              )}
              {memberRole === "ROLE_PARTNER" && (
                <Link to={`/partner`} className="mr-5 hover:text-blue-600 transition-colors">PARTNER</Link>
              )}
              <button onClick={handleLogout} className="hover:text-blue-600 transition-colors">LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="mr-5 hover:text-blue-600 transition-colors">LOGIN</Link>
              <Link to="/auth/register" className="hover:text-blue-600 transition-colors">JOIN</Link>
>>>>>>> Stashed changes
            </>
          )}
        </div>
      </div>
<<<<<<< Updated upstream
      {/* 2. 메인 네비게이션바 */}
      <nav className="relative flex items-center max-w-[1400px] mx-auto px-6 h-20">
=======

      {/* 2. 메인 네비게이션바 */}
      <nav className="relative flex items-center max-w-[1400px] mx-auto px-6 h-24">
        
>>>>>>> Stashed changes
        {/* [로고] */}
        <div className="flex-none w-[200px]">
          <Link
            to="/"
            className={`text-3xl font-extrabold tracking-tighter transition-colors duration-300 ${logoColor}`}
          >
<<<<<<< Updated upstream
            JE:O CENTER
          </Link>
        </div>
=======
            그린복합체육센터
          </Link>
        </div>

>>>>>>> Stashed changes
        {/* [대메뉴 리스트] */}
        <ul className="flex-1 flex h-full px-4">
          {allMenuItems.map((menu) => {
            if (menu.hideInHeader) return null;
            const isActive = location.pathname.startsWith(menu.path);
            return (
              <li
                key={menu.id}
                className="flex-1 group h-full flex items-center justify-center relative"
                onMouseEnter={() => handleMouseEnter(menu.id)}
              >
                <Link
                  to={menu.subMenus[0].path}
                  className={`text-[19px] font-bold tracking-tight transition-all duration-300 relative py-2 block text-center w-full
<<<<<<< Updated upstream
                    ${
                      isActive
                        ? isMainPage && !isSolidHeader
                          ? "text-blue-300"
                          : "text-blue-800"
                        : menuTextColor
                    }
=======
                    ${isActive 
                        ? (isMainPage && !isSolidHeader ? "text-blue-300" : "text-blue-800") 
                        : menuTextColor}
>>>>>>> Stashed changes
                    ${menuHoverColor}
                  `}
                >
                  {menu.title}
<<<<<<< Updated upstream
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px]
                    ${
                      isMainPage && !isSolidHeader
                        ? "bg-blue-400"
                        : "bg-blue-800"
                    }
                    transition-all duration-300 group-hover:w-full
                    ${isActive ? "w-full" : ""}
                  `}
                  />
=======
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] 
                    ${isMainPage && !isSolidHeader ? "bg-blue-400" : "bg-blue-800"} 
                    transition-all duration-300 group-hover:w-full
                    ${isActive ? "w-full" : ""}
                  `} />
>>>>>>> Stashed changes
                </Link>
              </li>
            );
          })}
        </ul>
<<<<<<< Updated upstream
        {/* [우측 여백] */}
        <div className="flex-none w-[200px] hidden xl:block"></div>
      </nav>
      {/* 3. 메가 메뉴 패널 */}
      <div
        className={`absolute top-full left-0 w-full bg-white z-40 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl
          ${
            isMenuOpen
              ? "max-h-[500px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex relative min-h-[320px]">
          {/* [좌측 패널] - 대메뉴 제목 표시 (분야별, 이용안내 등) */}
          <div className="absolute top-0 left-6 w-[200px] h-full py-10 border-r border-gray-100 flex flex-col z-10 bg-white">
            {/* 현재 선택된 메뉴의 큰 제목 */}
            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter leading-tight break-keep">
              {hoveredMenuId
                ? allMenuItems.find((m) => m.id === hoveredMenuId)?.title
                : "소통마당"}
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Healthy Life,
              <br />
              Happy Together
            </p>
            <div className="mt-auto opacity-30">
              <div className="w-10 h-10 bg-blue-900 rounded-full blur-xl absolute bottom-10 left-0"></div>
            </div>
          </div>
          <div className="absolute top-0 right-6 w-[200px] h-full border-l border-gray-100 hidden xl:block z-10 bg-white"></div>
=======

        {/* [우측 여백] */}
        <div className="flex-none w-[200px] hidden xl:block"></div>
      </nav>

      {/* 3. 메가 메뉴 패널 */}
      <div
        className={`absolute top-full left-0 w-full bg-white z-40 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl
          ${isMenuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex relative min-h-[320px]">
          
          {/* [좌측 패널] - 대메뉴 제목 표시 (분야별, 이용안내 등) */}
          <div className="absolute top-0 left-6 w-[200px] h-full py-10 border-r border-gray-100 flex flex-col z-10 bg-white">
             {/* 현재 선택된 메뉴의 큰 제목 */}
             <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter leading-tight break-keep">
                {hoveredMenuId 
                  ? allMenuItems.find(m => m.id === hoveredMenuId)?.title 
                  : "소통마당"}
             </h2>
             <p className="text-slate-400 text-xs leading-relaxed">
                Healthy Life,<br/>Happy Together
             </p>
             <div className="mt-auto opacity-30">
                <div className="w-10 h-10 bg-blue-900 rounded-full blur-xl absolute bottom-10 left-0"></div>
             </div>
          </div>

          <div className="absolute top-0 right-6 w-[200px] h-full border-l border-gray-100 hidden xl:block z-10 bg-white"></div>

>>>>>>> Stashed changes
          {/* [중앙 컬럼 리스트] */}
          <div className="flex-1 flex ml-[200px] xl:mr-[200px]">
            {allMenuItems.map((menu) => {
              if (menu.hideInHeader) return null;
<<<<<<< Updated upstream
              const isHoveredColumn = hoveredMenuId === menu.id;
              return (
                <div
=======
              
              const isHoveredColumn = hoveredMenuId === menu.id;

              return (
                <div 
>>>>>>> Stashed changes
                  key={menu.id}
                  onMouseEnter={() => handleMouseEnter(menu.id)}
                  // [변경] 제목을 뺐으므로 상단 패딩(pt-8)을 줄이고 리스트가 위에서부터 시작되게 함
                  className={`flex-1 pt-8 pb-10 px-2 transition-colors duration-200 border-r border-gray-100 last:border-r-0
<<<<<<< Updated upstream
                    ${isHoveredColumn ? "bg-blue-900" : "bg-white"}
                  `}
                >
                  {/* [변경] 중복 제목(h3) 삭제됨 */}
                  {/* 서브메뉴 리스트 */}
                  <ul className="space-y-3 flex flex-col items-center w-full">
                    {menu.subMenus &&
                      menu.subMenus.map((subMenu) => (
                        <li key={subMenu.id} className="w-full text-center">
                          <Link
                            to={subMenu.path}
                            onClick={() => setIsMenuOpen(false)}
                            // [변경] 가독성 개선: 글자 크기 16px, 폰트 두께 semibold, 기본 색상 slate-700
                            className={`block text-[16px] py-2 transition-all duration-200 rounded-md
                            ${
                              isHoveredColumn
                                ? "text-white font-bold hover:bg-blue-800 hover:scale-105" // 남색 배경일 때: 흰색 + 굵게
                                : "text-slate-700 font-semibold hover:text-blue-800 hover:bg-slate-50"
                            } // 흰색 배경일 때: 진한 회색 + 굵게
                          `}
                          >
                            {subMenu.title}
                          </Link>
                        </li>
                      ))}
=======
                    ${isHoveredColumn 
                      ? "bg-blue-900" 
                      : "bg-white"}
                  `}
                >
                  {/* [변경] 중복 제목(h3) 삭제됨 */}
                  
                  {/* 서브메뉴 리스트 */}
                  <ul className="space-y-3 flex flex-col items-center w-full">
                    {menu.subMenus && menu.subMenus.map((subMenu) => (
                      <li key={subMenu.id} className="w-full text-center">
                        <Link
                          to={subMenu.path}
                          onClick={() => setIsMenuOpen(false)}
                          // [변경] 가독성 개선: 글자 크기 16px, 폰트 두께 semibold, 기본 색상 slate-700
                          className={`block text-[16px] py-2 transition-all duration-200 rounded-md
                            ${isHoveredColumn 
                              ? "text-white font-bold hover:bg-blue-800 hover:scale-105"  // 남색 배경일 때: 흰색 + 굵게
                              : "text-slate-700 font-semibold hover:text-blue-800 hover:bg-slate-50"} // 흰색 배경일 때: 진한 회색 + 굵게
                          `}
                        >
                          {subMenu.title}
                        </Link>
                      </li>
                    ))}
>>>>>>> Stashed changes
                  </ul>
                </div>
              );
            })}
          </div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        </div>
      </div>
    </header>
  );
};
<<<<<<< Updated upstream
export default Header;
=======

export default Header;
>>>>>>> Stashed changes
