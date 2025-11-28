import React, { useEffect, useState } from "react";
import { getFaqList, getFaqCategory } from "../../../../api/faqApi";
import { createFaq, updateFaq, deleteFaq } from "../../../../api/adminApi";

const FaqListPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [data, setData] = useState({
    faqCategoryId: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    const f = async () => {
      try {
        const faqData = await getFaqList();
        const categoryData = await getFaqCategory();
        setFaqs(faqData);
        setCategories(categoryData);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };
    f();
  }, []);

  const openModal = (faq) => {
    if (faq) {
      setCurrentFaq(faq);
      setData({
        faqCategoryId: faq.faqCategoryId,
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      setCurrentFaq(null);
      setData({
        faqCategoryId: categories[0].faqCategoryId,
        question: "",
        answer: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (faqId) => {
    if (window.confirm("정말로 이 FAQ를 삭제하시겠습니까?")) {
      try {
        await deleteFaq(faqId);
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSave = async () => {
    if (!data.question || !data.answer) {
      alert("질문과 답변을 모두 입력해주세요.");
      return;
    }
    if (!data.faqCategoryId) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    try {
      if (currentFaq) {
        await updateFaq(currentFaq.faqId, data);
        alert("수정되었습니다.");
      } else {
        await createFaq(data);
        alert("등록되었습니다.");
      }
      setIsModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8">
      {/* --- 헤더 영역 --- */}
      <div className="flex justify-between items-end mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">자주 묻는 질문 관리</h1>
        <button
          onClick={() => openModal(null)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 font-medium transition-colors"
        >
          + FAQ 등록
        </button>
      </div>

      <div className="text-sm mb-2">총 {faqs.length}건</div>

      {/* --- 테이블 영역 --- */}
      <table className="w-full text-center border-t-2 border-gray-700 table-fixed">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 w-16">번호</th>
            <th className="p-3 w-32">카테고리</th>
            <th className="p-3 w-1/4">질문</th>
            <th className="p-3">답변 (미리보기)</th>
            <th className="p-3 w-32">관리</th>
          </tr>
        </thead>

        <tbody>
          {faqs.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                등록된 FAQ가 없습니다.
              </td>
            </tr>
          ) : (
            faqs.map((faq, idx) => (
              <tr key={faq.faqId} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-600">{idx + 1}</td>

                {/* 카테고리 */}
                <td className="p-3 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-gray-200 rounded text-xs font-semibold">
                    {faq.categoryName}
                  </span>
                </td>

                {/* 질문 */}
                <td className="p-3 text-sm text-gray-700 text-left truncate font-medium">
                  {faq.question}
                </td>

                {/* 답변 (말줄임) */}
                <td className="p-3 text-sm text-gray-500 text-left">
                  <div className="line-clamp-1 text-ellipsis overflow-hidden">
                    {faq.answer}
                  </div>
                </td>

                {/* 관리 버튼 */}
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(faq)}
                      className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-white text-gray-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(faq.faqId)}
                      className="px-2 py-1 text-xs border border-red-200 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* --- 모달 (등록/수정 폼) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              {currentFaq ? "FAQ 수정" : "FAQ 등록"}
            </h2>

            <div className="space-y-4">
              {/* 카테고리 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <select
                  name="faqCategoryId"
                  value={data.faqCategoryId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.faqCategoryId} value={cat.faqCategoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* 질문 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  질문 (Q)
                </label>
                <input
                  type="text"
                  name="question"
                  value={data.question}
                  onChange={handleChange}
                  placeholder="질문을 입력하세요"
                  autoComplete="off"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* 답변 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  답변 (A)
                </label>
                <textarea
                  name="answer"
                  value={data.answer}
                  onChange={handleChange}
                  rows="5"
                  placeholder="답변 내용을 입력하세요"
                  autoComplete="off"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>
            </div>

            {/* 모달 버튼 */}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqListPage;
