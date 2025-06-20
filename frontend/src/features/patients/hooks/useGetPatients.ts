import { useQuery } from '@tanstack/react-query';
import { getPatients } from '../api/index.js';

export const useGetPatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });
};