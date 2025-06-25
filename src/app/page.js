'use client';
//import { getpins } from '@/prisma-db';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import Pin from '@/components/Pin';
import Header from '@/components/Header';
import { Typography } from '@mui/material';

async function fetchPinsData(setterFn) {
  const res = await fetch('/api/pins');
  const data = await res.json();
  const pins = data?.pins;
  setterFn(pins);
}

async function savePin() {
  const res = await fetch('/api/pins', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x: 1, y: 1, feedback: 'Hello' }),
  });
  const data = await res.json();
  console.debug(data);
}

async function handleDeleteAllClick() {
  const res = await fetch('/api/pins', { method: 'Delete' });
  const data = await res.json();
  console.debug(data);
}

export default function Home() {
  const [pins, setPins] = useState([]); // Stores all pins fetched
  useEffect(() => {
    fetchPinsData(setPins);
  }, []);

  return (
    <div className={styles.page}>
      <Header handleDeleteAllClick={handleDeleteAllClick} />
      <main className={styles.main}>
        {/* <button onClick={savePin}>Post call</button> */}
        {/* Render all fetched pins */}
        {pins?.map((pin) => (
          <Pin
            key={pin.id}
            id={pin.id}
            x={pin.x}
            y={pin.y}
            onClick={() => {}}
          />
        ))}
      </main>
      <footer className={styles.footer}>
        <Typography color="primary">
          Click anywhere on the page to leave feedback!
        </Typography>
      </footer>
    </div>
  );
}
