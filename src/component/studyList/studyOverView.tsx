import { useState } from 'react'; // useState를 불러옵니다.
import styles from './studyOverView.module.scss';
import Image from 'next/image';
import { ArrowDown } from '../../../public/arrow';

export default function StudyOverView() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Section}>
        <p>총 100개의 쇼터디를 찾았어요</p>
        <div className={styles.filterDropDown} onClick={toggleDropdown}>
          <p>최신 등록순</p>
          <Image
            src={ArrowDown}
            width={12}
            height={12}
            alt="화살표"
            className={`${styles.arrow} ${isDropdownOpen ? styles.arrowUp : ''}`}
          />
        </div>
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li>인기순</li>
            <li className={styles.active}>최근 등록순</li>
            <li>마감임박순</li>
            <li>가나다순</li>
          </ul>
        )}
      </div>
    </div>
  );
}
