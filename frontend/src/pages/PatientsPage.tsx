import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { PatientForm } from '@/features/patients/components/PatientForm.js';
import { PatientList } from '@/features/patients/components/PatientList.js';

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

      <PatientList />

      <DialogContent>
        <PatientForm onSuccess={() => setIsModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default PatientsPage;