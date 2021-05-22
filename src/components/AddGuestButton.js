import { useEffect } from 'react';

export default function AddGuestButton({
  firstName,
  lastName,
  setCreatedGuest,
}) {
  useEffect(() => {
    async function addGuest() {
      const baseUrl = 'http://localhost:5000';
      try {
        const response = await fetch(`${baseUrl}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
          }),
        });
        setCreatedGuest(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
    addGuest();
  }, []);

  return <button onClick={() => addGuest()}>Add Guest</button>;
}
