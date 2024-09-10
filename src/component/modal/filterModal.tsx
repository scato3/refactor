import { useState, useRef, useEffect } from 'react';
import styles from './filterModal.module.scss';
import { CloseModalProps } from '@/types/modalHookType';
import { IconDate } from '../../../public/icons';
import Image from 'next/image';
import { ArrowDown } from '../../../public/arrow';
import Button from '../common/button';
import { IconReset } from '../../../public/icons';
import { useFormContext, useWatch } from 'react-hook-form';
import BottomSheet from '../common/bottomSheet';
import { durationOption } from '@/data/durationData';
import { ActiveArrowDown } from '../../../public/arrow';

const filterOptions = [
  { key: 0, label: '정렬' },
  { key: 1, label: '상태' },
  { key: 2, label: '분야' },
  { key: 3, label: '기간' },
  { key: 4, label: '인원' },
  { key: 5, label: '성향' },
];

const sortOption = [
  { key: 'recent', label: '최근 등록순' },
  { key: 'popular', label: '인기순' },
  { key: 'deadline', label: '마감임박순' },
  { key: 'abcd', label: '가나다순' },
];

const statusOption = [
  { key: 0, label: '모집중' },
  { key: 1, label: '모집마감' },
];

const fieldOption = [
  { key: 0, label: '수능' },
  { key: 1, label: '대학생' },
  { key: 2, label: '취업' },
  { key: 3, label: '공무원' },
  { key: 4, label: '임용' },
  { key: 5, label: '전문직' },
  { key: 6, label: '어학' },
  { key: 7, label: '자격증' },
  { key: 8, label: '코딩' },
  { key: 9, label: '모각공' },
  { key: 10, label: '기타' },
];

const tendencyOption = [
  { key: 'active', label: '활발한 대화와 동기부여 원해요' },
  { key: 'feedback', label: '학습 피드백을 주고받고 싶어요' },
  { key: 'focus', label: '조용히 집중하고 싶어요' },
];

