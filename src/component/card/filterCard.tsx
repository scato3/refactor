'use client';

import styles from './filterCard.module.scss';
import { IconCalendar, IconPeople } from '../../../public/card';
import Image from 'next/image';
import { FilterDataType, StudyInfoData } from '@/types/fastMatching/filterType';
import { LeftArrow, RightArrow } from '../../../public/arrow';
import dayjs from 'dayjs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface FilterCardType {
  data?: FilterDataType;
}

// 커스텀 화살표 컴포넌트
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className={styles.nextArrow} onClick={onClick}>
    <Image src={RightArrow} width={14} height={22} alt="next" />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className={styles.prevArrow} onClick={onClick}>
    <Image src={LeftArrow} width={14} height={22} alt="before" />
  </div>
);

export default function FilterCard({ data }: FilterCardType) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {data?.data.map((item: StudyInfoData) => (
          <div key={item.study_id} className={styles.slide}>
            <div className={styles.Container}>
              <div className={styles.cardHeader}>
                {item.category && <div>{item.category}</div>}
                {item.title && <p>{item.title}</p>}
                {item.start_date && (
                  <p>
                    {`D-${Math.ceil(
                      (dayjs(item.start_date).toDate().getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}`}
                  </p>
                )}
              </div>
              {item.additional_infos?.length > 0 && (
                <div className={styles.tagBox}>
                  <span className={styles.tagTitle}>
                    {item.additional_infos
                      .map((tag: string) => `#${tag}`)
                      .join(' ')}
                  </span>
                </div>
              )}
              <div className={styles.peopleContainer}>
                <Image
                  src={IconPeople}
                  width={24}
                  height={24}
                  alt="사람 아이콘"
                />
                {item.cur_participants_num && item.max_participants_num && (
                  <p>
                    {item.cur_participants_num}/{item.max_participants_num}
                  </p>
                )}
              </div>
              {item.start_date && item.duration && (
                <div className={styles.calendarContainer}>
                  <Image
                    src={IconCalendar}
                    width={24}
                    height={18}
                    alt="달력 아이콘"
                  />
                  <p>
                    {dayjs(item.start_date).format('MM.DD')} ~{' '}
                    {dayjs(item.start_date)
                      .add(
                        item.duration === '1w' ? 1 : 0,
                        item.duration === '1w' ? 'week' : 'month'
                      )
                      .add(
                        item.duration === '1m'
                          ? 1
                          : item.duration === '3m'
                            ? 3
                            : item.duration === '6m'
                              ? 6
                              : 0,
                        'month'
                      )
                      .format('MM.DD')}
                  </p>
                </div>
              )}
              {item.description && (
                <div className={styles.descriptionContainer}>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
