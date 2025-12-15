import React, { useEffect, useState } from "react";
// 1. useNavigate 임포트
import { useParams, useNavigate } from "react-router-dom";
import { getOneGallery } from "../../api/galleryApi";

const GalleryReadPageComponent = () => {
  const { id } = useParams();
  // 2. navigate 함수 초기화
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneGallery(id);
        setGallery(data);
        console.log(data);
      } catch (error) {
        console.error("갤러리 불러오기 실패", error);
      }
    };
    getOne();
  }, [id]);

  // 3. 목록으로 이동하는 핸들러 함수
  const moveToList = () => {
    // 갤러리 목록 페이지 경로로 이동
    navigate("/community/gallery");
  };

  if (gallery == null) {
    return <div>Loading....</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">
        홈 &gt; 커뮤니티 &gt; 갤러리
      </nav>

      {/* 2. 게시글 제목 */}
      <div className="border-b-2 border-gray-800 pb-4 mb-4">
        <h3 className="text-2xl font-bold">{gallery.title}</h3>
      </div>

      {/* 3. 메타데이터 */}
      <div className="flex items-center text-sm text-gray-600 divide-x divide-gray-300 mb-8">
        <div className="pr-3">
          <span className="font-semibold">작성자 : </span> 관리자
        </div>
        <div className="px-3">
          <span className="font-semibold">등록일자 : </span>{" "}
          {gallery.createdAt.slice(0, 10)}
        </div>
        <div className="pl-3">
          <span className="font-semibold">조회 : </span> {gallery.viewCount}
        </div>
      </div>

      {/* 4. 컨텐츠 본문 */}
      <div className="content-body">
        {/* 4-1. 이미지 영역 */}
        <div className="mb-8">
          {gallery.images &&
            gallery.images.length > 0 &&
            gallery.images.map((image) => (

              <img
                key={image.imageUrl}
                src={image.imageUrl}
                alt={gallery.title}
                className="w-full max-w-4xl mx-auto my-4 rounded-lg shadow-md"
              />
            ))}
        </div>

        {/* 4-2. 텍스트 내용 영역 */}
        {gallery.content && (
          <div className="p-6 bg-gray-50 rounded-md min-h-[150px] whitespace-pre-wrap text-lg">
            {gallery.content}
          </div>
        )}
      </div>

      {/* --- 5. (추가) 목록 버튼 --- */}
      <div className="flex justify-center mt-12">
        <button
          type="button"
          // 버튼 스타일 (테일윈드)
          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-200"
          onClick={moveToList} // 3번에서 만든 핸들러 연결
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default GalleryReadPageComponent;
