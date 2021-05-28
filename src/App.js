import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import GuestInput from './components/GuestInput';
import Header from './components/Header';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import spartan from './fonts/spartan.ttf';
import loadingGif from './images/loading.gif';

const toggleButton = css`
  .switch {
    position: relative;
    display: inline-block;
    margin: 10px;
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
    background-color: #9468c5;
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

const backgroundStyles = css`
  margin: 0;
  width: 100%;
  min-height: 100vh;
`;

const listStyles = css`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  z-index: 100;
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const loadingGifStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const headerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const guestInputStylesContainer = css`
  font-family: 'spartan';
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const guestInputStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; ;
`;

const titleStyles = css`
  font-family: 'spartan';
  font-size: 36px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  z-index: 100;
`;

const titleStylesContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const listStylesContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  z-index: 100;
`;

const guestNameStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const handleChangeInputs = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const guestOutputStylesContainer = (guestLength) =>
  css`
    font-family: 'spartan';
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    width: 400px;
    opacity: ${guestLength ? '1' : '0'};
    box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  `;

const listItemStyles = css`
  margin: 0px;
  padding: 0px;
  z-index: 100;
`;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const baseUrl = 'http://localhost:5000';
  const [allGuests, setAllGuests] = useState();

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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!allGuests) {
    return (
      <div>
        <img css={loadingGifStyles} src={loadingGif} alt="loading" />
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
    const updatedGuests = [...allGuests, createdGuest];
    setAllGuests(updatedGuests);
  }
  // function to update guest attending

  async function updateGuestInfo(id, attending) {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attending }),
    });

    // function to update attending toggle frontend
  }
  const handleChangeAttendance = (id, attending) => {
    const copyUpdatedGuests = [...allGuests];
    const guestFound = copyUpdatedGuests.find((guest) => guest.id === id);
    guestFound.attending = attending;
    console.log(attending);
    updateGuestInfo(guestFound.id, guestFound.attending);
    setAllGuests(copyUpdatedGuests);
  };

  // function to delete guest

  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    const deletedGuest = await response.json();

    // update guestList on the frontend
    const filteredGuests = allGuests.filter(
      (guest) => guest.id !== deletedGuest.id,
    );
    setAllGuests(filteredGuests);
  }

  /* const handleDeleteGuest = (id, guest) => {
    deleteGuest(id, guest);
  }; ALSO WORKS WITHOUT THIS CODE, DON't UNDERSTAND WHY THO */

  return (
    <div
      css={backgroundStyles}
      style={{
        background:
          'linear-gradient(125deg, #9468c5 0, #6e92cd 50%, #9adfd1 100%)',
      }}
    >
      <div css={headerStyles}>
        <Header css={logoStyles} />
      </div>
      <div css={guestInputStylesContainer}>
        <GuestInput
          css={guestInputStyles}
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          addGuest={addGuest}
        />
      </div>
      <div
        className="guestOutput"
        css={guestOutputStylesContainer(allGuests.length)}
      >
        <div css={titleStylesContainer}>
          <h1 css={titleStyles}>Guest List</h1>
        </div>
        <div css={listStylesContainer}>
          <ul css={listStyles}>
            {allGuests.map((guest) => {
              return (
                <li css={listItemStyles} key={guest.id}>
                  <div css={guestNameStyles}>
                    {guest.firstName} {guest.lastName}
                    <div css={handleChangeInputs}>
                      <div css={toggleButton}>
                        <div className="switch">
                          <input
                            id={`switch-${guest.id}`}
                            type="checkbox"
                            className="switch-input"
                            checked={guest.attending}
                            onChange={(event) => {
                              handleChangeAttendance(
                                guest.id,
                                event.currentTarget.checked,
                              );
                            }}
                          />
                          <label
                            className="switch-label"
                            htmlFor={`switch-${guest.id}`}
                          >
                            Switch
                          </label>
                        </div>
                      </div>
                      <FaTimes
                        css={deleteStyles}
                        onClick={() => deleteGuest(guest.id)}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
