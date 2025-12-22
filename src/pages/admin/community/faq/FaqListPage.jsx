import React, { useEffect, useState } from "react";
import { getFaqList, getFaqCategory } from "../../../../api/faqApi";
import { createFaq, updateFaq, deleteFaq } from "../../../../api/adminApi";
import FaqListComponent from "./FaqListComponent";

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
    <>
      <FaqListComponent
        openModal={openModal}
        faqs={faqs}
        handleDelete={handleDelete}
        isModalOpen={isModalOpen}
        currentFaq={currentFaq}
        data={data}
        handleChange={handleChange}
        categories={categories}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
      />
    </>
  );
};

export default FaqListPage;
