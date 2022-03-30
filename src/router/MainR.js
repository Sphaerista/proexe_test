import { Routes, Route } from "react-router-dom";
import Data from "./Data";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const MainR = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/new" element={<AddUser />} />
        <Route path="/data/:id" element={<EditUser />} />
      </Routes>
    </>
  );
};

export default MainR;
