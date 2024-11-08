import { api } from '@/config';
import md5 from 'md5';

type PutStaffProps = {
  id: string;
  name: string;
  username: string;
  password: string;
  active: boolean;
};

export const putStaff = async ({ id, name, username, password, active }: PutStaffProps) => {
  try {
    const { data } = await api.put(`/staff/${id}`, { name, username, password: md5(password), active });

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
