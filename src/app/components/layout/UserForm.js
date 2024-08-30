"use client";

import EditableImage from "../layout/EditableImage";
import { useProfile } from "../UseProfile";
import { useState } from "react";
import AddressInputs from "./AddressInputs";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  return (
    <div className="md:flex gap-4 ">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>

      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            admin,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user?.email}
          placeholder="Email"
        />
        <AddressInputs
          addressProps={{
            phone,
            streetAddress,
            postalCode,
            city,
            country,
          }}
          setAddressProp={(key, value) => {
            if (key === "phone") {
              setPhone(value);
            } else if (key === "streetAddress") {
              setStreetAddress(value);
            } else if (key === "postalCode") {
              setPostalCode(value);
            } else if (key === "city") {
              setCity(value);
            } else if (key === "country") {
              setCountry(value);
            }
          }}
        />
        {loggedInUserData?.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="isAdmin"
            >
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
