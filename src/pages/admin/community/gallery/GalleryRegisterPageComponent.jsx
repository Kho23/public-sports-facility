import React, { useState } from 'react'
import { fileRegister, register } from '../../../../api/galleryApi';

const initState = {
  title: "",
  content: "",
}
const GalleryRegisterPageComponent = () => {
  const [input, setInput] = useState(initState)
  const [images, setImages] = useState(null);

  const handleFileChange = (e) => {
    setImages(e.target.files[0])
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!images) {
      alert("이미지를 등록해주세요.")
      return;
    }
    try {
      const imageData = await fileRegister(images)
      const imageUrl = imageData.fileData[0].imageUrl
      const thumbnailUrl = imageData.fileData[0].thumbnailUrl
      const galleryDto = {
        title: input.title,
        content: input.content,
        images: [{
          imageUrl: imageUrl,
          thumbnailUrl: thumbnailUrl
        }]
      }
      const galleryData = await register(galleryDto)
      alert("등록이 완료되었습니다.", galleryData)
    } catch (error) {
      console.log("등록 중 오류 발생 오류내용=", error)
      alert("등록에 실패했습니다.")
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input name="title" placeholder="제목" onChange={(e) => handleChange(e)} />
      <textarea name="content" placeholder="내용" onChange={(e) => handleChange(e)} />

      {/* 파일 선택 */}
      <input type="file" onChange={(e) => { handleFileChange(e) }} />

      <button type="submit">등록하기</button>
    </form>
  )
}

export default GalleryRegisterPageComponent
