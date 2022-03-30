import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./redux-fecht/data-action";

const store = configureStore({
  reducer: {
    fetchData: dataSlice,
  },
});

export default store;
