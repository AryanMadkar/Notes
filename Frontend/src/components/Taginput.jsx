import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
const Taginput = ({ tags, setTags }) => {
  const [inputValue, setinputValues] = useState("");
  const handleinputchange = (e) => {
    setinputValues(e.target.value);
  };

  const addnewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags,inputValue.trim()]);
      setinputValues("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addnewTag();
    }
  };
  const handleremovetag = (tagtoremove) => {
    setTags(tags.filter((tag) => tag !== tagtoremove));
  };
  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center rounded-xl p-2 gap-2 text-sm text-salte-900 bg-slate-300 py-1">
              #{tag}
              <button
                onClick={() => {
                  handleremovetag(tag);
                }}
              >
                <MdClose className="text-2xl text-blue-500 bg-transparent cursor-pointer  hover:text-white" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className=" text-sm border px-3 py-2 rounded-lg"
          placeholder="Add tags"
          onChange={handleinputchange}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="w-8 h-8 items-center flex justify-center rounded border hover:bg-black "
          onClick={() => {
            addnewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-500 bg-transparent cursor-pointer  hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Taginput;
