import { useState } from "react";
import UserTest from "./User";
import { useDispatch,useSelector } from "react-redux";
import {dataActions} from "../reduxStore/redux-fecht/data-action";


const UserList = (props) => {
  const dispatch = useDispatch()
  const list = props.list
  const reqStatus = useSelector((state) => state.fetchData.status);
    
  // checking list existence
  const validdd = list.length > 0 && reqStatus==='success'
  const notValiddd = list.length < 1 && reqStatus==='success'
  const notFinished = list.length < 1 && reqStatus==='pending'
  const notYetFinished = list.length > 0 && reqStatus==='pending'

  // sorting
  const [sortingAsc, setSortingAsc] = useState(true);
  const sortHandler = ()=>{
  setSortingAsc((prevState)=> !prevState)
  dispatch(dataActions.sortList(sortingAsc));
  }

  const popupHandler=()=>{
    props.popupHandler()
  }

  return (
    <>
    {validdd && <>
      <button className="btn btn-outline-secondary" onClick={sortHandler}>
          Sort by {sortingAsc ? "Ascending" : "Descending"}
        </button>
    <table className="table">
     <thead className="thead-light">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">City</th>
      <th scope="col">Email</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {list.map((data) => {
        return <UserTest key={data.id} id={data.id} name={data.name}  username={data.username} city={data.address?.city} email={data.email} popupHandler={popupHandler}/>;
      })}
  </tbody>
  </table></>}
  {notValiddd && <h4 className="alert alert-secondary " role="alert">There are no users!</h4> }
  {notFinished && <h4 className="alert alert-success ">Loading the data</h4>}
  {notYetFinished && <h4>Pending NOT null</h4>}
    </>
  );
};

export default UserList;
