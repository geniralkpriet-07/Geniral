import React from 'react';

const SectionHeading = ({ title, addToRefs }) => (
  <h2 
    ref={addToRefs} 
    className="text-3xl font-bold mb-10 text-center heading-container"
  >
    <span className="border-b-4 border-purple-500 pb-2 text-gradient relative">
      {title}
      <div className="heading-rays"></div>
    </span>
  </h2>
);

export default SectionHeading;
