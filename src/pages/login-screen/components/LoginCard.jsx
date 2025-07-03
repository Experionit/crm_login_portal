import React from 'react';

const LoginCard = ({ children }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface rounded-xl shadow-elevation-3 border border-border p-8 sm:p-10">
        {children}
      </div>
    </div>
  );
};

export default LoginCard;