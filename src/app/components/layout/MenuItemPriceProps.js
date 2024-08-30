import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import { useState } from "react";

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addSize = () => {
    setProps((oldprops) => {
      return [...oldprops, { name: "", price: 0 }];
    });
  };

  const editSize = (ev, index, prop) => {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeSize = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index != indexToRemove));
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button className="inline-flex p-1 border-0 justify-start" type="button" onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>{props?.length}</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={size.name}
                  placeholder="Size name"
                  onChange={(ev) => {
                    editSize(ev, index, "name");
                  }}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  value={size.price}
                  placeholder="Price"
                  onChange={(ev) => {
                    editSize(ev, index, "price");
                  }}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addSize}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
