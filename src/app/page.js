'use client';
//import { getpins } from '@/prisma-db';
import styles from './page.module.css';
import { useEffect } from 'react';

async function fetchPinsData() {
  const res = await fetch('/api/pins');
  const data = await res.json();
  console.debug(data);
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

async function deleteAllPins() {
  const res = await fetch('/api/pins', { method: 'Delete' });
  const data = await res.json();
  console.debug(data);
}

export default function Home() {
  useEffect(() => {
    fetchPinsData();
  }, []);
  // const pins = await getpins();
  // console.debug(pins);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={savePin}>Post call</button>
        <button onClick={deleteAllPins}>Delete call</button>
      </main>
    </div>
  );
}
