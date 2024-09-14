import {
  IconAll,
  IconClock,
  IconCheckMark,
  IconRecentCalendar,
} from '../../../public/recent';
import Image from 'next/image';
import styles from './searchGrid.module.scss';

export default function SearchGrid() {
  const icons = [
    { src: IconAll, alt: '전체' },
    { src: IconClock, alt: '마감임박' },
    { src: IconCheckMark, alt: '승인없는' },
    { src: IconRecentCalendar, alt: '신규' },
  ];

  return (
    <div className={styles.gridContainer}>
      {icons.map((icon, index) => (
        <div key={index}>
          <div className={styles.imageContainer}>
            <Image src={icon.src} alt={icon.alt} width={33} height={33} />
          </div>
          <div>
            <p className={styles.altText}>{icon.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
