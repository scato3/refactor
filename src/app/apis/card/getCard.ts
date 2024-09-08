import api from '@/app/utils/fethcer';
import { useQuery } from '@tanstack/react-query';
import { GetCardType } from '@/app/types/card/getCardType';

async function getCard(type: string, data: GetCardType) {
  return await api.get({ url: `study/${type}/filter`, query: data });
}

export const useGetCard = (type: string, data: GetCardType) => {
  return useQuery({
    queryKey: ['getCard', data],
    queryFn: () => getCard(type, data),
  });
};
