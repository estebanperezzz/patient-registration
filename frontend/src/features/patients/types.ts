export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  documentPhotoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPatientFormData {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhoto: File;
}