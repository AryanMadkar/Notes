import React, { useState } from "react";
import NAvbar from "../components/NAvbar";
import { Link } from "react-router-dom";
import Passwordinput from "../components/Passwordinput";
import { validEmail } from "../utils/helper";


const Signup = () => {
  const [name,setname] =useState("");
  const [email, setEmail] = useState("");
  const [password, setpasswor] = useState("");
  const [error, setError] = useState(null);

  const handlesignup = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter a name")
      return;
    }
    if (!validEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }
    setError("");

    
  };
  return (
    <div>
      <NAvbar />
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded-xl bg-gray-900 text-white drop-shadow-lg  px-7 py-10">
          {" "}
          <form onSubmit={handlesignup}>
            <h4 className="text-2xl mb-7">Signup</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="input-box"
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
              placeholder="Email"
            />
            <Passwordinput
              value={password}
              onChange={(e) => setpasswor(e.target.value)}
            />
            {error && <p className="text-red-500 pb-1 text-sm">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="text-sm  text-center mt-4">
              Already a member<Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup