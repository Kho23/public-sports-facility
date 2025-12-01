import { lazy, Suspense } from "react";
import partnerMyLessonRouter from "./partnerMyLessonRouter";

const PartnerEdit = lazy(() =>
  import("../pages/partner/partnerEdit/PartnerEditPage")
);
const PwEditPage = lazy(() => import("../pages/partner/pwEdit/PwEditPage"));
const MyLessons = lazy(() =>
  import("../pages/partner/myLessons/MyLessonsPage")
);
const LessonsRequest = lazy(() =>
  import("../pages/partner/lessonRequest/LessonRequestPage")
);

const Attendance = lazy(() =>
  import("../pages/partner/attendance/AttendancePage")
);

const Loading = () => <div>Loading...</div>;
const partnerMyPageRouter = () => {
  return [
    {
      path: "partnerEdit",
      element: (
        <Suspense fallback={<Loading />}>
          <PartnerEdit />
        </Suspense>
      ),
    },
    {
      path: "pwEditPage",
      element: (
        <Suspense fallback={<Loading />}>
          <PwEditPage />
        </Suspense>
      ),
    },
    {
      path: "myLessons",
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <MyLessons />
            </Suspense>
          ),
        },
        ...partnerMyLessonRouter(),
      ],
    },
    {
      path: "lessonRequest",
      element: (
        <Suspense fallback={<Loading />}>
          <LessonsRequest />
        </Suspense>
      ),
    },
    {
      path: "attendance",
      element: (
        <Suspense fallback={<Loading />}>
          <Attendance />
        </Suspense>
      ),
    },
  ];
};

export default partnerMyPageRouter;
