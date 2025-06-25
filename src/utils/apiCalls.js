//Function to fetch existing pins
export async function fetchPinsData() {
  const res = await fetch('/api/pins');
  const data = await res.json();
  return data;
}

//Function to delete existing pins
export async function handleDeleteAllPins() {
  const res = await fetch('/api/pins', { method: 'Delete' });
  const data = await res.json();
  console.debug(data);
  return data;
}

//Function to save new pin
export async function savePin(x, y, feedback) {
  const res = await fetch('/api/pins', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y, feedback }),
  });
  const data = await res.json();
  return data;
}

//Function to update existing pin
export async function updatePin(id, x, y, feedback) {
  const res = await fetch('/api/pins', {
    method: 'Put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, x, y, feedback }),
  });
  const data = await res.json();
  return data;
}
