import { api } from '@/config';

type PostLoginProps = {
  username: string;
  password: string;
};

export const postLogin = async ({ username, password }: PostLoginProps) => {
  try {
    const { data } = await api.post('/login', { username, password });

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
