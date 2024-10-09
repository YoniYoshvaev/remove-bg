import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { removeBackground } from '../services/backgroundRemoval';
import Canvas from '../Components/Canvas';
import BackgroundSelector from '../Components/BackgroundSelector';
import bg1 from '../assets/background1.jpg';
import bg2 from '../assets/background2.jpg';
import bg3 from '../assets/background3.jpg';

const HomePage: React.FC = () => {
  const [bgRemovedImage, setBgRemovedImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<string>('600x500');
  const [selectedImageType, setSelectedImageType] = useState<string>('png'); 

  const backgroundImages = [bg1, bg2, bg3];

  const dimensions = [
    { label: '500x500', value: '500x500' },
    { label: '800x600', value: '800x600' },
    { label: '800x1000', value: '800x1000' },
    { label: '600x1200', value: '600x1200' },
  ];

  const imageTypes = [
    { label: 'PNG', value: 'png' },
    { label: 'JPG', value: 'jpg' },
    { label: 'JPEG', value: 'jpeg' },
    { label: 'TIFF', value: 'tiff' },
  ];

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const removedBg = await removeBackground(file);
    if (removedBg) {
      const imgURL = URL.createObjectURL(removedBg);
      setBgRemovedImage(imgURL);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const downloadImage = () => {
    if (finalImage) {
      const [width, height] = selectedDimension.split('x').map(Number);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error("Failed to get canvas context.");
        return;  
      }

      const img = new Image();
      img.src = finalImage;

      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);

        const a = document.createElement('a');
        const mimeType = selectedImageType === 'jpg' || selectedImageType === 'jpeg' ? 'image/jpeg' : 'image/png';
        a.href = canvas.toDataURL(mimeType);
        a.download = `edited-image-${selectedDimension}.${selectedImageType}`;
        a.click();
      };
    }
  };

  const handleRefresh = () => {
    setBgRemovedImage(null);
    setSelectedBackground(null);
    setFinalImage(null); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4 pb-20">
      <h1 className="text-4xl font-bold text-center text-gray-800">מסיר רקע ועורך תמונות</h1>
      
      {bgRemovedImage && (
        <button
          onClick={handleRefresh}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            רענן עמוד
          </span>
        </button>
      )}

      <div
        {...getRootProps()}
        className={`border-dashed border-2 rounded-lg p-8 text-center transition-colors duration-300 w-full max-w-lg ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive ? 'שחרר את התמונה כאן' : 'גרור ושחרר תמונה, או לחץ לבחירת קובץ'}
        </p>
      </div>

      {bgRemovedImage && (
        <div className="space-y-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">תצוגה מקדימה</h2>
          
          <Canvas
            bgImageSrc={selectedBackground}
            removedBgImageSrc={bgRemovedImage}
            onImageReady={(imageDataUrl) => setFinalImage(imageDataUrl)}  
          />

          <BackgroundSelector
            backgrounds={backgroundImages} 
            selectedBackground={selectedBackground}
            onSelect={setSelectedBackground}  
          />

          
          {finalImage && (
            <div className="relative inline-block text-left">
              <div>
                <button
                  id="dropdownDefaultButton"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  onClick={() => {
                    const dropdown = document.getElementById('dropdown');
                    if (dropdown) {
                      dropdown.classList.toggle('hidden');
                    }
                  }}
                >
                  {selectedDimension} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
              </div>
              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                  {dimensions.map((dimension) => (
                    <li key={dimension.value}>
                      <button
                        onClick={() => {
                          setSelectedDimension(dimension.value);
                          const dropdown = document.getElementById('dropdown');
                          if (dropdown) {
                            dropdown.classList.add('hidden');
                          }
                        }}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {dimension.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="relative inline-block text-left mt-4">
            <div>
              <button
                id="imageTypeDropdownButton"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={() => {
                  const dropdown = document.getElementById('imageTypeDropdown');
                  if (dropdown) {
                    dropdown.classList.toggle('hidden');
                  }
                }}
              >
                {selectedImageType.toUpperCase()} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
            </div>
            <div id="imageTypeDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700" aria-labelledby="imageTypeDropdownButton">
                {imageTypes.map((type) => (
                  <li key={type.value}>
                    <button
                      onClick={() => {
                        setSelectedImageType(type.value);
                        const dropdown = document.getElementById('imageTypeDropdown');
                        if (dropdown) {
                          dropdown.classList.add('hidden');
                        }
                      }}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {type.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {finalImage && (
            <button
              onClick={downloadImage}
              className="mt-4 inline-flex items-center justify-center p-2 mb-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              הורד את התמונה
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
