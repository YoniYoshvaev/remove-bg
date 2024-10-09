import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">תנאי שימוש</h1>
        <p className="text-lg text-gray-700">
          כאן תוכלו למצוא את תנאי השימוש שלנו. אנא ודאו שקראתם את התנאים לפני השימוש באתר.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
