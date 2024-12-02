'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import styles from './ActualityDetails.module.css'
import { useRouter } from 'next/navigation'
import ActualitiesService from '@/app/API/ActualitiesServices'
import type { ActualityEntity } from '@/app/entities/ActualityEntity'
import Image from 'next/image'
import ApiUrls from '@/app/API/ApiURLs/ApiURLs'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [actuality, setActuality] = useState<ActualityEntity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActuality = async () => {
      try {
        const response = await ActualitiesService.GetAllActualities(ApiUrls.ACTUALITES);
        const foundActuality = response.find(act => act.id === parseInt(params.id));
        setActuality(foundActuality || null);
      } catch (error) {
        console.error('Error fetching actuality:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActuality()
  }, [params.id])

  const handleBack = () => {
    router.push('/actuality')
  }

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!actuality) {
    return <div>Article non trouvé</div>
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
          Retour aux actualités
        </button>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerTop}>
              <div className={styles.imageContainer}>
                <Image 
                  src={`http://localhost:8000/storage/${actuality.image}`}
                  alt={actuality.title}
                  layout="fill"
                  objectFit="cover"
                  className={styles.mainImage}
                />
              </div>
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <User className={styles.metaIcon} />
                  <span>{actuality.utilisateur?.firstname} {actuality.utilisateur?.lastname}</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>{new Date(actuality.date_creation).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <h1 className={styles.title}>{actuality.title}</h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={styles.excerpt}
            >
              <h2 className={styles.excerptTitle}>Résumé</h2>
              <p>{actuality.excerpt}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={styles.content}
            >
              <div dangerouslySetInnerHTML={{ __html: actuality.content }} />
            </motion.div>
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