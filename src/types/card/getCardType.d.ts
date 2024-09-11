export interface GetCardType {
  quickMatch?: string;
  category?: string;
  startDate?: string;
  duration?: string;
  minParticipants?: number | string;
  maxParticipants?: number | string;
  tendency?: string;
  orderType: string;
  [key: string]: unknown;
}
