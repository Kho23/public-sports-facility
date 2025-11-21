import { lazy, Suspense } from "react";
import ProgramListPage from "../pages/program/ProgramListPage";
import ProgramEditPage from "../pages/admin/program/ProgramEditPage";
import NoticeEditPage from "../pages/admin/community/notice/NoticeEditPage";
import NoticeAddPage from "../pages/admin/community/notice/NoticeAddPage";
import FaqListPage from "../pages/faq/FaqListPage";
import NoticeListPage from "../pages/admin/community/notice/NoticeListPage";
import NoticeReadPage from "../pages/admin/community/notice/NoticeReadPage";
import PartnerRequestPage from "../pages/admin/member/partnerRequest/PartnerRequestPage";
import PartnerRequestList from "../pages/admin/member/partnerRequest/PartnerRequestList";
import GuideEditPage from "../pages/admin/guide/GuideEditPage";
import SupportListPage from "../pages/admin/member/support/SupportListPage";
import SupportDetailPage from "../pages/admin/member/support/SupportDetailPage";
import GuideViewPage from "../pages/admin/guide/GuideViewPage";
import GuideAdminPage from "../pages/admin/guide/GuideAdminPage";

const Loading = () => <div>Loading...</div>;
const adminRouter = () => {
  return [
    {
      path: "program/:programId",
      element: (
        <Suspense fallback={<Loading />}>
          <ProgramListPage />
        </Suspense>
      ),
    },
    {
      path: "program/update/:programId",
      element: (
        <Suspense fallback={<Loading />}>
          <ProgramEditPage />
        </Suspense>
      ),
    },
    {
      path: "notice",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeListPage />
        </Suspense>
      ),
    },
    {
      path: "notice/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeReadPage />
        </Suspense>
      ),
    },
    {
      path: "notice/add",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeAddPage />
        </Suspense>
      ),
    },
    {
      path: "notice/update/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeEditPage />
        </Suspense>
      ),
    },
    {
      path: "faq",
      element: (
        <Suspense fallback={<Loading />}>
          <FaqListPage />
        </Suspense>
      ),
    },
    {
      path: "member/partnerRequest",
      element: (
        <Suspense fallback={<Loading />}>
          <PartnerRequestList />
        </Suspense>
      ),
    },
    {
      path: "member/partnerRequest/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <PartnerRequestPage />
        </Suspense>
      ),
    },
    {
      path: "member/support",
      element: (
        <Suspense fallback={<Loading />}>
          <SupportListPage />
        </Suspense>
      ),
    },
    {
      path: "member/support/:no",
      element: (
        <Suspense fallback={<Loading />}>
          <SupportDetailPage />
        </Suspense>
      ),
    },
    {
      path: "guide/:category",
      element: (
        <Suspense fallback={<Loading />}>
          <GuideAdminPage />
        </Suspense>
      ),
    },
  ];
};
export default adminRouter;
