'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.scss';
import { usePathname } from 'next/navigation';

const icons = [
  {
    default: '/footer/Icon_home.svg',
    checked: '/footer/Icon_home_check.svg',
    alt: '홈 페이지 이미지',
    value: '', // 루트 경로
  },
  {
    default: '/footer/Icon_search.svg',
    checked: '/footer/Icon_search_check.svg',
    alt: '검색 페이지 이미지',
    value: 'search',
  },
  {
    default: '/footer/Icon_studyRoom.svg',
    checked: '/footer/Icon_studyRoom_check.svg',
    alt: 'studyRooms',
    value: 'myStudy',
  },
  {
    default: '/footer/Icon_profile.svg',
    checked: '/footer/Icon_profile_check.svg',
    alt: '프로필 페이지 이미지',
    value: 'profile',
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className={styles.Container}>
      {icons.map((icon, index) => {
        const isActive =
          pathname === '/' && icon.value === ''
            ? true
            : pathname === `/${icon.value}`;

        return (
          <Link key={index} href={`/${icon.value}`}>
            <div className={styles.ImageContainer}>
              <Image
                src={isActive ? icon.checked : icon.default}
                alt={icon.alt}
                width={44}
                height={44}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
