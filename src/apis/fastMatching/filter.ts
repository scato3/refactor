import { QuickFilterType } from '@/types/fastMatching/filterType';
import api from '@/utils/fethcer';
import { useMutation } from '@tanstack/react-query';

async function postStudyFilter(data: QuickFilterType) {
  return await api.post({ url: 'study/quick/match', query: data });
}

export const usePostStudyFilter = () => {
  return useMutation({
    mutationFn: (data: QuickFilterType) => postStudyFilter(data),
  });
};
