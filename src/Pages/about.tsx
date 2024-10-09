import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">אודות</h1>
        <p className="text-lg text-gray-700">
          החברה שלנו מתמחה במתן שירותים טכנולוגיים מתקדמים. אנו שמים דגש על מקצועיות, חדשנות ושירות אישי לכל לקוח.
        </p>
      </div>
    </div>
  );
};

export default About;
