import React, { useEffect, useState } from "react";
import NAvbar from "../components/NAvbar";
import Notecard from "../components/Notecard";
import { MdAdd } from "react-icons/md";
import AddEditnote from "./AddEditnote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../../../Backend/utils/axiosinstance";
const Home = () => {
  const [openAddeditmodel, setopenaddeditmodel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const[userinfo, setuserinfo]=useState(null)
  const navigate = useNavigate()
  const getuserinfo =  async()=>{
    try{
      const response = await axiosinstance.get("/get-user")
      if (response.data && response.data.user.user) {
        setuserinfo(response.data.user.user);
      }
    }catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate("/login")
      }
    }
  }
  useEffect(()=>{
    getuserinfo();
    return()=>{}
  },[])

  return (
    <div>
      <div>
        <NAvbar />
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Notecard
              title="Meeting on 7th april "
              date="3rd Apr 2024"
              content={"Meeting on 7th april Meeting on 7th april "}
              tags={"#meeting"}
              ispinned={true}
              onedit={() => {}}
              ondelete={() => {}}
              onpinnote={() => {}}
            />
          </div>
        </div>
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 absolute right-10 bottom-10"
          onClick={() => {
            setopenaddeditmodel({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        <Modal
          isOpen={openAddeditmodel.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: { backgroundColor: "rgba(0,0,0,0.2" },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
          {" "}
          <AddEditnote 
          type={openAddeditmodel.type}
          notedata={openAddeditmodel.data}
          onclose={()=>{
            setopenaddeditmodel({ isShown: false, type: "add", data: null });
          }} />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
