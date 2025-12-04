import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove.js";
import img1 from "../../images/홈페이지공지(1).png";
import img2 from "../../images/홈페이지공지(2).png";
import img3 from "../../images/홈페이지공지(3).png";

const images = [img1, img2, img3];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const { moveToNotice } = useCustomMove();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded">
      <img
        onClick={moveToNotice}
        src={images[current]}
        className="w-full h-full object-cover transition-all duration-700"
        alt="slide"
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition ${
              current === idx ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
