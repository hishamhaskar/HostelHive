import Carousel from 'react-bootstrap/Carousel';

const ImageSlider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/image1.jpg" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/image2.jpg" alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageSlider;
