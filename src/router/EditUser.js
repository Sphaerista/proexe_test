import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../reduxStore/redux-fecht/data-action";
import { useNavigate } from "react-router-dom";

const isEmpty = (value) => value.trim() === "";
const isLetters = /^[A-Za-z ]+$/;
const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidUsername = /^[A-Za-z0-9_.-]+$/;

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams().id;
  const users = useSelector((state) => state.fetchData.users);
  const oneUser = users.find((user) => {
    return user.id.toString() === params;
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    email: true,
    username: true
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const userRef = useRef();
  const cityRef = useRef();



  const submitHandler = (e) => {
    e.preventDefault();

    // text validity
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredUsername = userRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName) && isLetters.test(enteredName);
    const enteredEmailIsValid = isValidEmail.test(enteredEmail);
    const enteredUsernameIsValid = isValidUsername.test(enteredUsername);
    setFormInputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      username: enteredUsernameIsValid
    });
    const formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredUsernameIsValid;
    if (!formIsValid) {return;}

    const newName = nameRef.current.value;
    const newEmail = emailRef.current.value;
    const newUsername = userRef.current.value;
    const newCity = cityRef.current.value;
    dispatch(
      dataActions.editUser({ email: newEmail, name: newName, username:newUsername, id: oneUser.id, city:newCity})
    );
    navigate("/");
  };
  const cancelHandler=(e)=>{
    e.preventDefault();
    navigate("/");
  }

  // dynamic style classes
  const nameStyles= `col-sm-10 form-control ${!formInputsValidity.name && 'inputInvalid'}`
  const emailStyles= `col-sm-10 form-control ${!formInputsValidity.email && 'inputInvalid'}`
  const usernameStyles= `col-sm-10 form-control ${!formInputsValidity.username && 'inputInvalid'}`

  return (
    <>
    <div className="container border mt-2">
    <h4 className="mt-2 mb-2">
      Edit user
    </h4>
    <form onSubmit={submitHandler} noValidate>
    <div className="form-group d-flex flex-wrap">
      <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
      <input className={nameStyles} type="text"  id="inputName" defaultValue={oneUser?.name} ref={nameRef} required/>
      <div className="col-sm-2"></div>
    <div className="errorText">{!formInputsValidity.name && 'Name is required'}</div>
    </div>
    <div className="form-group d-flex flex-wrap">
      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
      <input className={emailStyles} type="email"  id="inputEmail" defaultValue={oneUser?.email}  ref={emailRef} required/>
      <div className="col-sm-2"></div>
      <div className="errorText">{!formInputsValidity.email && 'Valid email is required'}</div>
    </div>
    <div className="form-group d-flex flex-wrap">
      <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username</label>
      <input className={usernameStyles} type="text"  id="inputUsername" defaultValue={oneUser?.username}  ref={userRef} />
      <div className="col-sm-2"></div>
      <div className="errorText">{!formInputsValidity.username && 'Invalid username. No spaces and special characters allowed'}</div>
    </div>
    <div className="form-group d-flex flex-wrap">
      <label htmlFor="inputCity" className="col-sm-2 col-form-label">City</label>
      <input className="col-sm-10 form-control" type="text"  id="inputCity"  defaultValue={oneUser?.address?.city}  ref={cityRef}/>
      <div className="errorText"></div>
    </div>
    <div className="d-flex justify-content-between mt-2 mb-2">
    <button onClick={cancelHandler} type="button" className="btn btn-danger pl-5 pr-5">Cancel</button>
    <button type="submit" className="btn btn-primary pl-5 pr-5">Submit</button>
    </div>
  </form>
  </div>
  </>
  );
};

export default EditUser;
