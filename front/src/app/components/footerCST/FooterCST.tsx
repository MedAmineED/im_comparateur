import { Button, Layout, Typography, Divider } from 'antd';
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react';
import styles from './FooterCST.module.css';
import { useRouter } from 'next/navigation';

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterCST: React.FC = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleGuideClick = () => {
    router.push('/guide');
  };

  const handleActualityClick = () => {
    router.push('/actuality');
  };

  const handleComparatorClick = () => {
    router.push('/comparator');
  };

  return (
    <Footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Column 1: Logo and Company Info */}
        <div className={styles.footerColumn}>
          <Title level={4} className={styles.columnTitle}>AssurTout</Title>
          <Text className={styles.companyDesc}>
            Votre partenaire de confiance pour toutes vos assurances en Suisse.
          </Text>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <Text>contact@assurtout.ch</Text>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <Text>+41 XX XXX XX XX</Text>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} />
              <Text>Lausanne, Suisse</Text>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.footerColumn}>
          <Title level={5} className={styles.columnTitle}>Navigation Rapide</Title>
          <ul className={styles.footerList}>
            <li><button onClick={handleGuideClick}>Guides</button></li>
            <li><button onClick={handleActualityClick}>Actualités</button></li>
            <li><button onClick={handleComparatorClick}>Comparateur</button></li>
            <li><button onClick={handleContactClick}>Contact</button></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className={styles.footerColumn}>
          <Title level={5} className={styles.columnTitle}>Nos Services</Title>
          <ul className={styles.footerList}>
            <li><button onClick={handleComparatorClick}>Comparer les assurances</button></li>
            <li><button onClick={handleGuideClick}>Conseils d&apos;experts</button></li>
            <li><button onClick={handleContactClick}>Assistance personnalisée</button></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className={styles.footerColumn}>
          <Title level={5} className={styles.columnTitle}>Restons en Contact</Title>
          <Text className={styles.contactText}>Besoin d&apos;aide pour votre assurance ?</Text>
          <Button 
            type="primary" 
            className={styles.contactButton}
            onClick={handleContactClick}
          >
            Contactez-nous
          </Button>
        </div>
      </div>

      {/* Social Links and Copyright */}
      <Divider className={styles.divider} />
      <div className={styles.footerBottom}>
        <div className={styles.footerSocial}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className={styles.socialIcon} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className={styles.socialIcon} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className={styles.socialIcon} />
          </a>
        </div>
        <Text className={styles.copyright}>
          © {new Date().getFullYear()} AssurTout. Tous droits réservés.
        </Text>
      </div>
    </Footer>
  );
};

export default FooterCST;
