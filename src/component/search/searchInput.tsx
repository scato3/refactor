import styles from './searchInput.module.scss';
import Image from 'next/image';
import { IconActveSearch } from '../../../public/icons';

export default function SearchInput() {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          maxLength={20}
          className={styles.input}
          type="text"
          name="최근검색어"
          placeholder="무엇을 검색할까요?"
        />
        <Image
          src={IconActveSearch}
          width={18}
          height={18}
          alt="searchIcon"
          className={styles.searchIcon}
        />
      </div>
    </div>
  );
}
