import { api } from '@/config';
import { StatusKeys } from './getBookings';

type PutBookingProps = {
  id: string;
  status: StatusKeys;
  numPeople: string;
  checkinDate: string;
  checkoutDate: string;
  totalAmount: number;
  customer: string;
  room: string;
};

export const putBooking = async ({
  id,
  status,
  numPeople,
  checkinDate,
  checkoutDate,
  totalAmount,
  customer,
  room,
}: PutBookingProps) => {
  try {
    const { data } = await api.put(`/bookings/${id}`, {
      numPeople,
      checkinDate,
      checkoutDate,
      status,
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
