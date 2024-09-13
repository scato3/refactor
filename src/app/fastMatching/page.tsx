'use client';

import styles from './fastMatching.module.scss';
import Step1 from '@/component/fastMatching/step1';
import Step2 from '@/component/fastMatching/step2';
import Step3 from '@/component/fastMatching/step3';
import LastPage from '@/component/fastMatching/lastPage';
import { QuickMatchInitialData } from '@/data/quickMatchData';
import useFunnel from '@/hooks/useFunnel';
import { QuickMatchProps } from '@/types/quick/quickMatchType';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FilterDataType } from '@/types/fastMatching/filterType';

const steps: string[] = ['Step1', 'Step2', 'Step3', 'Last'];

export default function FastMatching() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  const methods = useForm<QuickMatchProps>({
    defaultValues: QuickMatchInitialData,
  });

  const [data, setData] = useState<FilterDataType>();

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Funnel>
          <Step name="Step1">
            <Step1 onNext={() => setStep('Step2')}></Step1>
          </Step>
          <Step name="Step2">
            <Step2
              onNext={() => setStep('Step3')}
              onBefore={() => setStep('Step1')}
            ></Step2>
          </Step>
          <Step name="Step3">
            <Step3
              onNext={() => setStep('Last')}
              onBefore={() => setStep('Step2')}
              setData={setData}
            ></Step3>
          </Step>
          <Step name="Last">
            <LastPage onBefore={() => setStep('Step3')} data={data}></LastPage>
          </Step>
        </Funnel>
      </div>
    </FormProvider>
  );
}
