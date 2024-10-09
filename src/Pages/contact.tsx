import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">צור קשר</h1>
        <p className="text-lg text-gray-700">
          נשמח לשמוע מכם! צרו איתנו קשר לפרטים נוספים או לבירור שאלות בנוגע לשירותים שלנו.
        </p>
      </div>
    </div>
  );
};

export default Contact;
