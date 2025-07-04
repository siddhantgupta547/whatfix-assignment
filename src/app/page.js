'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import styles from './page.module.css';
import { fetchPinsData, handleDeleteAllPins } from '@/utils/apiCalls';
import FeedbackModal from '@/components/FeedbackModal';
import Header from '@/components/Header';
import LoadingOverlay from '@/components/LoadingOverlay';
import MemoizedPin from '@/components/Pin';

//Function to call fetch Pins API and then put array data into Map and then to pins state
async function fetchAndSetPins(setterFn, loaderFn) {
  try {
    loaderFn(true);
    const data = await fetchPinsData();
    const pins = data?.pins;
    const pinsMap = new Map();
    pins.forEach((pin) => {
      pinsMap.set(pin?.id, pin);
    });
    setterFn(pinsMap);
  } catch (error) {
    console.error(error);
  } finally {
    loaderFn(false);
  }
}

//Function to clear all the pins
async function handleClearAll(setterFn, loaderFn) {
  try {
    loaderFn(true);
    await handleDeleteAllPins();
    setterFn(new Map());
  } catch (error) {
    console.error(error);
  } finally {
    loaderFn(false);
  }
}

export default function Home() {
  //State Variables
  const [pins, setPins] = useState(new Map()); // Stores all pins fetched
  const [showModal, setShowModal] = useState(false); // boolean to show modal
  const [modalPinData, setModalPinData] = useState(null); // Data for the pin currently in modal
  const [fetchingPins, setFetchingPins] = useState(false); // For loading state when fetching pins
  const [containerDimensions, setContainerDimensions] = useState({});

  //router instance
  const router = useRouter();
  const searchParams = useSearchParams();

  //Refs
  const containerRef = useRef(null);

  //Effects
  //Fetches Data and sets in local state
  //Adds an Event listener for resizing
  useEffect(() => {
    fetchAndSetPins(setPins, setFetchingPins);
    function updateSize() {
      let clearTimer;
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions(rect);
      return function () {
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerDimensions(rect);
          }
        }, 500);
      };
    }
    //Debounced handler
    const debouncedUpdateSize = updateSize();
    window.addEventListener('resize', debouncedUpdateSize);

    return () => window.removeEventListener('resize', debouncedUpdateSize);
  }, []);

  //Checks for query params in URL
  //if there is a pin ID then that specific modal is mounted
  useEffect(() => {
    const pinIdFromUrl = searchParams.get('pinId');
    if (pinIdFromUrl) {
      const pinToOpen = pins.get(Number(pinIdFromUrl));
      if (pinToOpen) {
        setModalPinData(pinToOpen);
        setShowModal(true);
      }
    } else {
      setTimeout(() => {
        setModalPinData(null);
      }, 100);
      setShowModal(false);
    }
  }, [searchParams, pins]);

  // Appends Pin Id to URL
  const handlePinClick = useCallback(
    (pinId) => {
      const pinExists = pins.has(pinId);
      if (pinExists) {
        // Update URL with pinId for shareability
        router.push(`/?pinId=${pinId}`);
      }
    },
    [pins, router]
  );

  // clear URL pinId if present and Closes Modal
  function handleCloseModal() {
    setTimeout(() => {
      setModalPinData(null);
    }, 100);
    setShowModal(false);
    const pinIdFromUrl = searchParams.get('pinId');
    if (pinIdFromUrl) {
      router.push('/');
    }
  }

  // Handler for clicks anywhere on the page to create a new pin
  const handlePageClick = useCallback(
    (e) => {
      if (showModal) return; // Don't open modal if another is open

      // Get click coordinates relative to the viewport
      const x = e.clientX;
      const y = e.clientY;

      setModalPinData({ x, y, feedback: '' });
      setShowModal(true);
    },
    [showModal]
  );

  //Function to create an array of React Nodes from pins Map
  function renderPins() {
    const pinsArray = [];
    pins.forEach((pin) => {
      return pinsArray.push(
        <MemoizedPin
          key={pin.id}
          id={pin.id}
          x={`${pin?.x}%`}
          y={`${pin?.y}%`}
          onClick={handlePinClick}
        />
      );
    });
    return pinsArray;
  }

  return (
    <div className={styles.page}>
      <Header
        handleDeleteAllClick={() => handleClearAll(setPins, setFetchingPins)}
      />
      <main
        className={styles.main}
        onClick={handlePageClick}
        ref={containerRef}
      >
        {/* Render all fetched pins */}
        {renderPins()}
        {/* Feedback Modal */}
        <FeedbackModal
          pinData={modalPinData}
          onClose={handleCloseModal}
          open={showModal && modalPinData}
          updatePins={setPins}
          containerDimensions={containerDimensions}
        />
      </main>
      <footer className={styles.footer}>
        <Typography color="primary">
          Click anywhere on the page to leave feedback!
        </Typography>
      </footer>
      {/* Loader Overlay */}
      <LoadingOverlay open={fetchingPins} />
    </div>
  );
}
