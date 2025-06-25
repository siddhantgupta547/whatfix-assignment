import React from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { IconButton } from '@mui/material';

export default function Pin({ id, x, y, onClick }) {
  return (
    <IconButton
      id={`pin-${id}`}
      sx={{
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
    </IconButton>
  );
}
