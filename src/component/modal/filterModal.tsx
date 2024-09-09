import { useState, useRef, useEffect } from 'react';
import styles from './filterModal.module.scss';
import { CloseModalProps } from '@/types/modalHookType';

const filterOptions = [
  { key: 0, label: '정렬' },
  { key: 1, label: '상태' },
  { key: 2, label: '분야' },
  { key: 3, label: '기간' },
  { key: 4, label: '인원' },
  { key: 5, label: '성향' },
];

export default function FilterModal({ handleCloseModal }: CloseModalProps) {
  const [activeKey, setActiveKey] = useState<number>(0);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: '0px',
    width: '0px',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeElement = containerRef.current?.querySelector(
      `.${styles.active}`
    );

    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeKey]);

  const handleClick = (key: number) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.navigation}>상세 필터</div>
      <div className={styles.section}>
        <section className={styles.filterContainer} ref={containerRef}>
          {filterOptions.map((option) => (
            <p
              key={option.label}
              onClick={() => handleClick(option.key)}
              className={`${activeKey === option.key ? styles.active : ''} filter-option`}
            >
              {option.label}
            </p>
          ))}
          <span
            className={styles.underline}
            style={{
              transform: `translateX(${underlineStyle.left})`,
              width: underlineStyle.width,
            }}
          />
        </section>
      </div>
    </div>
  );
}
