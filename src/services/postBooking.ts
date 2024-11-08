import { api } from '@/config';

type PostBookingProps = {
  numPeople: string;
  checkinDate: string;
  checkoutDate: string;
  totalAmount: number;
  customer: string;
  room: string;
};

export const postBooking = async ({
  numPeople,
  checkinDate,
  checkoutDate,
  totalAmount,
  customer,
  room,
}: PostBookingProps) => {
  try {
    const { data } = await api.post('/bookings', {
      numPeople,
      checkinDate,
      checkoutDate,
      status: 'PENDING',
      totalAmount,
      customer,
      room,
    });

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
