'use client';

import styles from './fastMatching.module.scss';
import Step1 from '@/component/fastMatching/step1';
import Step2 from '@/component/fastMatching/step2';
import Step3 from '@/component/fastMatching/step3';
import { QuickMatchInitialData } from '@/data/quickMatchData';
import useFunnel from '@/hooks/useFunnel';
import { QuickMatchProps } from '@/types/quick/quickMatchType';
import { FormProvider, useForm } from 'react-hook-form';

const steps: string[] = ['Step1', 'Step2', 'Step3', 'Last'];

export default function FastMatching() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  const methods = useForm<QuickMatchProps>({
    defaultValues: QuickMatchInitialData,
  });

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
              onNext={() => setStep('Step3')}
              onBefore={() => setStep('Step2')}
            ></Step3>
          </Step>
        </Funnel>
      </div>
    </FormProvider>
  );
}
