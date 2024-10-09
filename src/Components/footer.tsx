import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 w-full pb-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/privacy-policy" className="hover:text-white transition duration-300">מדיניות פרטיות</a>
          <a href="/terms-of-service" className="hover:text-white transition duration-300">תנאי שימוש</a>
          <a href="/contact" className="hover:text-white transition duration-300">צור קשר</a>
        </div>
        <p className="text-sm">כל הזכויות שמורות YSעריכה </p>
      </div>
    </footer>
  );
};

export default Footer;
