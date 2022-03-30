import React from "react";
import { dataActions } from "../reduxStore/redux-fecht/data-action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserTest = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const popupHandler = () => {
    dispatch(dataActions.bringId(props.id));
    props.popupHandler()
  };

  return (
    <>
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.name}</td>
      <td>{props.username}</td>
      <td>{props.city}</td>
      <td>{props.email}</td>
      <td><button className="btn btn-warning" onClick={() => {
          navigate(`/data/${props.id}`);
        }}>EDIT</button></td>
      <td><button className="btn btn-danger" onClick={popupHandler}>DELETE</button></td>
    </tr>
    </>
  );
};

export default UserTest;
