import { useFormContext, useWatch } from 'react-hook-form';
import styles from './tendencyBox.module.scss';
import { tendencyOption } from '@/data/filterData';

export default function TendencyBox() {
  const { setValue, control } = useFormContext();

  // useWatch로 'tendency' 값을 배열로 감시
  const selectedValues = useWatch({
    control,
    name: 'tendency',
  });

  // 선택된 값들을 배열로 변환
  const selectedArray = selectedValues ? selectedValues.split(',') : [];

  const handleClick = (key: string) => {
    let updatedArray;

    // 이미 선택된 값이면 배열에서 제거, 아니면 추가
    if (selectedArray.includes(key)) {
      updatedArray = selectedArray.filter((item: string) => item !== key);
    } else {
      updatedArray = [...selectedArray, key];
    }

    // 배열을 쉼표로 구분된 문자열로 변환하여 저장
    setValue('tendency', updatedArray.join(','));
  };

  return (
    <div className={styles.optionContainer}>
      {tendencyOption.map((item) => (
        <div
          key={item.key}
          className={`${styles.optionBox} ${
            selectedArray.includes(item.key) ? styles.active : ''
          }`}
          onClick={() => handleClick(item.key)}
        >
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
