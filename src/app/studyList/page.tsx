'use client';

import Navigation from '@/component/common/navigation';
import styles from './studyList.module.scss';

import FilterOpenBtn from '@/component/filter/filterOpenBtn';
import StudyOverView from '@/component/studyList/studyOverView';
import FilterSwiper from '@/component/filter/filterSwiper';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { defaultCardData } from '@/data/cardInitialData';
import { useSearchParams } from 'next/navigation';
import { useGetCard } from '@/apis/card/getCard';
import Card from '@/component/card/card';
import { CardType } from '@/types/card/cardType';
import NoStudy from '@/component/common/noStudy';

export default function StudyList() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('전체');

  const tab = searchParams.get('tab');

  // 리셋 후에도 tab 값이 남아 있지 않도록 수정
  const initialData = {
    ...defaultCardData,
    category: tab === '전체' ? null : tab || defaultCardData.category,
  };

  const [xx, setXX] = useState<any>(defaultCardData);

  // const methods = useForm({
  //   defaultValues: initialData,
  // });
  const methods = useForm({
    defaultValues: initialData,
  });

  const { data } = useGetCard('all', initialData);

  useEffect(() => {
    if (data && data.data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    methods.reset({
      ...defaultCardData,
      category: tab === '전체' ? null : tab || defaultCardData.category,
    });
  }, [tab, methods]);

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Navigation title="신규 쇼터디" />
        <div className={styles.TopSection}>
          <FilterSwiper activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterOpenBtn />
          <StudyOverView totalCount={data?.totalCount} />
        </div>
        <div className={styles.ItemSection}>
          <div className={styles.CardSection}>
            {data && data.data.length > 0 ? (
              data.data.map((data: CardType) => (
                <Card data={data} key={data.id} />
              ))
            ) : (
              <div className={styles.NoStudyContainer}>
                <NoStudy />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
