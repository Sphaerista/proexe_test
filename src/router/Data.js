import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockData } from "../reduxStore/redux-fecht/data-slice";
import UserList from "../users-component/UserList";
import Popup from "../users-component/Popup";
import { useNavigate } from "react-router-dom";

// avoid recalling data
let value = true;

const Data = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list  = useSelector(state => state.fetchData.users)

  const [showPopup,setShowPopup] = useState(false)
  
  useEffect(() => {
    if (value) {
      dispatch(fetchMockData());
      value = false;
    }
    return;
  }, [dispatch]);

  const popupHandler =()=> {
    setShowPopup((prevState)=> !prevState)
  }

  return (
    <>
      <div className="container border mt-2">
    <div className="d-flex justify-content-between mt-2 mb-2">
      <h4>User List</h4>
      <button className="btn btn-primary pl-5 pr-5"
        onClick={() => {navigate("/new")}}>Add new</button></div>
      
      <UserList list={list} popupHandler={popupHandler} />
    </div>
    {showPopup && <Popup showPopup={showPopup} popupHandler={popupHandler}/>} 
    </>
  );
};

export default Data;
