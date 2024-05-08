import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Passwordinput = ({ value, onChange, placeholder }) => {
  const [isShowpassword, setisShowpassword] = useState(false);
  const toggleshowpassword = () => {
    setisShowpassword(!isShowpassword);
  };
  return (
    <div className="flex items-center bg-transparent border px-5 rounded-xl mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowpassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded-xl outline-none"
      ></input>
      {isShowpassword ? (
        <FaRegEye
          onClick={() => toggleshowpassword()}
          className="text-blue-500 cursor-pointer"
          size={20}
        />
      ) : (
        <FaRegEyeSlash
          onClick={() => toggleshowpassword()}
          className="text-gray-400 cursor-pointer"
          size={20}
        />
      )}
    </div>
  );
};

export default Passwordinput;
