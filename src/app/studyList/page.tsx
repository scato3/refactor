'use client';

import Navigation from '@/component/common/navigation';
import styles from './studyList.module.scss';

import FilterOpenBtn from '@/component/filter/filterOpenBtn';
import StudyOverView from '@/component/studyList/studyOverView';
import FilterSwiper from '@/component/filter/filterSwiper';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { defaultCardData } from '@/data/cardInitialData';
import { useSearchParams } from 'next/navigation';
import { useGetCard } from '@/apis/card/getCard';
import Card from '@/component/card/card';
import { CardType } from '@/types/card/cardType';
import NoStudy from '@/component/common/noStudy';
import { GetCardType } from '@/types/card/getCardType';

export default function StudyList() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('전체');

  const tab = searchParams.get('tab');

  const initialData = {
    ...defaultCardData,
    category: tab === '전체' ? '' : tab || defaultCardData.category,
  };

  const methods = useForm<GetCardType>({
    defaultValues: initialData,
  });

  // 필터 값들 실시간으로 추적 (useWatch 사용)
  const [
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    orderType,
  ] = useWatch({
    control: methods.control,
    name: [
      'quickMatch',
      'category',
      'startDate',
      'duration',
      'minParticipants',
      'maxParticipants',
      'tendency',
      'orderType',
    ],
  });

  const { data, refetch } = useGetCard(orderType, {
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    orderType,
  });

  // tab이 변경되면 category 필드 값을 설정
  useEffect(() => {
    setActiveTab(tab === null ? '전체' : tab);
    methods.setValue(
      'category',
      tab === '전체' ? '' : tab || defaultCardData.category
    );
  }, [tab, methods]);

  // 필터 값이 변경될 때마다 재검색 수행
  useEffect(() => {
    refetch();
  }, [
    orderType,
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    refetch,
  ]);

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Navigation title="신규 쇼터디" />
        <div className={styles.TopSection}>
          <FilterSwiper activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterOpenBtn />
          <StudyOverView totalCount={data?.totalCount || 0} />
        </div>
        <div className={styles.ItemSection}>
          <div className={styles.CardSection}>
            {data && data.data?.length > 0 ? (
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
