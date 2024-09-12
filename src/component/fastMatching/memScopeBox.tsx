import { useFormContext, useWatch } from 'react-hook-form';
import styles from './memScopeBox.module.scss';
import { memscopeOption } from '@/data/memScopeData';

export default function MemScopeBox() {
  const { setValue, control } = useFormContext();

  const selectedValues =
    useWatch({
      control,
      name: 'mem_scope',
    }) || '';

  // 선택된 값들을 배열로 변환
  const selectedArray = selectedValues
    ? selectedValues.split(',').map(Number)
    : [];

  const handleClick = (key: number) => {
    let updatedArray;

    // 이미 선택된 값이면 배열에서 제거, 아니면 추가
    if (selectedArray.includes(key)) {
      updatedArray = selectedArray.filter((item: number) => item !== key);
    } else {
      updatedArray = [...selectedArray, key];
    }

    // 배열을 쉼표로 구분된 문자열로 변환하여 저장
    setValue('mem_scope', updatedArray.join(','));
  };

  return (
    <div className={styles.optionContainer}>
      {memscopeOption.map((item) => (
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
