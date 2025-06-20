import apiClient from '../../../lib/axios';
import type { Patient, RegisterPatientFormData } from '../types';

export const getPatients = async (): Promise<Patient[]> => {
    //TODO in backend
  const response = await apiClient.get('/patients');
  return response.data;
};

export const registerPatient = async (
  formData: RegisterPatientFormData
): Promise<Patient> => {
  const data = new FormData();
  data.append('fullName', formData.fullName);
  data.append('email', formData.email);
  data.append('phoneCountryCode', formData.phoneCountryCode);
  data.append('phoneNumber', formData.phoneNumber);
  data.append('documentPhoto', formData.documentPhoto);

  const response = await apiClient.post('/patients', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};