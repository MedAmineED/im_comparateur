import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './CardsContainer.module.css'; // Assuming you're using CSS modules for styling

const { Title, Paragraph } = Typography;



interface CardsContainerProps {
  sectionTitle: string;
  paragraph?: string;
  className?: string;
  children: React.ReactNode
}

const CardsContainer: FC<CardsContainerProps> = ({ sectionTitle, children, paragraph, className }) => {
  return (
    <div className={"containerCST " + className}>
      <div className={styles.aboutSection}>
        <Title className={styles.aboutTitle} level={3}>
          {sectionTitle}
        </Title>
        {paragraph && <Paragraph className={styles.optionalParag}>{paragraph}</Paragraph>}
        <div className={styles.guideCards}>
            { children }
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;
