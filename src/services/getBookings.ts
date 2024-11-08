import { api } from '@/config';

export type StatusKeys = 'COMPLETE' | 'ONGOING' | 'PENDING';

export type Booking = {
  id: string;
  created_tmz: string;
  updated_tmz: string;
  num_people: string;
  checkin_date: string;
  checkout_date: string;
  status: StatusKeys;
  total_amount: number;
  customer: string;
  room: string;
};

export const getBookings = async () => {
  try {
    const { data } = await api.get<Booking[]>('/bookings');

    return {
      isError: false,
      data,
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
