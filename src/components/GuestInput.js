/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStylesContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const buttonStyles = css`
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
    <form className="Inputs" onSubmit={(e) => e.preventDefault()}>
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
      <div css={buttonStylesContainer}>
        <button style={buttonStyles} type="submit" onClick={addGuest}>
          Add Guest
        </button>
      </div>
    </form>
  );
}
