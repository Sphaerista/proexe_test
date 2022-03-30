import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "fetchedData",
  initialState: {
    users: [],
    status: 'null',
    id:null
  },
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    delUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser(state, action) {
      const userToChange = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[userToChange].name = action.payload.name;
      state.users[userToChange].email = action.payload.email;
      state.users[userToChange].username = action.payload.username;
      state.users[userToChange].address.city = action.payload.city;
    },
    fetchUsers(state, action) {
      state.users = action.payload;
    },
    pendingUsers(state,action){
      state.status = action.payload
    },
    
    finishedReq(state,action){
      state.status = action.payload
    },
    
   sortList (state, action){

      state.users =  state.users.sort((a, b) => {
        if (action.payload) {
          return a.username > b.username ? 1 : -1;
        } else {
          return a.username < b.username ? 1 : -1;
        }
      });
    
   },
   bringId(state,action){
     state.id = action.payload
   }
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
