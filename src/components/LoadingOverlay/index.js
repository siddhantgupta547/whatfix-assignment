import { Backdrop, Box, Typography } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import React from 'react';

export default function LoadingOverlay({ open }) {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LocationSearchingIcon color="primary" fontSize="large" />
        <Typography color="primary" variant="h5">
          Fetching Existing Pins
        </Typography>
      </Box>
    </Backdrop>
  );
}
