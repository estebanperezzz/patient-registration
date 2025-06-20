import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import type { Patient } from '../types.js';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Accordion.Item
      value={patient.id}
      className="border-b border-slate-200"
    >
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between p-4 text-left hover:bg-slate-50">
          <div className="flex items-center gap-4">
            <img
              src={patient.documentPhotoUrl}
              alt={`${patient.fullName}'s document`}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-medium text-slate-800">{patient.fullName}</span>
          </div>
          <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden bg-slate-50/50 p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail size={14} />
            <span>{patient.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone size={14} />
            <span>{patient.phone}</span>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};