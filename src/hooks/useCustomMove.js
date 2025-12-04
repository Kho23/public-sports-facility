import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();
  const moveToLogin = () => navigate("/auth/login");
  const moveToMain = () => navigate("/");
  const moveToNotice = (id) => navigate(`/community/notice`);
  const moveToNoticeDetail = (id) => navigate(`/community/notice/${id}`);
  const moveToGallery = () => navigate("/community/gallery");
  const moveToGalleryDetail = (id) => navigate(`/community/gallery/${id}`);
  const moveToAdminGallery = () => navigate("/admin/gallery");
  const moveToAdminGalleryRegister = () => navigate("/admin/gallery/register");
  const moveToAdminGalleryDetail = (id) => navigate(`/admin/gallery/${id}`);
  const moveToAdmin = () => navigate("/admin");
  const moveToFindId = () => navigate("/auth/find-id");
  const moveToFindPw = () => navigate("/auth/find-pw");
  const moveToRegister = () => navigate("/auth/register");
  const moveToAdminNoticeDetail = (id) => navigate(`/admin/notice/${id}`);
  const moveToAdminPartnerRequestDetail = (id) =>
    navigate(`/admin/member/partnerRequest/${id}`);
  const moveToAdminSupportDetail = (id) =>
    navigate(`/admin/member/support/${id}`);

  return {
    moveToAdminGalleryRegister,
    moveToAdminGallery,
    moveToAdminGalleryDetail,
    moveToRegister,
    moveToFindId,
    moveToNotice,
    moveToFindPw,
    moveToLogin,
    moveToMain,
    moveToNoticeDetail,
    moveToGallery,
    moveToGalleryDetail,
    moveToAdminNoticeDetail,
    moveToAdmin,
    moveToAdminPartnerRequestDetail,
    moveToAdminSupportDetail,
  };
};

export default useCustomMove;
