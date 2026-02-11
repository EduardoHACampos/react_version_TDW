import React from 'react';
import { CDN_BASE_URL } from '../../../constants/links';

interface DownloadButtonProps {
  fileName: string;
  label: string;
  className?: string;
  as?: React.ElementType; // Adicione isso para suportar o Styled Component externo
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  fileName, 
  label, 
  className, 
  as: Component = 'a' 
}) => {
  const cleanFileName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  const fullUrl = `${CDN_BASE_URL}/${cleanFileName}`;

  return (
    <Component 
      href={fullUrl} 
      className={className}
      download
      target="_blank" 
      rel="noopener noreferrer"
    >
      {label}
    </Component>
  );
};

export default DownloadButton;