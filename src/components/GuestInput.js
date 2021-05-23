/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';

export default function GuestInput({
  firstName,
  lastName,
  setFirstName,
  setLastName,
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

    /* const handleAddGuest = () => {
      setFirstName(firstName);
      setLastName(lastName);
      addGuest();
    }; */
  }, [firstName, lastName, setCreatedGuest, setFirstName, setLastName]);

  return (
    <div className="Inputs">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      />
      <br />
      {/* <button onClick={handleAddGuest}>Add Guest</button>; */}
    </div>
  );
}
