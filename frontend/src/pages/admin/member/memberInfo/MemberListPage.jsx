import React, { useEffect, useState } from "react";
import { searchMemberList } from "../../../../api/adminApi";
import usePageMove from "../../../../hooks/usePageMove";

import MemberListComponent from "./MemberListComponent";

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

    try {
      const res = await searchMemberList(params);
      return res;
    } catch (err) {
      console.error("조회 실패:", err);
      return initState;
    }
  };

  useEffect(() => {
    const params = getQueryParams();
    const memberIdToOpen = params.get("memberIdToOpen");
    const shouldOpenModal = params.get("openModal") === "true";

    let initialRole = null;
    if (filterUser && !filterPartner) initialRole = "ROLE_USER";
    else if (!filterUser && filterPartner) initialRole = "ROLE_PARTNER";

    const initialKeyword = params.get("keyword") || keyword;
    const initialCategory = params.get("type") || category;

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

      if (shouldOpenModal && memberIdToOpen) {
        const targetMember = res.dtoList.find(
          (m) => String(m.memberId) === memberIdToOpen
        );

        if (targetMember) {
          setSelectedMember(targetMember);
          setOpenModal(true);
          const newParams = Object.fromEntries(params.entries());
          delete newParams.openModal;
          delete newParams.memberIdToOpen;
          moveToList(newParams);
        }
      }
    });
  }, [page, size, filterUser, filterPartner]);

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

    const res = await executeSearchAndFilter("", "name", role, 1, size);
    setData(res);

    moveToList({
      page: 1,
      size: size,
      type: "name",
      keyword: "",
      role: role || "",
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
    <>
      <MemberListComponent
        handleSearchSubmit={handleSearchSubmit}
        category={category}
        handleCategory={handleCategory}
        keyword={keyword}
        handleSearchChange={handleSearchChange}
        data={data}
        filterUser={filterUser}
        handleFilterChange={handleFilterChange}
        setFilterUser={setFilterUser}
        setFilterPartner={setFilterPartner}
        setSelectedMember={setSelectedMember}
        setOpenModal={setOpenModal}
        page={page}
        renderStatus={renderStatus}
        moveToList={moveToList}
        openModal={openModal}
        selectedMember={selectedMember}
        filterPartner={filterPartner}
        size={size}
      />
    </>
  );
};

export default MemberListPage;
