import React from 'react';

export const SectionHead = (label) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="section-head">
          <h2>{label}</h2>
        </div>
      </div>
    </div>
  );
};
