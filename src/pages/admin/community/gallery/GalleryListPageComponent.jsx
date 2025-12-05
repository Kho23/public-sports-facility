import React, { useEffect, useState } from 'react'
import { getGalleryList, increaseViewCount } from '../../../../api/galleryApi'
import useCustomMove from '../../../../hooks/useCustomMove'

const GalleryListPageComponent = () => {
  const [list, setList] = useState([])
  const { moveToAdminGalleryDetail, moveToAdminGalleryRegister } = useCustomMove()

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getGalleryList();
        console.log(data)
        setList(data.dtoList)
      } catch (error) {
        console.log("갤러리 로드 중 오류 발생 ", error)
      }
    }; get()
  }, [])

  const handleClick = (id) => {
    moveToAdminGalleryDetail(id);
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-5 w-full">

      <div className="pb-4 mb-6 border-b-2 border-gray-800 flex justify-between items-end">
        <h2 className="text-2xl md:text-4xl font-bold m-0">갤러리</h2>
        <div className="text-sm text-gray-600">
          총 {list.length}건 (1/N페이지)
        </div>
      </div>

      {/* --- 📍 수정된 부분 --- */}
      {/* w-full을 추가하여 이 div가 부모 너비를 꽉 채우도록 합니다. */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {list.map(gallery => (
          <div
            key={gallery.galleryId}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            onClick={() => handleClick(gallery.galleryId)}
          >

            {gallery.images && gallery.images.length > 0 ? (
              <img
                src={gallery.images[0].thumbnailUrl}
                alt={gallery.title}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 flex items-center justify-center bg-gray-100 text-gray-500">
                (이미지 없음)
              </div>
            )}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold truncate mb-1">{gallery.title}</h3>
              <p className="text-sm text-gray-500">{gallery.createdAt.slice(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
         <button
          type="button"
          // 버튼 스타일 (테일윈드)
          className="px-6 py-3 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition-colors duration-200"
          onClick={()=>moveToAdminGalleryRegister()}
        >
          등록하기
        </button>
    </div>
  )
}

export default GalleryListPageComponent