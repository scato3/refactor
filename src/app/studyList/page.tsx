'use client';

import Navigation from '@/component/common/navigation';
import styles from './studyList.module.scss';

import react from 'react';
import FilterOpenBtn from '@/component/filter/filterOpenBtn';
import StudyOverView from '@/component/studyList/studyOverView';
import FilterSwiper from '@/component/filter/filterSwiper';

export default function StudyList() {
  const [activeTab, setActiveTab] = react.useState<string>('전체');

  return (
    <div className={styles.Container}>
      <Navigation title="신규 쇼터디" />
      <div className={styles.TopSection}>
        <FilterSwiper activeTab={activeTab} setActiveTab={setActiveTab} />
        <FilterOpenBtn arrow={true} />
        <StudyOverView />
      </div>
    </div>
  );
}
