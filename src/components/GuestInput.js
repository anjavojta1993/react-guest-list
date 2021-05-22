export default function GuestInput({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}) {
  return (
    <div classNamr="Inputs">
      <label htmlFor="First name">
        First name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
      </label>
      <br />

      <label htmlFor="Last name">
        Last name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
      </label>
      <br />
    </div>
  );
}
