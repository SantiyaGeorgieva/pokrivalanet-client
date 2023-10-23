import React, { useState } from "react";
import {
  Col,
  Row,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { carouselItems } from "../../constants";

import './slider.scss';

function HomeSlider(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = carouselItems.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className={item.className}
      >
        <img src={item.src} alt={item.altText} style={{ "height": '350px' }} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div className={`container ${!args.isMobile ? 'my-4' : 'my-2'}`}>
      <Row className={`d-flex bc-light-gray ${args.isMobile ? 'small' : ''} mx-auto`}>
        <Col md="5" className="d-flex flex-column align-items-center justify-content-center px-0">
          {carouselItems.map((item, idx) => {
            return <h4 key={idx} className="mb-0">{(activeIndex + 1 === item.key) && item.text}</h4>
          })}
        </Col>
        <Col md="7" className={`px-0 ${args.isMobile ? 'py-0' : ''}`}>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
            style={{ textAlign: 'right' }}
          >
            <CarouselIndicators
              items={carouselItems}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default HomeSlider;