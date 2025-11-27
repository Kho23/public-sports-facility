import React, { useEffect, useState } from "react";
import { searchMemberList } from "../../../../api/adminApi";
import MemberEditModal from "./MemberEditModal";

const MemberListPage = () => {
  const [data, setData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [filterUser, setFilterUser] = useState(false);
  const [filterPartner, setFilterPartner] = useState(false);

  useEffect(() => {
    executeSearchAndFilter(keyword, category, null);
  }, []);

  const executeSearchAndFilter = async (keyword, category, role) => {
    const params = {
      category,
      keyword: keyword.trim(),
      role: role || "",
    };

    console.log("조회 params", params);

    try {
      const res = await searchMemberList(params);
      setData(res);
    } catch (err) {
      console.error("조회 실패:", err);
    }
  };

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

    await executeSearchAndFilter(keyword, category, null);
  };

  const handleFilterChange = (setter, currentValue) => {
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

    executeSearchAndFilter("", "name", role);
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
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
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
            총 {data.length}건
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
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                등록된 회원이 없습니다.
              </td>
            </tr>
          ) : (
            data.map((i, idx) => (
              <tr
                key={i.memberId}
                onClick={() => {
                  setSelectedMember(i);
                  setOpenModal(true);
                }}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3 text-sm text-gray-600">{idx + 1}</td>
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
