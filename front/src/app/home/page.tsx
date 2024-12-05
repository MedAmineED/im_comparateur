'use client'
import React, { useEffect, useState } from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import Image from 'next/image';
import styles from './home.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ActualitiesService from '../API/ActualitiesServices';
import GuideService from '../API/GuideService';
import { useRouter } from 'next/navigation';
import { ActualityEntity } from '../entities/ActualityEntity';
import { GuideEntity } from '../entities/GuideEntity';
import HerosectionNew from '../components/herosection1/HerosectionNew';
import ApiUrls from '../API/ApiURLs/ApiURLs';
import { IMAGES_STORE } from '../API/ApiURLs/ImagesUrls';

const { Title, Paragraph } = Typography;

export default function Component() {
  const router = useRouter();
  const [articles, setArticles] = useState<ActualityEntity[]>([]);
  const [guides, setGuides] = useState<GuideEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles (Actualities)
  const getAllArticles = async () => {
    try {
      setLoading(true);
      const response = await ActualitiesService.GetAllActualities(ApiUrls.ACTUALITES);
      console.log(response);
      setArticles(response.slice(0, 6));
    } catch (e) {
      console.error("Error getting actualities:", e);
      setError("Failed to load actualities");
    } finally {
      setLoading(false);
    }
  };

  // Fetch guides
  const getGuides = async () => {
    try {
      const response = await GuideService.getAllGuides();
      console.log(response);
      setGuides(response.slice(0, 4));
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: false });
    getAllArticles();
    getGuides();
  }, []);

  // Navigation handlers
  const handleEnSavoirPlus = () => {
    router.push('/guide');
  };

  const handleGuideClick = (guideId: number | undefined) => {
    if (guideId) {
      router.push(`/guide/${guideId}`);
    }
  };

  const handleActualityClick = (actualityId: number | undefined) => {
    if (actualityId) {
      router.push(`/actuality/${actualityId}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <HerosectionNew />
      </section>
      <Row className={styles.partnersRow}>
        <div className={styles.partnersWrapper}>
          <div><Image src="/images/visana.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/csslogo.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/alianz.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/baloise.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/zurich.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/visana.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/csslogo.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/alianz.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/baloise.png" alt="Partner logo" width={100} height={40} priority /></div>
          <div><Image src="/images/zurich.png" alt="Partner logo" width={100} height={40} priority /></div>
        </div>
      </Row>

      {/* About Section */}
      <section className={styles.about}>
        <Row gutter={[32, 32]} align="middle">
          <Col className={styles.aboutColText} xs={24} md={12}>
            <Title level={2}>Swiss Assurance Guide</Title>
            <Paragraph>
              Notre mission est de vous dénicher les meilleures assurances au meilleur prix.
            </Paragraph>
            <Button type="primary" className={styles.primaryButton} onClick={handleEnSavoirPlus}>
              En savoir plus →
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Image
              src="/images/guidpic.jpg"
              alt="A propos"
              width={500}
              height={300}
              className={styles.aboutImage}
            />
          </Col>
        </Row>
      </section>

      {/* Guides Section */}
      <section className={styles.guides}> 
        <Title level={2} className={styles.sectionTitle}>Nos Guides</Title>
        <Row gutter={[32, 32]}>
          {guides.map((guide, index) =>{ 
            console.log("from tsx ");
            console.log(guide);
            return (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card 
                className={styles.guideCard}
                bordered={false}
                onClick={() => guide.id && handleGuideClick(guide.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardIcon}>
                  <Image 
                    src={`http://localhost:8000/storage/${guide.icon_image}`}
                    alt={guide.title}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
                <Title className={styles.guideTitle} level={3}>{guide.title}</Title>
              </Card>
            </Col>
          )})}
        </Row>
      </section>
  
      {/* Latest Updates Section */}
      <section className={styles.latestUpdates}>
        <Title level={2} className={styles.sectionTitle}>Actualités</Title>
        <Row gutter={[32, 32]}>
          {loading && <div>Loading actualities...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && articles.map((article, index) => {
            console.log("from tsx actuality ");
            console.log(IMAGES_STORE +article.image); 
            return (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                className={styles.updateCard}
                cover={
                  <Image
                    src={IMAGES_STORE + article.image}
                    alt={article.title}
                    width={400}
                    height={200}
                  />
                }
              >
                <Title level={4}>{article.title}</Title>
                <Paragraph>{article.excerpt}</Paragraph>
                <Button 
                  type="primary" 
                  className={styles.primaryButton}
                  onClick={() => article.id && handleActualityClick(article.id)}
                >
                  Voir les détails
                </Button>
              </Card>
            </Col>
          )})}
        </Row>
      </section>
    </div>
  );
}
