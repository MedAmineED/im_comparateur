"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, User, ArrowRight } from "lucide-react";
import styles from "./actuality.module.css";
import Image from "next/image";
import ActualitiesServices from "../API/ActualitiesServices";
import ApiUrls from "../API/ApiURLs/ApiURLs";
import { ActualityEntity } from "../entities/ActualityEntity";
import { useRouter } from "next/navigation";
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const ActualityPage = () => {
  const [actualities, setActualities] = useState<ActualityEntity[] | []>([]);
  const router = useRouter();
  const screens = useBreakpoint();

  const getAllActualities = async () => {
    try {
      const response: ActualityEntity[] = await ActualitiesServices.GetAllActualities(ApiUrls.ACTUALITES);
      setActualities(response);
    } catch (error) {
      console.error("Error fetching actualities:", error);
    }
  };

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
    getAllActualities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container mx-auto">
        <h1 className={styles.title} data-aos="fade-down">
          Actualités Assurance
        </h1>

        <div className="space-y-16">
          {actualities.map((article, index) => (
            <div
              key={article.id}
              className={styles.articleContainer}
              data-aos={screens.md ? (index % 2 === 0 ? "fade-right" : "fade-left") : "fade-up"}
              data-aos-delay={screens.md ? index * 100 : 50}
            >
              <div className={styles.glassCard}>
                <div className={styles.contentWrapper}>
                  <div>
                    <h2 className={styles.titleArt}>
                      {article.title}
                    </h2>
                    <p className={styles.contentArt1}>
                      {article.excerpt}
                    </p>
                    <p className={styles.contentArt2}>
                      {article.content}
                    </p>
                  </div>

                  <button
                    className={styles.readMore}
                    onClick={() => router.push(`/actuality/${article.id}`)}
                  >
                    Lire la suite
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>

                <div className={styles.imageWrapper}>
                  <Image
                    src={`http://localhost:8000/storage/${article.image}`}
                    alt={article.title}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.overlay}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.utilisateur?.firstname}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.date_creation)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActualityPage;
