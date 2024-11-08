import { api } from '@/config';
import md5 from 'md5';

type PostStaffProps = {
  name: string;
  username: string;
  password: string;
};

export const postStaff = async ({ name, username, password }: PostStaffProps) => {
  try {
    const { data } = await api.post('/staff', { name, username, password: md5(password) });

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
