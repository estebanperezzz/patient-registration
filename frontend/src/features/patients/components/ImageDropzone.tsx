import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { UploadCloud, X } from 'lucide-react';

interface ImageDropzoneProps {
  onChange: (file: File | null) => void;
  className?: string;
  value: File | null;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onChange, className, value }) => {
  const [preview, setPreview] = useState<string | null>(value ? URL.createObjectURL(value) : null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-slate-400',
        { 'border-blue-500 bg-blue-50': isDragActive },
        className
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="max-h-40 rounded-md object-contain" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <UploadCloud size={32} />
          <p>Drag 'n' drop a .jpg file here, or click to select</p>
        </div>
      )}
    </div>
  );
};