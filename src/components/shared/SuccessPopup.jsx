import React from 'react';

const SuccessPopup = ({ message }) => (
    <div className="fixed top-4 right-4 text-[#8338EC] bg-white border-[1px] px-6 py-3 rounded-md shadow-lg z-50">
        {message}
    </div>
);

export default SuccessPopup; 