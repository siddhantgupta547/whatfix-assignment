'use client';
//import { getpins } from '@/prisma-db';
import styles from './page.module.css';
import { useCallback, useEffect, useState } from 'react';
import Pin from '@/components/Pin';
import Header from '@/components/Header';
import { Typography } from '@mui/material';
import FeedbackModal from '@/components/FeedbackModal';
import { useRouter } from 'next/navigation';

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
  //State Variables
  const [pins, setPins] = useState([]); // Stores all pins fetched
  const [showModal, setShowModal] = useState(false);
  const [modalPinData, setModalPinData] = useState(null); // Data for the pin currently in modal

  const router = useRouter();

  //Effects
  useEffect(() => {
    fetchPinsData(setPins);
  }, []);

  // Handler to open modal for an existing pin
  const handlePinClick = useCallback(
    (pinId) => {
      const pin = pins.find((p) => p.id === pinId);
      if (pin) {
        setModalPinData(pin);
        setShowModal(true);
        // Update URL with pinId for shareability
        router.push(`/?pinId=${pinId}`);
      }
    },
    [pins, router]
  );

  // Close modal and clear URL pinId if present
  const handleCloseModal = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      setModalPinData(null);
    }, 500);

    router.push('/');
  }, [router]);

  return (
    <div className={styles.page}>
      <Header handleDeleteAllClick={handleDeleteAllClick} />
      <main className={styles.main}>
        {/* Render all fetched pins */}
        {pins?.map((pin) => (
          <Pin
            key={pin.id}
            id={pin.id}
            x={pin.x}
            y={pin.y}
            onClick={handlePinClick}
          />
        ))}
        {/* Feedback Modal */}
        <FeedbackModal
          pinData={modalPinData}
          onClose={handleCloseModal}
          onSave={() => {}}
          open={showModal && modalPinData}
        />
      </main>
      <footer className={styles.footer}>
        <Typography color="primary">
          Click anywhere on the page to leave feedback!
        </Typography>
      </footer>
    </div>
  );
}
