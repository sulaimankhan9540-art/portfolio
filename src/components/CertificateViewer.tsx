import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';

interface CertificateViewerProps {
  file: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({ file, title, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  if (!isOpen || !file) return null;

  const isPdf = file.startsWith('data:application/pdf');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file;
    link.download = title.replace(/\s+/g, '_') + (isPdf ? '.pdf' : '.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-3 sm:p-4 border-b shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-primary-900 truncate pr-4">{title}</h3>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {!isPdf && (
              <>
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg" title="Zoom out">
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="text-xs sm:text-sm text-gray-600 w-10 sm:w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg" title="Zoom in">
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}
            <button onClick={handleDownload} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg" title="Download">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg" title="Close">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-50 flex items-center justify-center min-h-[300px]">
          {isPdf ? (
            <iframe src={file} className="w-full h-[60vh] sm:h-[70vh] rounded-lg bg-white" title={title} />
          ) : (
            <img src={file} alt={title} className="max-w-full transition-transform duration-200 shadow-lg rounded-lg" style={{ transform: `scale(${zoom})` }} />
          )}
        </div>
      </div>
    </div>
  );
};
