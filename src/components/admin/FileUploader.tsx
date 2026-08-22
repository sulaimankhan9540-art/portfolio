import React, { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploaderProps {
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  label?: string;
  maxSizeMB?: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  value, 
  onChange, 
  accept = ".jpg,.jpeg,.png,.webp,.pdf",
  label = "Upload File",
  maxSizeMB = 5
}) => {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid PDF, JPG, PNG, or WEBP file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const isPdf = value && value.startsWith('data:application/pdf');
  const isImage = value && value.startsWith('data:image');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="relative border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-100 rounded-full hover:bg-red-200 transition-colors z-10"
            title="Remove file"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>

          {isImage && (
            <img src={value} alt="Preview" className="w-full h-40 object-contain rounded-lg" />
          )}
          {isPdf && (
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <FileText className="w-14 h-14 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">PDF Document Uploaded</p>
              </div>
            </div>
          )}
          {!isImage && !isPdf && (
            <div className="flex items-center justify-center h-40">
              <p className="text-sm text-gray-500">File uploaded</p>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 font-medium">Click to upload</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP, PDF up to {maxSizeMB}MB</p>
        </div>
      )}

      <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <X className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
};

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxSizeMB?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images,
  onChange,
  label = "Project Images",
  maxSizeMB = 3
}) => {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError('');

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    for (const file of files) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Each image must be less than ${maxSizeMB}MB`);
        return;
      }
      if (!validTypes.includes(file.type)) {
        setError('Only JPG, PNG, WEBP images allowed');
        return;
      }
    }

    const readers = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(newImages => {
      onChange([...images, ...newImages]);
    });

    if (inputRef.current) inputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label} ({images.length} uploaded)</label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
              <img src={img} alt={`Project ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
      >
        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
        <p className="text-xs text-gray-500">Add images (JPG, PNG, WEBP)</p>
      </div>

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange} className="hidden" />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
