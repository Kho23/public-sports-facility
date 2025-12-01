export const adminAllMenuItems = [
  {
    id: "memberInfo",
    title: "회원정보",
    path: "/admin/memberInfo", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "memberInfo",
        title: "회원목록",
        path: "/admin/member/memberInfo",
      },
      {
        id: "support",
        title: "1:1 문의내역",
        path: "/admin/member/support",
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
        id: "time",
        title: "운영시간", //운영시간수정
        path: "/admin/guide/time",
      },
      {
        id: "rent",
        title: "상품대여",
        path: "/admin/guide/rent",
      },
      {
        id: "car",
        title: "차량등록",
        path: "/admin/guide/car",
      },
      {
        id: "price",
        title: "요금안내",
        path: "/admin/guide/price",
      },
      {
        id: "refund",
        title: "할인/환불/연기",
        path: "/admin/guide/refund",
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
        id: "schedule",
        title: "일정",
        path: "/admin/schedule",
      },
      {
        id: "faq",
        title: "자주묻는질문",
        path: "/admin/faq",
      },
      {
        id: "gallery",
        title: "갤러리",
        path: "/admin/gallery",
      },
    ],
  },
  {
    id: "stat",
    title: "통계",
    path: "/admin/stat", // 1차 메뉴의 기본 경로
    subMenus: [
      // 2차 메뉴 (사이드바 내용)
      {
        id: "ageGender",
        title: "연령별 통계",
        path: "/admin/stat/ageGender",
      },
    ],
  },
];
