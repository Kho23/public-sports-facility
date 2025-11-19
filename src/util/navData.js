export const allMenuItems = [
  {
    id: "guide",
    title: "이용안내",
    path: "/guide", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "",
        title: "운영시간",
        path: "",
      },
      {
        id: "",
        title: "상품대여",
        path: "",
      },
      {
        id: "",
        title: "차량등록",
        path: "",
      },
      {
        id: "",
        title: "요금안내",
        path: "",
      },
      {
        id: "",
        title: "할인/환불/연기",
        path: "",
      },
    ],
  },
  {
    id: "program",
    title: "프로그램",
    path: "/program", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "swim",
        title: "수영",
        path: "/program/1",
      },
      {
        id: "health",
        title: "헬스",
        path: "/program/2",
      },
      {
        id: "golf",
        title: "골프",
        path: "/program/3",
      },
      {
        id: "dance",
        title: "무용",
        path: "/program/4",
      },
      {
        id: "futsal",
        title: "풋살",
        path: "/program/5",
      },
    ],
  },
  {
    id: "reservation",
    title: "예약신청",
    path: "/reservation", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "",
        title: "수강신청",
        path: "",
      },
      {
        id: "",
        title: "대관신청",
        path: "",
      },
      {
        id: "dailyUse",
        title: "일일이용예약",
        path: "/reservation/dailyUse",
      },
    ],
  },
  {
    id: "community",
    title: "커뮤니티",
    path: "/community", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "notice",
        title: "공지사항",
        path: "/community/notice",
      },
      {
        id: "schedule",
        title: "일정",
        path: "/community/schedule",
      },
      {
        id: "faq",
        title: "자주묻는질문",
        path: "/community/faq",
      },
      {
        id: "gallery",
        title: "갤러리",
        path: "/community/gallery",
      },
    ],
  },
  // {
  //   id: "admin",
  //   title: "관리자페이지",
  //   path: "/admin", // 1차 메뉴의 기본 경로
  //   hideInHeader: true,
  //   subMenus: [
  //     // 2차 메뉴 (사이드바 내용)
  //     {
  //       id: "",
  //       title: "공지사항",
  //       path: "",
  //     },
  //     {
  //       id: "",
  //       title: "일정",
  //       path: "",
  //     },
  //     {
  //       id: "",
  //       title: "자주묻질문",
  //       path: "",
  //     },
  //     {
  //       id: "",
  //       title: "갤러리",
  //       path: "",
  //     },
  //   ],
  // },
];
