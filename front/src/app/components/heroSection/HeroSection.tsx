// src/components/HeroCarousel.tsx
import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import styles from './HeroSection.module.css'; // Ensure this path is correct

const HeroSection = () => {
  return (
    <Carousel autoplay effect="fade" className={styles.carousel}>
      <div className={styles.carouselItem}>
        <Image
          src="/images/hero1.jpg"
          alt="Slide 1"
          layout="fill" // Use fill for responsive behavior
          objectFit="cover" // Ensure the image covers the area without distortion
        />
      </div>
      <div className={styles.carouselItem}>
        <Image
          src="/images/hero2.jpg"
          alt="Slide 2"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.carouselItem}>
        <Image
          src="/images/hero3.jpg"
          alt="Slide 3"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.carouselItem}>
        <Image
          src="/images/hero4.png"
          alt="Slide 4"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </Carousel>
  );
};

export default HeroSection;