export default function FilterModal({ handleCloseModal }: CloseModalProps) {
  const { handleSubmit, reset, setValue, control } = useFormContext();
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

  const handleOpenBottomSheet = () => {
    setBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetOpen(false);
  };

  const getLabel = (key: string) => {
    const option = durationOption.find((opt) => opt.key === key);
    return option ? option.label : '진행 일자 선택';
  };

  const [activeKey, setActiveKey] = useState<number>(0);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: '0px',
    width: '0px',
  });

  const [orderType, status, category, duration, tendency] = useWatch({
    control,
    name: ['orderType', 'status', 'category', 'duration', 'tendency'],
    defaultValue: {
      quickMatch: null,
      category: null,
      startDate: null,
      duration: null,
      minParticipants: null,
      maxParticipants: null,
      tendency: null,
      orderType: 'recent',
      status: '모집중',
    },
  });

  const handleSelectSort = (value: string) => {
    setValue('orderType', value);
  };

  const handleSelectStatus = (value: string) => {
    setValue('status', value);
  };

  const handleSelectCategory = (value: string) => {
    let updatedCategories = (category || '').split(',').filter(Boolean);

    if (updatedCategories.includes(value)) {
      updatedCategories = updatedCategories.filter(
        (category: string) => category !== value
      );
    } else {
      updatedCategories.push(value);
    }

    setValue('category', updatedCategories.join(','));
  };

  const handleSelectTendency = (value: string) => {
    let updatedTendency = (tendency || '').split(',').filter(Boolean);

    if (updatedTendency.includes(value)) {
      updatedTendency = updatedTendency.filter(
        (tendency: string) => tendency !== value
      );
    } else {
      updatedTendency.push(value);
    }

    setValue('tendency', updatedTendency.join(','));
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const sortSectionRef = useRef<HTMLDivElement>(null);
  const statusSectionRef = useRef<HTMLDivElement>(null);
  const fieldSectionRef = useRef<HTMLDivElement>(null);
  const periodSectionRef = useRef<HTMLDivElement>(null);
  const peopleSectionRef = useRef<HTMLDivElement>(null);
  const tendencySectionRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [
    sortSectionRef,
    statusSectionRef,
    fieldSectionRef,
    periodSectionRef,
    peopleSectionRef,
    tendencySectionRef,
  ];

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
    sectionRefs[key].current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const onSubmit = (data: any) => {
    console.log('필터 데이터:', data);
    handleCloseModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Container}>
      <div className={styles.navigation}>상세 필터</div>
      {/* 필터 */}
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
      {/* 정렬 */}
      <div className={styles.section} ref={sortSectionRef}>
        <h2>정렬</h2>
        <div className={styles.optionContainer}>
          {sortOption.map((option) => (
            <div
              key={option.label}
              className={`${orderType === option.key ? styles.selected : ''} ${styles.optionItem}`}
              onClick={() => {
                handleSelectSort(option.key);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>

      {/* 상태 */}
      <div className={styles.section} ref={statusSectionRef}>
        <h2>상태</h2>
        <div className={styles.optionContainer}>
          {statusOption.map((option) => (
            <div
              key={option.label}
              className={`${status === option.label ? styles.selected : ''} ${styles.optionItem}`}
              onClick={() => {
                handleSelectStatus(option.label);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>

      {/* 분야 */}
      <div className={styles.section} ref={fieldSectionRef}>
        <div className={styles.optionHeader}>
          <h2>분야</h2> <span>*중복 선택 가능</span>
        </div>
        <div className={styles.optionContainer}>
          {fieldOption.map((option) => (
            <div
              key={option.label}
              className={`${category?.includes(option.label) ? styles.selected : ''} ${styles.optionItem}`}
              onClick={() => {
                handleSelectCategory(option.label);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 기간 */}
      <div className={styles.section} ref={periodSectionRef}>
        <h2>기간</h2>
        <div className={styles.dateContainer}>
          <p>시작 일자</p>
          <div className={styles.dateSelect}>
            시작 일자 선택
            <Image
              src={IconDate}
              width={18}
              height={18}
              alt="달력"
              className={styles.dateImage}
            />
          </div>
        </div>
        <div className={styles.dateContainer}>
          <p>진행 기간</p>
          <div
            className={`${styles.dateSelect} ${duration ? styles.activeDateSelect : ''}`}
            onClick={handleOpenBottomSheet}
          >
            {duration ? getLabel(duration) : '진행 일자 선택'}
            <Image
              src={duration ? ActiveArrowDown : ArrowDown}
              width={18}
              height={18}
              alt="달력"
              className={styles.dateImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 선호 인원 */}
      <div className={styles.section} ref={peopleSectionRef}>
        <div className={styles.optionHeader}>
          <h2>선호 인원</h2> <span>*본인포함</span>
        </div>
        <div className={styles.participantOption}>
          <div className={styles.participantContainer}>
            <div>최소 인원수</div>
            <span>명</span>
            <p>~</p>
          </div>
          <div className={styles.participantContainer}>
            <div>최소 인원수</div>
            <span>명</span>
          </div>
        </div>
      </div>
      <div className={styles.verticalLine}></div>

      {/* 성향 */}
      <div className={styles.section} ref={tendencySectionRef}>
        <div className={styles.optionHeader}>
          <h2>성향</h2> <span>*중복 선택 가능</span>
        </div>
        <div className={styles.optionContainer}>
          {tendencyOption.map((option) => (
            <div
              key={option.label}
              className={`${tendency?.includes(option.key) ? styles.selected : ''} ${styles.tendencyItem}`}
              onClick={() => {
                handleSelectTendency(option.key);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 적용하기 */}
      <div className={styles.applyContainer}>
        <div
          className={styles.resetContainer}
          onClick={() => {
            reset();
          }}
        >
          <Image src={IconReset} width={21} height={21} alt="초기화" />
          <p>초기화</p>
        </div>
        <Button
          onClick={() => {
            onSubmit;
          }}
          size="medium"
        >
          적용하기
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
    </form>
  );
}
