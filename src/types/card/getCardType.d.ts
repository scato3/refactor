export interface GetCardType {
  quickMatch?: string | null;
  category?: string | null;
  startDate?: string | null;
  duration?: string | null;
  minParticipants?: number | null;
  maxParticipants?: number | null;
  tendency?: string | null;
  orderType: string;
  [key: string]: unknown;
}
