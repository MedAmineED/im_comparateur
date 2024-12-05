import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const { Title, Paragraph } = Typography;

interface HerosectionNewProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
}

const HerosectionNew: React.FC<HerosectionNewProps> = ({
  title = "Bienvenue chez Guide Assurance Suisse",
  description = "Votre partenaire de confiance pour comparer et choisir les meilleures assurances en Suisse.",
  buttonText = "Commencer",
  imageUrl = "https://storage.googleapis.com/a1aa/image/ULFYxtmr9C4hKREXVluEIF21upReZfoNH4D15yeJfncWZbaPB.jpg",
  onButtonClick = () => {}
}) => {
  const handleButtonClick = () => {
    onButtonClick();
  };

  return (
    <div className={"bg-gray-100 py-20 " + styles.heroNewMain}>
      <div className={"container mx-auto " + styles.semIHero}>
        <div className={styles.heroBackground}>
          <Image 
            src={imageUrl} 
            alt="Illustration de personnes discutant des plans d'assurance"
            fill
            style={{ objectFit: 'cover' }}
            priority    
          />
        </div>
        <Row className={styles.heroContent + " " + styles.thirdContaner} align="middle" gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <div className="pr-8">
              <Title 
                level={1} 
                className="text-gray-800 mb-4"
              >
                {title}
              </Title>
              <Paragraph 
                className="text-gray-600 text-lg mb-6"
              >
                {description}
              </Paragraph>
              <Button 
                type="primary" 
                size="large" 
                className={"bg-red-600 hover:bg-red-700 border-none " + styles.btnStyle}
                onClick={handleButtonClick}
              >
                {buttonText}
              </Button>
            </div>
          </Col>
          <Col className={styles.imgContainer} xs={24} md={12}>
            <div className={"w-full " + styles.scondImageCont + " " + styles.desktopOnly}>
              <Image 
                src={imageUrl} 
                alt="Illustration de personnes discutant des plans d'assurance"
                width={600}
                height={650}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                priority    
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HerosectionNew;