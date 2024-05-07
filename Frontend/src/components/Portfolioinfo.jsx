import React from "react";
import { getinitials } from "../utils/helper";
const Portfolioinfo = ({ onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 items-center justify-center flex rounded-full text-slate-950 font-medium bg-slate-100">
        {getinitials("john williams")}
      </div>
      <div className="">
        <p className="text-sm font-medium">willam</p>
        <button className="text-sm text-slate-600 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Portfolioinfo;
