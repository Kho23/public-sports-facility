import { lazy, Suspense } from "react";

const List = lazy(() => import("../pages/partner/myLessons/MyLessonsPage"));
const Detail = lazy(() =>
  import("../pages/partner/myLessons/MyLessonDetailPage")
);

const Loading = () => <div>Loading...</div>;
const partnerMyLessonRouter = () => {
  return [
    {
      path: "myLessons",
      element: (
        <Suspense fallback={<Loading />}>
          <List />
        </Suspense>
      ),
    },
    {
      path: "myLessonDetail",
      element: (
        <Suspense fallback={<Loading />}>
          <Detail />
        </Suspense>
      ),
    },
  ];
};

export default partnerMyLessonRouter;
