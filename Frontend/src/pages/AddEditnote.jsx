import React, { useState } from "react";
import Taginput from "../components/Taginput";
import { MdClose } from "react-icons/md";

const AddEditnote = ({ notedata, type, onclose }) => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, seterror] = useState(null);
  const addNewNote = () => {};
  const editNote =async () => {};

  const handleaddnote =async () => {
    if (!title) {
      seterror("Please enter a title");
      return;
    }
    if (!content) {
      seterror("Please enter a content");
      return;
    }

    seterror("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 hover:text-white duration-100 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-black"
        onClick={onclose}
      >
        <MdClose />
      </button>{" "}
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          placeholder="Go to gym at 5"
          value={title}
          onChange={({ target }) => settitle(target.value)}
          className="input-field text-2xl text-salt-900 outline-none"
        />
        <div className="flex flex-col  gap-2 mt-4">
          <label className="input-label">CONTENT</label>
          <textarea
            type="text"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={({ target }) => setcontent(target.value)}
            className="input-field bg-slate-300 text-sm text-slate-950 p-2 rounded outline-none"
          />
          <div className="mt-3">
            <label className="input-label">TAGS</label>
            <Taginput tags={tags} setTags={setTags} />
          </div>
        </div>
        {error && <p className="text-red-500 pt-4">{error}</p>}
        <div className="btn-primary font-medium mt-5 p-3 mb-0">
          <button className="btn-primary" onClick={handleaddnote}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditnote;
