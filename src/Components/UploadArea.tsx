import React from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadAreaProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Drag and drop an image, or click to select a file</p>
    </div>
  );
};

export default UploadArea;
