import styles from './popularBox.module.scss';

interface DataType {
  id: number;
  keyword: string;
}

type PopularBoxProps = {
  data: DataType[];
};

export default function PopularBox({ data }: PopularBoxProps) {
  const maxItems = 6;
  const emptyData = new Array(maxItems).fill(null); // 빈 데이터를 위한 배열

  const displayData = emptyData.map((_, index) => data[index] || null);

  return (
    <div className={styles.Container}>
      <h2>인기 검색어</h2>
      <div className={styles.gridContainer}>
        {displayData.map((item, index) => (
          <div key={item?.id} className={styles.gridItem}>
            <span>{index + 1}</span> <p>{item ? item.keyword : '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
