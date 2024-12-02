"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Typography, Row, Col, Button } from 'antd';
import styles from './Results.module.css';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const data = [
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  {
    href: 'https://www.visana.ch/fr',
    title: 'Assurance Maladie Visana',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Visana_logo.svg',
    provider: 'Visana',
    description: "Solutions d'assurance santé abordables avec des prestations complètes.",
    price: 'CHF 120/mois',
    features: ['Couverture hospitalière et ambulatoire', 'Couverture mondiale', 'Programmes bien-être'],
    rating: '4.8',
    image: 'https://www.visana.ch/dam/jcr:9388f446-7b1e-4cd5-a3f0-99ce05d23bbf/header-visana-sante.jpg',
  },
  // Additional data objects...
];

const IconText: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <Space>
    {icon}
    <Text>{text}</Text>
  </Space>
);

const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleProviderClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.titleSection}>
          <Title level={2}>Comparez les Assurances</Title>
          <Text>Trouvez la meilleure assurance adaptée à vos besoins.</Text>
          <Button 
            type="primary" 
            className={styles.contactButton}
            onClick={handleContactClick}
          >
            Besoin d&apos;aide ?
          </Button>
        </div>

        <div className={styles.adPanel}>
          <Text strong>Nos Partenaires</Text>
          <div className={styles.partnerLogos}>
            <Image
              src="/images/visana.png"
              alt="Visana"
              width={50}
              height={50}
              className={styles.partnerLogo}
            />
            <Image
              src="/images/csslogo.png"
              alt="CSS"
              width={50}
              height={50}
              className={styles.partnerLogo}
            />
            <Image
              src="/images/alianz.png"
              alt="Assura"
              width={50}
              height={50}
              className={styles.partnerLogo}
            />
          </div>
        </div>
      </div>

      <div className={styles.listContainer}>
        <Row gutter={[16, 16]}>
          {data.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <div data-aos="fade-up" data-aos-delay={index * 100}>
                <List.Item
                  key={item.title}
                  className={styles.glassEffect}
                  actions={[
                    <IconText icon={<StarOutlined />} text={item.rating} key="rating" />,
                    <IconText icon={<LikeOutlined />} text="156" key="avis" />,
                    <IconText icon={<MessageOutlined />} text="12" key="commentaires" />,
                  ]}
                  extra={
                    <Image
                      src={item.image}
                      alt="Aperçu assurance"
                      width={250}
                      height={150}
                      className={styles.insuranceImage}
                    />
                  }
                  onClick={() => handleProviderClick(item.href)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} size={48} className={styles.logoAvatar} />}
                    title={<a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                    description={<Text strong>{item.provider}</Text>}
                  />
                  <Text>{item.description}</Text>
                  <Text strong className={styles.price}>{item.price}</Text>
                  <ul className={styles.featureList}>
                    {item.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </List.Item>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Page;
