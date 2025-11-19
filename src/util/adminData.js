export const adminAllMenuItems = [
  {
    id: "memberInfo",
    title: "회원정보",
    path: "/admin/memberInfo", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "",
        title: "운영시간", //운영시간수정
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
        id: "partnerRequest",
        title: "파트너 승급 신청",
        path: `/admin/member/partnerRequest`,
      },
    ],
  },
  {
    id: "guide",
    title: "이용안내",
    path: "/guide", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "",
        title: "운영시간", //운영시간수정
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
    title: "프로그램 수정",
    path: "/admin/program", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "swim",
        title: "수영",
        path: "/admin/program/1",
      },
      {
        id: "health",
        title: "헬스",
        path: "/admin/program/2",
      },
      {
        id: "golf",
        title: "골프",
        path: "/admin/program/3",
      },
      {
        id: "dance",
        title: "무용",
        path: "/admin/program/4",
      },
      {
        id: "futsal",
        title: "풋살",
        path: "/admin/program/5",
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
        id: "",
        title: "일일이용예약",
        path: "",
      },
    ],
  },
  {
    id: "community",
    title: "커뮤니티",
    path: "/admin/community", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "notice",
        title: "공지사항",
        path: "/admin/notice",
      },
      {
        id: "",
        title: "일정",
        path: "",
      },
      {
        id: "faq",
        title: "자주묻는질문",
        path: "/admin/faq",
      },
      {
        id: "",
        title: "갤러리",
        path: "",
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
