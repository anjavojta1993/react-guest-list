import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import GuestInput from './components/GuestInput';
import Header from './components/Header';

const toggleButton = css`
  .switch {
    position: relative;
    display: inline-block;
  }
  .switch-input {
    display: none;
  }
  .switch-label {
    display: block;
    width: 48px;
    height: 24px;
    text-indent: -150%;
    clip: rect(0 0 0 0);
    color: transparent;
    user-select: none;
  }
  .switch-label::before,
  .switch-label::after {
    content: '';
    display: block;
    position: absolute;
    cursor: pointer;
  }
  .switch-label::before {
    width: 100%;
    height: 100%;
    background-color: #dedede;
    border-radius: 9999em;
    -webkit-transition: background-color 0.25s ease;
    transition: background-color 0.25s ease;
  }
  .switch-label::after {
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
    -webkit-transition: left 0.25s ease;
    transition: left 0.25s ease;
  }
  .switch-input:checked + .switch-label::before {
    background-color: #89c12d;
  }
  .switch-input:checked + .switch-label::after {
    left: 24px;
  }
`;

const deleteStyles = css`
  cursor: pointer;

  :hover {
    color: #303030;
  }
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; ;
`;

const guestInputStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; ;
`;

const headerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; ;
`;

const guestOutputStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; ;
`;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:5000';
  const [allGuests, setAllGuests] = useState([]);

  // fetch user Data

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

  // return loading on the first load when no guest entry yet

  if (allGuests === []) {
    return (
      <div>
        <iframe
          title="Loading gif"
          src="https://giphy.com/embed/feN0YJbVs0fwA"
          width="480"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        />
      </div>
    );
  }

  // function to add guest

  async function addGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
  }
  const handleAddGuest = () => {
    setFirstName(firstName);
    setLastName(lastName);
    addGuest();
  };

  // function to update guest attending

  async function updateGuestInfo(attending, id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attending }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);

    const updateAttending = () => {
      allGuests.map((guest) => guest.id);
    };
    // replace updatedGuest.attending in allGuests
    // step 1: look for the guest with id that was replaced in allGuests
    // step 2: replace value of attending with current value of attending
    // step 3: setAllGuests to [...allGuests]
  }

  const handleChangeAttendance = (event, id) => {
    updateGuestInfo(event.currentTarget.checked, id);

    console.log(event.currentTarget.checked);
  };

  // function to delete guest

  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    const deletedGuest = await response.json();
    console.log(deletedGuest);

    const filterGuests = () => {
      setAllGuests(allGuests.filter(() => deletedGuest.id !== id));
    };
  }

  /* const handleDeleteGuest = (id, guest) => {
    deleteGuest(id, guest);
  }; ALSO WORKS WITHOUT THIS CODE, DON't UNDERSTAND WHY THO */

  return (
    <div
      style={{
        background:
          'linear-gradient(125deg, #9468c5 0, #6e92cd 50%, #9adfd1 100%)',
        width: '100vw',
      }}
    >
      <Header css={logoStyles} />
      <GuestInput
        css={guestInputStyles}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleAddGuest={handleAddGuest}
      />
      <h1 css={headerStyles}>Guest List</h1>
      <div className="guestOutput" css={guestOutputStyles}>
        <ul>
          {allGuests.map((guest) => {
            return (
              <li key={guest.id}>
                {guest.firstName} {guest.lastName}
                <span css={toggleButton}>
                  <div className="switch">
                    <input
                      id={`switch-${guest.id}`}
                      type="checkbox"
                      className="switch-input"
                      checked={guest.attending}
                      onChange={(event) => {
                        handleChangeAttendance(event, guest.id);
                      }}
                    />
                    <label
                      className="switch-label"
                      htmlFor={`switch-${guest.id}`}
                    >
                      Switch
                    </label>
                  </div>
                </span>
                <FaTimes
                  css={deleteStyles}
                  onClick={() => deleteGuest(guest.id)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
