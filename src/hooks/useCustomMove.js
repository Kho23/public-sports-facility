import React from "react";
import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();
  const moveToLogin = () => navigate("/auth/login");
  const moveToMain = () => navigate("/");
  const moveToNoticeDetail = (id) => navigate(`/community/notice/${id}`);
  const moveToGallery = () => navigate("/community/gallery");
  const moveToGalleryDetail = (id) => navigate(`/community/gallery/${id}`);
  const moveToAdminNoticeDetail = (id) => navigate(`/admin/notice+/${id}`);
  const moveToAdmin = () => navigate("/admin")
  const moveToFindId=()=>navigate("/auth/find-id")
  const moveToFindPw=()=>navigate("/auth/find-pw")
  return {
    moveToFindId,
    moveToFindPw,
    moveToLogin,
    moveToMain,
    moveToNoticeDetail,
    moveToGallery,
    moveToGalleryDetail,
    moveToAdminNoticeDetail,
    moveToAdmin,
  };
};

export default useCustomMove;
