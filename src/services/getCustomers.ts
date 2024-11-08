import { api } from '@/config';

export type Customer = {
  id: string;
  name: string;
  date_of_birth: string;
  email: string;
  cellphone: string;
};

export const getCustomers = async () => {
  try {
    const { data } = await api.get<Customer[]>('/customers');

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
