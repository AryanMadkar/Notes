import React, { useState } from "react";
import Portfolioinfo from "./Portfolioinfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";

const NAvbar = () => {
  const [searchquery,setsearchquery]=useState("")
  const navigate = useNavigate
  const onlogout=()=>{
    navigate("/login")
  }
  const handlesearch =()=>{

  }
  const onclearsearch =()=>{
    setsearchquery("")
  }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <Searchbar value={searchquery}
        onchange={({target})=>{
          setsearchquery(target.value)
        }}
        handlesearch={handlesearch}
        onclearsearch={onclearsearch}
      />
      <Portfolioinfo onLogout={onlogout}/>

    </div>
  );
};

export default NAvbar;
