import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { PatientForm } from '@/features/patients/components/PatientForm';

const PatientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Patients Management
        </h1>
        <DialogTrigger asChild>
          <Button>Add Patient</Button>
        </DialogTrigger>
      </div>

      <div className="p-8 border-2 border-dashed border-slate-300 rounded-lg">
        <div className="text-center">
          <h3 className="text-xl font-semibold">No Patients Found</h3>
          <p className="text-slate-500 mt-2">
            Click "Add Patient" to register a new patient.
          </p>
        </div>
      </div>
      
      <DialogContent>
        <PatientForm onSuccess={() => setIsModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default PatientsPage;