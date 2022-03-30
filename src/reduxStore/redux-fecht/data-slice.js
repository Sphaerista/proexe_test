import { dataActions } from "./data-action";


export const fetchMockData = () => {
  
  return async (dispatch) => {
    dispatch(dataActions.pendingUsers('pending'))
    const fetchData = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
      );

      if (!response.ok) {
        throw new Error("fail in fetch");
      }

      const data = await response.json();

      return data;
    };

    try {
      const fechedData = await fetchData();
      dispatch(dataActions.fetchUsers(fechedData));
      dispatch(dataActions.finishedReq('success'))
    } catch (e) {
      console.log(e);
    }
  };
};
