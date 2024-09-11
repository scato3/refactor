import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import styles from './filterOpenBtn.module.scss';
import { ArrowDown } from '../../../public/arrow';
import { IconBolt } from '../../../public/icons';
import { classnames as cX } from '@/utils/classnames';
import { filterStatus } from '@/data/filterStatus';
import { useModal } from '@/hooks/useModal';
import ModalContainer from '../common/modalContainer';
import ModalPortal from '../common/modalPortal';
import FilterModal from '../modal/filterModal';

interface FilterProps {
  property?: 'default' | 'active';
  arrow?: boolean;
}

export default function FilterOpenBtn({ property = 'default' }: FilterProps) {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 3, spacing: 10 },
      },
      '(min-width: 390px)': {
        slides: { perView: 3.5, spacing: 10 },
      },
    },
  });

  return (
    <div className={styles.Container}>
      <div ref={sliderRef} className="keen-slider">
        {Object.keys(filterStatus).map((key) => {
          const typedKey = key as keyof typeof filterStatus;
          return (
            <div key={key} className="keen-slider__slide">
              <div className={cX(styles.slideBox, styles[property])}>
                <div
                  className={cX(styles.slideButton, styles[property])}
                  onClick={() => {
                    typedKey !== 'quickMatch' ? handleOpenModal() : '';
                  }}
                >
                  {typedKey === 'quickMatch' ? (
                    <Image
                      className={styles.boltIcon}
                      src={IconBolt}
                      width={16}
                      height={16}
                      alt="IconBolt"
                    />
                  ) : null}
                  <p className={styles.content}>
                    {filterStatus[typedKey].label}
                  </p>
                  {typedKey !== 'quickMatch' && (
                    <Image
                      className={styles.arrow}
                      src={ArrowDown}
                      width={16}
                      height={16}
                      alt="ArrowDown"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <FilterModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
