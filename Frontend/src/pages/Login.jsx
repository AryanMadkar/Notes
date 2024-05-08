import React, { useState } from "react";
import NAvbar from "../components/NAvbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Passwordinput from "../components/Passwordinput";
import { validEmail } from "../utils/helper";
import axiosinstance from "../../../Backend/utils/axiosinstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }
    setError("");

    try {
      const response = await axiosinstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashbord");
      }
    } catch (error) {
      if (
        error.response.data &&
        error.response.data.message &&
        error.response
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occured");
      }
    }
  };
  return (
    <div>
      <NAvbar />
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded-xl bg-gray-900 text-white drop-shadow-lg  px-7 py-10">
          {" "}
          <form onSubmit={handlelogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-box"
              placeholder="Email"
            />
            <Passwordinput
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {error && <p className="text-red-500 pb-1 text-sm">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Haven't register yet<Link to={"/signup"}>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
