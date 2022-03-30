import { useSelector,useDispatch } from "react-redux"
import { dataActions } from "../reduxStore/redux-fecht/data-action";

const Popup =(props)=>{
  const dispatch = useDispatch();  

    let concreteId  = useSelector(state => state.fetchData.id)
    let concreteUser  = useSelector(state => state.fetchData.users).filter((user)=>user.id === concreteId)
    const deleteHandler=()=>{
      dispatch(dataActions.delUser(concreteId));
      props.popupHandler()
    }

    return (<>
  <div className="modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Delete</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        </button>
        </div>
        <div className="modal-body">
        <p>You are going to delete '{concreteUser[0].username}' from the list. Are you sure?</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.popupHandler}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  </div>
<div className="modal-backdrop" ></div>
    </>)
}

export default Popup;