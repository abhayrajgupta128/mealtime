const AddressInputs = ({ addressProps, setAddressProp, disabled = false }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        value={phone || ''} 
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
        placeholder="Phone number"
      />
      <label>Street address</label>
      <input
        disabled={disabled}
        type="text"
        value={streetAddress || ''}
        onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
        placeholder="Street address"
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            type="text"
            value={postalCode || ''}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
            placeholder="Postal code"
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            value={city || ''}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
            placeholder="City"
          />
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        value={country || ''}
        onChange={(ev) => setAddressProp("country", ev.target.value)}
        placeholder="Country"
      />
    </>
  );
};

export default AddressInputs;
