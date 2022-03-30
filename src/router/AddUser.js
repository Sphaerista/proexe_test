import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../reduxStore/redux-fecht/data-action";

const isEmpty = (value) => value.trim() === "";
const isLetters = /^[A-Za-z ]+$/;
const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    email: true,
    username: true
  });

  
  const nameRef = useRef();
  const emailRef = useRef();

  const dataFromMoch = useSelector((state) => state.fetchData.users);

  // create new ID 
  let arrayForNewId=[0];
  dataFromMoch.forEach(item => {
    arrayForNewId.push(item.id)
  });
  let candidateId=Math.max(...arrayForNewId);

  const submitHandler = (e) => {
    e.preventDefault();

    // text validity
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName) && isLetters.test(enteredName);
    const enteredEmailIsValid = isValidEmail.test(enteredEmail);
    setFormInputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
    });
    const formIsValid = enteredNameIsValid && enteredEmailIsValid;
    if (!formIsValid) {return;}

    dispatch(
      dataActions.addUser({
        id: candidateId+1,
        name: nameRef.current.value,
        email: emailRef.current.value,
        username: null,
        address: {city:null},
      })
    );
    navigate("/")
  };
  const cancelHandler=(e)=>{
    e.preventDefault();
    navigate("/");
  }

  // dynamic style classes
  const nameStyles= `col-sm-10 form-control ${!formInputsValidity.name && 'inputInvalid'}`
  const emailStyles= `col-sm-10 form-control ${!formInputsValidity.email && 'inputInvalid'}`

  return (
    <>
    <div className="container border mt-2">
    <h4 className="mt-2 mb-2">
      Add new user
    </h4>
  <form onSubmit={submitHandler} noValidate>
    <div className="form-group d-flex flex-wrap">
      <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
      <input className={nameStyles} type="text"  id="inputName" maxLength="69" required ref={nameRef}/>
      <div className="col-sm-2"></div>
    <div className="errorText">{!formInputsValidity.name && 'Name is required'}</div>
    </div>
    <div className="form-group d-flex flex-wrap">
      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
      <input className={emailStyles} type="email"  id="inputEmail" maxLength="69" required ref={emailRef}/>
      <div className="col-sm-2"></div>
      <div className="errorText">{!formInputsValidity.email && 'Valid email is required'}</div>
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

export default AddUser;
