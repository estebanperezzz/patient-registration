import { useGetPatients } from '../hooks/useGetPatients.js';
import { PatientCard } from './PatientCard.tsx';
import * as Accordion from '@radix-ui/react-accordion';
import { Loader2 } from 'lucide-react';

export const PatientList = () => {
  const { data: patients, isLoading, isError } = useGetPatients();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load patients. Please try again later.
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-slate-300 rounded-lg">
        <div className="text-center">
          <h3 className="text-xl font-semibold">No Patients Found</h3>
          <p className="text-slate-500 mt-2">
            Click "Add Patient" to register a new patient.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <Accordion.Root type="single" collapsible>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </Accordion.Root>
    </div>
  );
};