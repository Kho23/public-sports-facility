import React from "react";
import { Link, useLocation } from "react-router-dom";
import { allMenuItems } from "../../util/navData";

/**
 * 🚩 이미지 디자인이 적용된 사이드바 컴포넌트
 */
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. 현재 URL 경로를 기반으로 '활성화된 1차 메뉴 그룹'을 찾습니다.
  const activeGroup = allMenuItems.find((menu) =>
    currentPath.startsWith(menu.path)
  );

  // 활성화된 그룹이 없거나 세부 메뉴가 없으면 사이드바를 숨깁니다.
  if (!activeGroup || !activeGroup.subMenus) {
    return null;
  }

  const subMenus = activeGroup.subMenus;

  return (
    <div className="w-60 min-h-full bg-white px-4 py-6">
      <div
        className="
          h-24 flex items-center justify-center text-white text-xl font-bold rounded-lg mb-4
          bg-gradient-to-r from-blue-700 to-blue-900 shadow-md
        "
      >
        {activeGroup.title}
      </div>
      <nav className="flex flex-col space-y-2">
        {" "}
        {/* space-y-2로 메뉴 간 세로 간격 추가 */}
        {subMenus.map((item) => {
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                block w-full py-4 pl-4 pr-2 text-base rounded-lg border bg-white
                transition duration-150 ease-in-out text-gray-700
                hover:bg-gray-50 hover:border-gray-300
                ${
                  // 🟡 활성화된 항목 스타일 (굵은 글씨, 배경색/테두리 변경 없음)
                  isActive
                    ? "font-bold text-gray-900 border-blue-900 shadow-sm" // 활성화 시 글씨 강조 및 테두리 색상 변경
                    : "" // 비활성 시 추가 스타일 없음
                }
              `}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
