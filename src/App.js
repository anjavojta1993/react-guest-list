import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
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

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createdGuest, setCreatedGuest] = useState('');
  const baseUrl = 'http://localhost:5000';
  const [allGuests, setAllGuests] = useState([]);
  const [updatedGuest, setUpdatedGuest] = useState(false);

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
      setCreatedGuest(await response.json());
    }
    const handleAddGuest = () => {
      setFirstName(firstName);
      setLastName(lastName);
      addGuest();
    };

     // function to update guest attending

     async function updateGuestInfo()
     const response = await fetch(`${baseUrl}/1`, {
     method: 'PATCH',
     headers: {
         'Content-Type': 'application/json',
     },
     body: JSON.stringify({ attending: true }),
     });
     setUpdatedGuest(await response.json());

  return (
    <div
      style={{
        background:
          'linear-gradient(125deg, #9468c5 0, #6e92cd 50%, #9adfd1 100%)',
      }}
    >
      <Header />
      <GuestInput
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleAddGuest={handleAddGuest}
      />
      <form>
      <h1>Guest List</h1>
      <ul>
        {allGuests.map((guest) => {
          return (
            <li key={guest.id}>
              (`${guest.firstName} ${guest.lastName}`
              <form action="#" css={toggleButton}>
                <div className="switch">
                  <input
                    id="switch-1"
                    type="checkbox"
                    className="switch-input"
                    checked={updatedGuest}
                    onChange={(e) => {
                      setUpdatedGuest(e.currentTarget.checked);
                    }}
                  />
                  <label htmlFor="switch-1" className="switch-label">
                    Switch
                  </label>
                </div>
              </form>
            </li>
          );
        })}
      </ul>
      </form>
    </div>
  );
}

export default App;
