import { useEffect, useState } from 'react';

export default function DataFetching() {
  const baseUrl = 'http://localhost:5000';
  const [allGuests, setAllGuests] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${baseUrl}/`);
        setAllGuests(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
    fetchUserData();
  }, []);

  if (allGuests === undefined) {
    return 'Loading';
  }

  return (
    <div>
      <h1>Guest List</h1>
    </div>
  );
}
