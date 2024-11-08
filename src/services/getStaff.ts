import { api } from '@/config';

export type Staff = {
  id: string;
  created_tmz: string;
  update_tmz: string;
  name: string;
  username: string;
  password: string;
  active: boolean;
  roles: string[];
};

export const getStaff = async () => {
  try {
    const { data } = await api.get<Staff[]>('/staff');

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
