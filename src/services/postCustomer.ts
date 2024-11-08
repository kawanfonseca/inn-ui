import { api } from '@/config';

type PostCustomerProps = {
  id: string;
  name: string;
  dateOfBirth: string;
  email: string;
  cellphone: string;
};

export const postCustomer = async ({ id, name, dateOfBirth, email, cellphone }: PostCustomerProps) => {
  try {
    const { data } = await api.post('/customers', { id, name, dateOfBirth, email, cellphone });

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
