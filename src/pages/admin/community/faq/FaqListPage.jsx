import React, { useEffect, useState } from "react";
import { getFaqList, getFaqCategory } from "../../../../api/faqApi";
import { createFaq, updateFaq, deleteFaq } from "../../../../api/adminApi";
import FaqListComponent from "./FaqListComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

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

  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "alert",
    onConfirm: null,
  });

  const openMessageModal = ({ message, type = "alert", onConfirm }) => {
    setModal({ open: true, message, type, onConfirm });
  };

  const closeMessageModal = () => {
    setModal({ ...modal, open: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faqData = await getFaqList();
        const categoryData = await getFaqCategory();
        setFaqs(faqData);
        setCategories(categoryData);
      } catch {
        openMessageModal({ message: "데이터 로딩 실패" });
      }
    };
    fetchData();
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
        faqCategoryId: categories[0]?.faqCategoryId || "",
        question: "",
        answer: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (faqId) => {
    openMessageModal({
      message: "정말로 이 FAQ를 삭제하시겠습니까?",
      type: "confirm",
      onConfirm: async (result) => {
        if (result === "ok") {
          try {
            await deleteFaq(faqId);
            openMessageModal({
              message: "삭제되었습니다.",
              onConfirm: () => window.location.reload(),
            });
          } catch {
            openMessageModal({ message: "삭제 중 오류가 발생했습니다." });
          }
        }
      },
    });
  };

  const handleSave = async () => {
    if (!data.question || !data.answer) {
      openMessageModal({ message: "질문과 답변을 모두 입력해주세요." });
      return;
    }

    if (!data.faqCategoryId) {
      openMessageModal({ message: "카테고리를 선택해주세요." });
      return;
    }

    try {
      if (currentFaq) {
        await updateFaq(currentFaq.faqId, data);
        openMessageModal({
          message: "수정되었습니다.",
          onConfirm: () => window.location.reload(),
        });
      } else {
        await createFaq(data);
        openMessageModal({
          message: "등록되었습니다.",
          onConfirm: () => window.location.reload(),
        });
      }
      setIsModalOpen(false);
    } catch {
      openMessageModal({ message: "저장 중 오류가 발생했습니다." });
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

      {modal.open && (
        <ModalComponent
          message={modal.message}
          type={modal.type}
          onConfirm={(result) => {
            modal.onConfirm?.(result);
            closeMessageModal();
          }}
        />
      )}
    </>
  );
};

export default FaqListPage;
