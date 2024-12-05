'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, User } from 'lucide-react'
import styles from './GuideDetails.module.css'
import { useRouter } from 'next/navigation'
import GuideService from '@/app/API/GuideService'
import type { GuideEntity } from '@/app/entities/GuideEntity'
import Image from 'next/image'
import { IMAGES_STORE } from '@/app/API/ApiURLs/ImagesUrls'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [openStep, setOpenStep] = useState<number | null>(null)
  const [guide, setGuide] = useState<GuideEntity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const data = await GuideService.getGuideById(parseInt(params.id))
        setGuide(data)
      } catch (error) {
        console.error('Error fetching guide:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [params.id])

  const handleBack = () => {
    router.push('/guide')
  }

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index)
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!guide) {
    return <div>Guide non trouvé</div>
  }

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.content}
      >
        <button onClick={handleBack} className={styles.backButton}>
          <ArrowLeft className={styles.backIcon} />
          Retour aux guides
        </button>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerTop}>
              <div className={styles.icon}>
                <Image 
                  src={`${IMAGES_STORE + guide.icon_image}`}
                  alt={guide.title}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <User className={styles.metaIcon} />
                  <span>{guide.author}</span>
                </div>
              </div>
            </div>

            <h1 className={styles.title}>{guide.title}</h1>
            <p className={styles.description}>{guide.description}</p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={styles.introduction}
            >
              <h2 className={styles.introductionTitle}>Introduction</h2>
              <div dangerouslySetInnerHTML={{ __html: guide.introduction }} />
            </motion.div>

            <div className={styles.stepsList}>
              {guide.steps.map((step, index) => {
                console.log(step)
                return(
                <motion.div
                  key={step.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className={styles.stepContainer}
                >
                  <button
                    onClick={() => toggleStep(index)}
                    className={`${styles.stepButton} ${openStep === index ? styles.stepButtonActive : ''}`}
                  >
                    <span className={styles.stepTitle}>
                      <span className={styles.stepNumber}>{index + 1}</span>
                      {step.title}
                    </span>
                  </button>
                  {openStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.stepContent}
                    >
                      <div dangerouslySetInnerHTML={{ __html: step.content }} />
                    </motion.div>
                  )}
                </motion.div>
              )})}
            </div>
          </div>

          <div className={styles.keyPoints}>
            <h2 className={styles.keyPointsTitle}>
              <BookOpen className={styles.keyPointIcon} />
              Points clés à retenir
            </h2>
            <ul className={styles.keyPointsList}>
              {guide.steps.map((step, index) => (
                <li key={step.id || index} className={styles.keyPointItem}>
                  <span>{step.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={styles.contactSection}
        >
          <h3 className={styles.contactTitle}>Vous avez des questions ?</h3>
          <p className={styles.contactDescription}>Notre équipe d&apos;experts est là pour vous aider.</p>
          <button className={styles.contactButton}>
            Contactez-nous
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Page