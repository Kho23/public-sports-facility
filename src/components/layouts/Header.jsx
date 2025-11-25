import useCustomMove from "../../hooks/useCustomMove";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { allMenuItems } from "../../util/navData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";

const Header = () => {
  const { moveToLogin, moveToMain, moveToAdmin } = useCustomMove();
  const location = useLocation();
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const { isLoggedIn, memberRole, memberId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); //로그아웃 버튼이 눌리면 logout 실행됨
    alert("로그아웃 되었습니다.");
    moveToMain();
  };

  return (
    <header className="bg-white shadow border-b">
      <div className="bg-blue-950 flex space-x-8 justify-end px-8 py-3 text-sm text-white border-b border-gray-200">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {memberRole === "ROLE_ADMIN" && (
              <button
                onClick={moveToAdmin}
                className="hover:underline font-bold text-yellow-400"
              >
                관리자 페이지
              </button>
            )}

            {/* 관리자(ROLE_ADMIN)가 아닐 때만 "마이페이지" 링크가 보입니다. */}
            {memberRole !== "ROLE_ADMIN" && (
              <Link to={`/member`} className="hover:underline">
                마이페이지
              </Link>
            )}

            <button onClick={handleLogout} className="hover:underline">
              {" "}
              로그아웃{" "}
            </button>
          </div>
        ) : (
          <div>
            <Link to="/auth/login" className="hover:underline mr-2">
              로그인
            </Link>
            <Link to="/auth/register" className="hover:underline mr-2">
              회원가입
            </Link>
          </div>
        )}
      </div>

      <nav
        className="relative flex justify-between items-center max-w-7xl mx-auto px-10 py-7 border-gray-200"
        onMouseLeave={() => setHoveredMenuId(null)}
      >
        <Link to="/" className="text-[30px] font-bold text-gray-800">
          그린체육관
        </Link>

        <ul className="flex-1 flex justify-center space-x-16 text-lg font-bold">
          {allMenuItems.map((menu) => {
            if (menu.hideInHeader) {
              return null;
            }
            const isActive = location.pathname.startsWith(menu.path);

            return (
              <li
                key={menu.id}
                className="relative"
                onMouseEnter={() => setHoveredMenuId(menu.id)}
              >
                <Link
                  to={menu.subMenus[0].path}
                  className={`py-2 transition duration-150 ease-in-out block ${
                    isActive
                      ? "text-blue-600 border-b-4 border-blue-600"
                      : "text-gray-800 hover:text-blue-500"
                  }`}
                >
                  {menu.title}
                </Link>

                {menu.subMenus && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 z-10 
                      bg-white shadow-lg border border-gray-200 rounded-b-lg w-60 min-w-max
                      transition-all duration-300 opacity-0 pointer-events-none 
                      ${
                        hoveredMenuId === menu.id
                          ? "opacity-100 pointer-events-auto"
                          : ""
                      }`}
                  >
                    {menu.subMenus.map((subMenu) => (
                      <Link
                        key={subMenu.id}
                        to={subMenu.path}
                        onClick={() => setHoveredMenuId(null)}
                        className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                      >
                        {subMenu.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="w-[100px]"></div>
      </nav>
    </header>
  );
};

export default Header;
