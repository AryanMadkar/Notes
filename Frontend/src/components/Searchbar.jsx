import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const Searchbar = ({ value, onchange, handlesearch, onclearsearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="search notes"
        className="w-full  text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onchange}
      ></input>
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 bg-transparent cursor-pointer mr-3 hover:text-black"
          onClick={onclearsearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-xs text-slate-500 bg-transparent cursor-pointer hover:text-black"
        onClick={handlesearch}
      />
    </div>
  );
};

export default Searchbar;
