/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const inputContainer = css`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const inputStyles = css`
  padding: 5px;
  font-family: 'spartan';
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;
`;

const buttonStylesContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const buttonStyles = css`
  font-family: 'spartan';
  padding: 10px;
  border-radius: 5px;
  background-color: transparent;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GuestInput({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  addGuest,
}) {
  return (
    <div css={inputContainer}>
      <input
        css={inputStyles}
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      <br />
      <input
        css={inputStyles}
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      />
      <br />
      <div css={buttonStylesContainer}>
        <button css={buttonStyles} type="submit" onClick={addGuest}>
          Add Guest
        </button>
      </div>
    </div>
  );
}
