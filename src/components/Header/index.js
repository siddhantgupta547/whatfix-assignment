import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import styles from './Header.module.css';

function Header({ handleDeleteAllClick }) {
  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.link}>
        <Typography color="primary" variant="h4">
          UI Feedback App
        </Typography>
      </Link>
      <Box>
        <Button variant="contained" onClick={handleDeleteAllClick}>
          Clear All Pins
        </Button>
      </Box>
    </header>
  );
}

export default Header;
