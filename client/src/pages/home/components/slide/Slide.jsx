import React from 'react';
import { Carousel } from 'antd';
import b1 from '../../../../assets/img/b1.webp';
import b2 from '../../../../assets/img/b2.webp';
import b3 from '../../../../assets/img/b3.webp';

function Slide() {
  const slide = [b1, b2, b3];
  return (
    <div className='flex  justify-center  m-auto'>
      <div className='h-auto w-full' >
        <Carousel autoplay>
          {slide.map((sl, index) => (
            <div className='slide' key={index}>
              <img src={sl}  alt='slide' />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Slide;
