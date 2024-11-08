import { api } from '@/config';

type Amenities = { label: string; icon: string }[];

export type Room = {
  number: number;
  description: string;
  capacity: number;
  num_bathrooms: number;
  price: number;
  amenities: Amenities;
};

export const getRooms = async () => {
  try {
    const { data } = await api.get<Room[]>('/rooms');

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
