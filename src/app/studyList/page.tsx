'use client';

import Navigation from '@/component/common/navigation';
import styles from './studyList.module.scss';

import FilterOpenBtn from '@/component/filter/filterOpenBtn';
import StudyOverView from '@/component/studyList/studyOverView';
import FilterSwiper from '@/component/filter/filterSwiper';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { defaultCardData } from '@/data/cardInitialData';

export default function StudyList() {
  const [activeTab, setActiveTab] = useState<string>('전체');

  const methods = useForm({
    defaultValues: defaultCardData,
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Navigation title="신규 쇼터디" />
        <div className={styles.TopSection}>
          <FilterSwiper activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterOpenBtn />
          <StudyOverView />
        </div>
      </div>
    </FormProvider>
  );
}
