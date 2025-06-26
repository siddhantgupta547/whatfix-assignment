import React, { memo } from 'react';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { IconButton } from '@mui/material';

const MemoizedPin = memo(function Pin({ id, x, y, onClick }) {
  return (
    <IconButton
      id={`pin-${id}`}
      sx={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-25%, -25%)',
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
});

export default MemoizedPin;
