import{ useState } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  console.log('images', images); // Burada images'in doğru geldiğini kontrol edin
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel" style={{border:'1px solid red'}}>
      <button className="carousel-button prev" onClick={prevSlide}>
        &lt;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
      <button className="carousel-button next" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
