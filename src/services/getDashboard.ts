import { api } from '@/config';
import { Booking } from './getBookings';
import { Customer } from './getCustomers';

export type DashboardData = {
  totalStaff: number;
  totalRooms: number;
  totalBookings: number;
  totalCustomers: number;
  totalRevenue: number;
  recentBookings: Booking[];
  recentCustomers: Customer[];
};

export const getDashboard = async () => {
  try {
    const { data } = await api.get<DashboardData>('/dashboard');

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
