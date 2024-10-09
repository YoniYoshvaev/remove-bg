import React, { useEffect, useRef } from 'react';

interface CanvasProps {
  bgImageSrc: string | null;
  removedBgImageSrc: string;
  onImageReady: (imageDataUrl: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({ bgImageSrc, removedBgImageSrc, onImageReady }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const background = new Image();
      background.src = bgImageSrc || '';

      const removedBgImage = new Image();
      removedBgImage.src = removedBgImageSrc;

      background.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (bgImageSrc) {
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }

        removedBgImage.onload = () => {
          ctx.drawImage(removedBgImage, 0, 0, canvas.width, canvas.height);

          const imageDataUrl = canvas.toDataURL('image/png');
          onImageReady(imageDataUrl);  
        };
      };

      if (!bgImageSrc) {
        removedBgImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(removedBgImage, 0, 0, canvas.width, canvas.height);

          const imageDataUrl = canvas.toDataURL('image/png');
          onImageReady(imageDataUrl);  
        };
      }
    }
  }, [bgImageSrc, removedBgImageSrc, onImageReady]);

  return (
    <canvas
      ref={canvasRef}
      width={500} 
      height={500}
      className="w-full h-auto border border-gray-300 rounded-lg"
    ></canvas>
  );
};

export default Canvas;

