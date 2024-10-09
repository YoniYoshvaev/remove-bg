import React from 'react';

interface BackgroundSelectorProps {
  backgrounds: string[];
  selectedBackground: string | null;
  onSelect: (background: string | null) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ backgrounds, selectedBackground, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {backgrounds.map((bg, index) => (
        <div key={index} className="m-2">
          <img
            src={bg}
            alt={`Background ${index}`}
            className={`w-24 h-24 cursor-pointer rounded-md border-2 ${selectedBackground === bg ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => onSelect(bg)}
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundSelector;
