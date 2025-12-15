import React, { useEffect, useState } from "react";
import { searchMemberList } from "../../../../api/adminApi";
import MemberEditModal from "./MemberEditModal";
import usePageMove from "../../../../hooks/usePageMove";
import PageComponent from "../../../../components/common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCnt: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const MemberListPage = () => {
  const [data, setData] = useState(initState);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [filterUser, setFilterUser] = useState(false);
  const [filterPartner, setFilterPartner] = useState(false);
  const { page, size, moveToList, getQueryParams } = usePageMove();

  // executeSearchAndFilter를 비동기 함수로 정의
  const executeSearchAndFilter = async (
    keyword,
    category,
    role,
    page,
    size
  ) => {
    const params = {
      page,
      size,
      type: category,
      keyword: keyword.trim(),
      role: role || "",
    };

    console.log("조회 params", params);

    try {
      const res = await searchMemberList(params);
      return res; // 결과를 반환
    } catch (err) {
      console.error("조회 실패:", err);
      return initState;
    }
  };

  // URL 쿼리 파라미터를 읽고 초기 검색 및 모달을 띄우는 useEffect
  useEffect(() => {
    const params = getQueryParams();
    const memberIdToOpen = params.get("memberIdToOpen");
    const shouldOpenModal = params.get("openModal") === "true";

    // 필터 역할 설정 (체크박스 상태에 따라)
    let initialRole = null;
    if (filterUser && !filterPartner) initialRole = "ROLE_USER";
    else if (!filterUser && filterPartner) initialRole = "ROLE_PARTNER";

    // 1. URL 파라미터를 기반으로 초기 검색 키워드 및 카테고리 설정
    const initialKeyword = params.get("keyword") || keyword;
    const initialCategory = params.get("type") || category;

    // 이전에 설정된 상태값을 덮어쓰지 않도록 초기화 로직에 반영
    if (params.get("type") && params.get("keyword")) {
      setCategory(initialCategory);
      setKeyword(initialKeyword);
    }

    executeSearchAndFilter(
      initialKeyword,
      initialCategory,
      initialRole,
      page,
      size
    ).then((res) => {
      setData(res);

      // 2. 검색이 완료된 후, URL 파라미터가 있다면 모달을 띄웁니다.
      if (shouldOpenModal && memberIdToOpen) {
        // 검색 결과 DTO 목록에서 ID로 해당 회원을 찾습니다.
        const targetMember = res.dtoList.find(
          (m) => String(m.memberId) === memberIdToOpen
        );

        if (targetMember) {
          setSelectedMember(targetMember);
          setOpenModal(true);

          // 3. 모달이 열린 후, URL에서 모달 관련 파라미터 제거하여 새로고침 시 모달이 다시 뜨는 것을 방지
          const newParams = Object.fromEntries(params.entries());
          delete newParams.openModal;
          delete newParams.memberIdToOpen;

          // URL 정리 (기존 검색 필터는 유지)
          moveToList(newParams);
        }
      }
    });
  }, [page, size, filterUser, filterPartner]); // 의존성 배열 유지

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    setFilterUser(false);
    setFilterPartner(false);

    // 검색 실행 후 data 상태 업데이트 및 URL 이동
    const res = await executeSearchAndFilter(keyword, category, null, 1, size);
    setData(res);

    moveToList({
      page: 1,
      size: size,
      type: category,
      keyword: keyword,
    });
  };

  const handleFilterChange = async (setter, currentValue) => {
    const newValue = !currentValue;
    setter(newValue);

    setKeyword("");
    setCategory("name");

    let nextUser = filterUser;
    let nextPartner = filterPartner;

    if (setter === setFilterUser) nextUser = newValue;
    if (setter === setFilterPartner) nextPartner = newValue;

    let role = null;
    if (nextUser && !nextPartner) role = "ROLE_USER";
    else if (!nextUser && nextPartner) role = "ROLE_PARTNER";

    // 필터 변경 후 data 상태 업데이트 및 URL 이동
    const res = await executeSearchAndFilter("", "name", role, 1, size);
    setData(res);

    moveToList({
      page: 1,
      size: size,
      type: "name", // 필터 변경 시 검색 유형은 기본값으로 리셋
      keyword: "", // 필터 변경 시 키워드는 비움
      role: role || "", // 역할 파라미터 추가
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case "ROLE_USER":
        return (
          <span className="px-2 py-1 rounded-lg text-gray-700 bg-gray-100 font-semibold">
            일반 회원
          </span>
        );
      case "ROLE_PARTNER":
        return (
          <span className="px-2 py-1 rounded-lg text-green-700 bg-green-100 font-semibold">
            파트너 회원
          </span>
        );
      case "ROLE_ADMIN":
        return (
          <span className="px-2 py-1 rounded-lg text-red-700 bg-red-100 font-semibold">
            관리자
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto max-w-full p-2 md:p-4">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-gray-800">
        회원 목록
      </h1>

      <form
        onSubmit={handleSearchSubmit}
        className="flex justify-end items-center space-x-2 my-4 p-4 bg-gray-100 rounded-md"
      >
        <select
          value={category}
          onChange={handleCategory}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="id">ID</option>
          <option value="name">이름</option>
        </select>

        <input
          type="text"
          name="keyword"
          value={keyword}
          placeholder="검색어를 입력하세요"
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 flex-grow max-w-xs"
        />

        <button
          type="submit"
          className="bg-gray-700 text-white font-bold rounded px-4 py-2 hover:bg-gray-800"
        >
          검색
        </button>
      </form>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            총 {data.totalCnt}건
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filterUser}
                onChange={() => handleFilterChange(setFilterUser, filterUser)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700">일반회원</span>
            </label>
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filterPartner}
                onChange={() =>
                  handleFilterChange(setFilterPartner, filterPartner)
                }
                className="w-4 h-4 text-green-600 border-gray-300 rounded"
              />
              <span className=" text-gray-700">파트너회원</span>
            </label>
          </div>
        </div>
      </div>

      <table className="w-full text-center border-t-2 border-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-20">번호</th>
            <th className="p-3">이름</th>
            <th className="p-3">아이디</th>
            <th className="p-3">가입일</th>
            <th className="p-3">회원 권한</th>
          </tr>
        </thead>

        <tbody>
          {data.dtoList.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                등록된 회원이 없습니다.
              </td>
            </tr>
          ) : (
            data.dtoList.map((i, idx) => (
              <tr
                key={i.memberId}
                onClick={() => {
                  setSelectedMember(i);
                  setOpenModal(true);
                }}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">
                  {(page - 1) * size + (idx + 1)}
                </td>
                <td className="p-3 text-sm text-gray-600">{i.memberName}</td>
                <td className="p-3 text-sm text-gray-700">{i.memberLoginId}</td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(i.memberJoinDate).toLocaleDateString().slice(0, -1)}
                </td>
                <td className="p-3 text-gray-600">
                  {renderStatus(i.memberRole)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PageComponent는 사용자님의 환경에 맞게 경로 및 props를 확인하세요. */}
      <PageComponent serverData={data} movePage={moveToList} />

      {openModal && (
        <MemberEditModal
          member={selectedMember}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default MemberListPage;
