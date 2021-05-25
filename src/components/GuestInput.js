export default function GuestInput({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  handleAddGuest,
}) {
  return (
    <form className="Inputs">
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
      <button type="submit" onClick={handleAddGuest}>
        Add Guest
      </button>
    </form>
  );
}
