import { useState, createRef } from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";

const DropDownItem = ({ link, label, faClass }) => {
  return (
    <Link
      href={link}
      className={
        "text-lg py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-500 hover:text-orange-500"
      }
    >
      <i className={`fa ${faClass}`}></i> {label}
    </Link>
  );
};

const PopOverMenu = ({ label, faIconClass, dropDownItems, position }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const popOverPlacement = position == "left" ? "bottom-start" : "bottom-end";
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: popOverPlacement,
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const DropDownItems = () => {
    return dropDownItems.map(({ link, label, faClass }) => {
      return <DropDownItem link={link} label={label} faClass={faClass} />;
    });
  };

  return (
    <div>
      <a
        className="hover:text-orange-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <button
          className="cursor-pointer text-2xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
          type="button"
        >
          <i className={`fas ${faIconClass}`}></i>
        </button>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          `bg-white text-base z-50 float-${position} py-2 list-none text-${position} rounded shadow-lg min-w-32`
        }
      >
        <span
          className={
            "text-lg pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          {label}
        </span>
        <DropDownItems />
      </div>
    </div>
  );
};

export default PopOverMenu;
