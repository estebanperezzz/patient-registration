import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerPatient } from '../api/index.js';

export const useRegisterPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};