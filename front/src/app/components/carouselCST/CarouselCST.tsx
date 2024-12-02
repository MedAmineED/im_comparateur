import React from 'react';
import { Button, Carousel } from 'antd';
import Image from 'next/image';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './CarouselCST.module.css';
import { useRouter } from 'next/navigation';

interface HeroCarouselContent {
    title: string;
    content: string;
    image: string;
}

interface HeroCarouselProps {
    carouselData: HeroCarouselContent[];
    buttonText?: string;
}  

const CarouselCST: React.FC<HeroCarouselProps> = ({ carouselData, buttonText }) => {
    const router = useRouter();

    const handleAllonsY = () => {
        router.push('/comparator');
    };

    return (
        <div className={styles.carouselContainer}>
            <Carousel className={styles.carouselClass} autoplay>
                {carouselData.map((slide, index) => (
                    <div key={index} className={styles.slide}>
                        <div className={styles.heroImageWrapper}>
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                                className={styles.heroImage}
                            />
                        </div>
                        <div className={styles.heroOverlay}>
                            <div className={styles.textContainer}>
                                <Title className={styles.heroTitle} level={1}>
                                    {slide.title}
                                </Title>
                                <Paragraph className={styles.heroParagraph}>
                                    {slide.content}
                                </Paragraph>
                            </div>
                            <div className={styles.buttonContainer}>
                                <Button
                                    className={styles.allonsYbtn}
                                    type="primary"
                                    size="large"
                                    onClick={handleAllonsY}
                                >
                                    {buttonText || "ALLONS-Y"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselCST;
