import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

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
    const newImages: string[] = [];

    for (const file of files) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Some files exceed ${maxSizeMB}MB limit`);
        continue;
      }
      if (!validTypes.includes(file.type)) {
        setError('Only JPG, PNG, WEBP images allowed');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        newImages.push(result);
        if (newImages.length === files.length) {
          onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
              <img src={img} alt={`Project ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
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
        <p className="text-xs text-gray-500 font-medium">Click to add images</p>
        <p className="text-xs text-gray-400">JPG, PNG, WEBP up to {maxSizeMB}MB each</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
