import './App.css';
import { useState } from 'react';
import AddGuestButton from './components/AddGuestButton';
import DataFetching from './components/DataFetching';
import GuestInput from './components/GuestInput';
import Header from './components/Header';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createdGuest, setCreatedGuest] = useState('');

  return (
    <div
      style={{
        background:
          'linear-gradient(125deg, #9468c5 0, #6e92cd 50%, #9adfd1 100%)',
      }}
    >
      <Header />
      <DataFetching />
      <GuestInput
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
      />
      <AddGuestButton
        createdGuest={createdGuest}
        setCreatedGuest={setCreatedGuest}
      />
    </div>
  );
}

export default App;
