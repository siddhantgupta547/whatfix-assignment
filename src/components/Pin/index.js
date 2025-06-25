import React from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export default function Pin({ id, x, y, onClick }) {
  return (
    <div
      id={`pin-${id}`}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 10,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(id);
      }}
      title={'Feedback Pin'}
    >
      <GpsFixedIcon color="primary" />
    </div>
  );
}
