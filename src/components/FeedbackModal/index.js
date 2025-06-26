import { savePin, updatePin } from '@/utils/apiCalls';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function FeedbackModal({
  pinData,
  onClose,
  open,
  updatePins,
  containerDimensions,
}) {
  //State Variables
  const [feedbackText, setFeedbackText] = useState(pinData?.feedback || '');
  const [savingData, setSavingData] = useState(false);

  //Variable to set if it's a new pin
  const isNewPin = !Boolean(pinData?.id);

  //Effects
  //Sets Feeback in local variable on mount
  useEffect(() => {
    setFeedbackText(pinData?.feedback || '');
  }, [pinData]);

  //Handles Feedback submission
  //if its a new pin makes a post request
  //for existing pin with ID makes a put request
  const handleSubmit = async (event) => {
    setSavingData(true);
    try {
      const requestBody = {
        x: pinData?.x,
        y: pinData?.y,
        feedback: feedbackText,
      };
      if (!isNewPin) {
        requestBody['id'] = pinData?.id;
        await updatePin(
          requestBody?.id,
          requestBody?.x,
          requestBody?.y,
          requestBody?.feedback
        );
        updatePins((prev) => prev.set(pinData?.id, requestBody));
      } else {
        const x =
          ((pinData?.x - containerDimensions?.left) /
            containerDimensions?.width) *
          100;
        const y =
          ((pinData?.y - containerDimensions?.top) /
            containerDimensions?.height) *
          100;
        const res = await savePin(x, y, feedbackText);
        updatePins((prev) => {
          const updatedPins = new Map(prev);
          updatedPins.set(res?.id, res);
          return updatedPins;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      setSavingData(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          minWidth: 420,
          padding: 1,
        },
      }}
    >
      <DialogTitle color="primary">
        {isNewPin ? 'Add New Feedback' : 'View/Update Feedback'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          <strong>Coordinates</strong>: X: {pinData?.x}, Y: {pinData?.y}
        </DialogContentText>
        <br />
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          value={feedbackText}
          margin="dense"
          label="Your feedback"
          required
          onChange={(event) => setFeedbackText(event.target.value)}
          placeholder={'Enter your feedback here...'}
          type="text"
          maxLength="256"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          type="button"
          onClick={onClose}
          color="error"
          disabled={savingData}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="success"
          onClick={handleSubmit}
          disabled={savingData || pinData?.feedback === feedbackText.trim()}
        >
          {isNewPin ? 'Save Feedback' : 'Update Feedback'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
