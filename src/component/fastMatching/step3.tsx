import styles from './step.module.scss';
import Button from '../common/button';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Navigation from '../common/navigation';
import TopText from './topText';
import { IconCheckCheckBox } from '../../../public/icons';
import { useFormContext, useWatch } from 'react-hook-form';
import TendencyBox from './tendencyBox';
import MemScopeBox from './memScopeBox';

interface IStep3 {
  onNext: () => void;
  onBefore: () => void;
}

export default function Step3({ onNext, onBefore }: IStep3) {
  const [progress, setProgress] = useState<number>(66);
  const { getValues, setValue, control } = useFormContext();
  const [isRemember, setIsRemember] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);
    console.log(getValues());

    return () => clearTimeout(timer);
  }, []);

  const [mem_scope, tendency] = useWatch({
    control,
    name: ['mem_scope', 'tendency'],
  });

  const handleCheckBoxClick = () => {
    setIsRemember(!isRemember);
    setValue('save', !isRemember);
  };

  return (
    <div className={styles.Container}>
      <Navigation title="스피드 매칭" onClick={onBefore} />
      <div className={styles.seperator}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <TopText step={3} />
      <div className={styles.ContentsContainer}>
        <p className={styles.contents}>나의 학습 성향은?</p>
        <TendencyBox />
        <p className={styles.contents}>선호 인원은?</p>
        <MemScopeBox />
      </div>
      <div className={styles.RememberContainer}>
        <p className={styles.RememberP}>다음에도 이 조건을 기억할게요</p>
        {isRemember ? (
          <Image
            src={IconCheckCheckBox}
            width={32}
            height={32}
            alt="checkBox"
            onClick={handleCheckBoxClick}
          />
        ) : (
          <div className={styles.CheckBox} onClick={handleCheckBoxClick}></div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onNext} disabled={!mem_scope || !tendency}>
          다음
        </Button>
      </div>
    </div>
  );
}
