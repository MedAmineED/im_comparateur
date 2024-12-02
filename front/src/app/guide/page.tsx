'use client'

import { useEffect, useState } from 'react'
import { Card, Button, Carousel, Grid } from 'antd'
import { motion } from 'framer-motion'
import { SmileFilled, SafetyCertificateFilled, RocketFilled } from '@ant-design/icons'
import AOS from 'aos' 
import 'aos/dist/aos.css'
import styles from './Guide.module.css'
import { useRouter } from 'next/navigation'
import GuideService from '@/app/API/GuideService'
import type { GuideEntity } from '@/app/entities/GuideEntity'
import Image from 'next/image'

const funFacts = [
  "Saviez-vous que la première assurance vie a été vendue à Londres en 1583 ?",
  "En France, l'assurance habitation est obligatoire pour les locataires !",
  "Les astronautes de la NASA ont une assurance vie très spéciale.",
  "Certaines compagnies assurent contre les enlèvements par des extraterrestres !"
]

const { useBreakpoint } = Grid

const Page = () => {
  const router = useRouter()
  const [guides, setGuides] = useState<GuideEntity[]>([])
  const screens = useBreakpoint()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await GuideService.getAllGuides()
        setGuides(data)
      } catch (error) {
        console.error('Error fetching guides:', error)
      }
    }

    fetchGuides()
  }, [])

  const handleGuideClick = (guideId: number) => {
    router.push(`/guide/${guideId}`)
  }

  return (
    <div className={styles.container}>
      {/* Main Content - Now first */}
      <div className={styles.mainContent}>
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h1 className={styles.headerTitle}>
            Explorez Nos Guides d&apos;Assurance
          </h1>
          <p className={styles.headerSubtitle}>
            Des informations claires pour vos besoins en assurance
          </p>
        </motion.header>

        <main className={styles.guidesGrid}>
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              data-aos="fade-up"
              data-aos-delay={screens.md ? index * 100 : 0}
              whileHover={screens.md ? { 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                translateZ: 20
              } : {}}
            > 
              <Card 
                hoverable
                className={styles.guideCard}
                onClick={() => handleGuideClick(guide.id!)}
                cover={
                  <div className={styles.cardIcon}>
                    <Image 
                      src={`http://localhost:8000/storage/${guide.icon_image}`}
                      alt={guide.title}
                      width={screens.xs ? 80 : 100}
                      height={screens.xs ? 80 : 100}
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                }
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {guide.title}
                  </h3>
                  <p className={styles.cardDescription}>
                    {guide.description}
                  </p>
                  <Button className={styles.cardButton}>
                    Lire le guide
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </main>
      </div>

      {/* Left Panel - Now at bottom on mobile */}
      <div className={styles.leftPanel}>
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.panelTitle}
          >
            Bienvenue chez AssurTout !
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={styles.carouselContainer}
          >
            <Carousel autoplay effect="fade">
              {funFacts.map((fact, index) => (
                <div key={index}>
                  <p className={styles.carouselItem}>{fact}</p>
                </div>
              ))}
            </Carousel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Info sections in a more compact layout for mobile */}
            <div style={{ 
              display: 'flex', 
              flexDirection: screens.md ? 'column' : 'row',
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              <div className={styles.infoSection}>
                <SmileFilled className={styles.infoIcon} style={{ color: '#FDE68A' }} />
                <p className={styles.infoText}>Plus de 1 million de clients satisfaits !</p>
              </div>
              <div className={styles.infoSection}>
                <SafetyCertificateFilled className={styles.infoIcon} style={{ color: '#6EE7B7' }} />
                <p className={styles.infoText}>Couverture complète, esprit tranquille</p>
              </div>
              <div className={styles.infoSection}>
                <RocketFilled className={styles.infoIcon} style={{ color: '#93C5FD' }} />
                <p className={styles.infoText}>Devis rapide en moins de 2 minutes !</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact button always at bottom of panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: screens.md ? '0' : '16px' }}
        >
          <Button className={styles.quoteButton}>
            Contacter !
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default Page