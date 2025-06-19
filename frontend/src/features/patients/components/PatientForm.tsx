import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientFormSchema, type PatientFormValues } from '../schemas.js';
import { useRegisterPatient } from '../hooks/useRegisterPatient.js';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { ImageDropzone } from './ImageDropzone.tsx';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PatientFormProps {
  onSuccess: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSuccess }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneCountryCode: '',
      phoneNumber: '',
      documentPhoto: null,
    },
  });

  const mutation = useRegisterPatient();

  const onSubmit = (data: PatientFormValues) => {
    const file = data.documentPhoto[0];
    mutation.mutate({ ...data, documentPhoto: file });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess, onSuccess]);

  if (mutation.isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
          <Loader2 className="h-16 w-16 text-slate-900" />
        </motion.div>
        <p className="text-lg font-medium">Registering Patient...</p>
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500" />
        <p className="text-lg font-medium">Registration Failed</p>
        <p className="text-sm text-slate-600">{mutation.error.message}</p>
        <Button variant="outline" onClick={() => mutation.reset()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <p className="text-lg font-medium">Patient Registered Successfully!</p>
        <p className="text-sm text-slate-600">This window will close automatically.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <DialogHeader>
        <DialogTitle>Register New Patient</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email Address</label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <label htmlFor="phoneCountryCode" className="text-sm font-medium">Code</label>
            <Input id="phoneCountryCode" placeholder="+1" {...register('phoneCountryCode')} />
          </div>
          <div className="col-span-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
            <Input id="phoneNumber" type="tel" {...register('phoneNumber')} />
          </div>
        </div>
        {(errors.phoneCountryCode || errors.phoneNumber) && (
           <p className="text-red-500 text-sm -mt-2">
             {errors.phoneCountryCode?.message || errors.phoneNumber?.message}
           </p>
        )}
        <div>
          <label className="text-sm font-medium">Document Photo</label>
          <Controller
            name="documentPhoto"
            control={control}
            render={({ field }) => (
              <ImageDropzone
                value={field.value?.[0] || null}
                onChange={(file) => field.onChange(file ? [file] : null)}
              />
            )}
          />
          {errors.documentPhoto && <p className="text-red-500 text-sm mt-1">{errors.documentPhoto.message as string}</p>}
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Register Patient</Button>
      </DialogFooter>
    </form>
  );
};