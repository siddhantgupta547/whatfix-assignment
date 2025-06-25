import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function FeedbackModal({ pinData, onClose, onSave, open }) {
  const [feedbackText, setFeedbackText] = useState(pinData?.feedback || '');
  const [savingData, setSavingData] = useState(false);
  const isNewPin = !pinData || !pinData.id;

  useEffect(() => {
    setFeedbackText(pinData?.feedback || '');
  }, [pinData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingData(true);
    try {
      if (!isNewPin) {
        await fetch('/api/pins', {
          method: 'Put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: pinData?.id,
            x: pinData?.x,
            y: pinData?.y,
            feedback: feedbackText,
          }),
        });
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
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
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder={'Enter your feedback here...'}
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
          disabled={savingData}
        >
          {isNewPin ? 'Save Feedback' : 'Update Feedback'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
