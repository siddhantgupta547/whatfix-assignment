//Function to fetch existing pins
export async function fetchPinsData() {
  try {
    const res = await fetch('/api/pins');
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//Function to delete existing pins
export async function handleDeleteAllPins() {
  try {
    const res = await fetch('/api/pins', { method: 'Delete' });
    const data = await res.json();
    console.debug(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//Function to save new pin
export async function savePin(x, y, feedback) {
  try {
    const res = await fetch('/api/pins', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y, feedback }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//Function to update existing pin
export async function updatePin(id, x, y, feedback) {
  try {
    const res = await fetch('/api/pins', {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, x, y, feedback }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
