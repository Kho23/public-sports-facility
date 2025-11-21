import React from "react";
import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();
  const moveToLogin = () => navigate("/login");
  const moveToMain = () => navigate("/");
  const moveToNoticeDetail = (id) => navigate(`/community/notice/${id}`);
  const moveToGallery = () => navigate("/community/gallery");
  const moveToGalleryDetail = (id) => navigate(`/community/gallery/${id}`);
  const moveToAdminNoticeDetail = (id) => navigate(`/admin/notice/${id}`);
  const moveToAdminPartnerRequestDetail = (id) =>
    navigate(`/admin/member/partnerRequest/${id}`);
  const moveToAdminSupportDetail = (id) =>
    navigate(`/admin/member/support/${id}`);

  return {
    moveToLogin,
    moveToMain,
    moveToNoticeDetail,
    moveToGallery,
    moveToGalleryDetail,
    moveToAdminNoticeDetail,
    moveToAdminPartnerRequestDetail,
    moveToAdminSupportDetail,
  };
};

export default useCustomMove;
