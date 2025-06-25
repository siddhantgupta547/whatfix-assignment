'use client';
import { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import { fetchPinsData, handleDeleteAllClick } from '@/utils/apiCalls';
import FeedbackModal from '@/components/FeedbackModal';
import Header from '@/components/Header';
import LoadingOverlay from '@/components/LoadingOverlay';
import MemoizedPin from '@/components/Pin';

//Function to call fetch Pins API and then put array data into Map and then to pins state
async function fetchAndSetPins(setterFn, loaderFn) {
  loaderFn(true);
  const data = await fetchPinsData();
  const pins = data?.pins;
  const pinsMap = new Map();
  pins.forEach((pin) => {
    pinsMap.set(pin?.id, pin);
  });
  setterFn(pinsMap);
  loaderFn(false);
}

export default function Home() {
  //State Variables
  const [pins, setPins] = useState(new Map()); // Stores all pins fetched
  const [showModal, setShowModal] = useState(false); // boolean to show modal
  const [modalPinData, setModalPinData] = useState(null); // Data for the pin currently in modal
  const [fetchingPins, setFetchingPins] = useState(false); // For loading state when fetching pins

  //router instance
  const router = useRouter();

  //Effects
  useEffect(() => {
    fetchAndSetPins(setPins, setFetchingPins);
  }, []);

  // Handler to open modal for an existing pin
  const handlePinClick = useCallback(
    (pinId) => {
      const pin = pins.get(pinId);
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
  function handleCloseModal() {
    setShowModal(false);

    setTimeout(() => {
      setModalPinData(null);
    }, 500);

    router.push('/');
  }

  // Handler for clicks anywhere on the page to create a new pin
  const handlePageClick = useCallback(
    (e) => {
      if (showModal) return; // Don't open modal if another is open or not authenticated

      // Get click coordinates relative to the viewport
      const x = e.clientX;
      const y = e.clientY;

      setModalPinData({ x, y, feedback: '' });
      setShowModal(true);
    },
    [showModal]
  );

  //Function to create an array of React Elements from pins Map
  function renderPins() {
    const pinsArray = [];
    pins.forEach((pin) =>
      pinsArray.push(
        <MemoizedPin
          key={pin.id}
          id={pin.id}
          x={pin.x}
          y={pin.y}
          onClick={handlePinClick}
        />
      )
    );
    return pinsArray;
  }

  return (
    <div className={styles.page}>
      <Header handleDeleteAllClick={handleDeleteAllClick} />
      <main className={styles.main} onClick={handlePageClick}>
        {/* Render all fetched pins */}
        {renderPins()}
        {/* Feedback Modal */}
        <FeedbackModal
          pinData={modalPinData}
          onClose={handleCloseModal}
          open={showModal && modalPinData}
          updatePins={setPins}
        />
      </main>
      <footer className={styles.footer}>
        <Typography color="primary">
          Click anywhere on the page to leave feedback!
        </Typography>
      </footer>
      <LoadingOverlay open={fetchingPins} />
    </div>
  );
}
