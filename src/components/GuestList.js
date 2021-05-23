/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

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

export default function DataFetching() {
  const baseUrl = 'http://localhost:5000';
  const [allGuests, setAllGuests] = useState([]);
  const [isAttending, setIsAttending] = useState(false);

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

  if (!allGuests) {
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

  return (
    <div>
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
                    checked={isAttending}
                    onChange={(e) => {
                      setIsAttending(e.currentTarget.checked);
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
    </div>
  );
}
