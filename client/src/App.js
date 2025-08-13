import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Pages/Home/Home";
// import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Pages/Profile/Profile";
import Task from "./Pages/Tasks/Task";
import Register from "./Pages/Register/Register";
import Work from "./Pages/SubTask/Work";
import Other from "./Pages/SubTask/Other";
function App() {
  // Check if the user is logged in
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
      {!token && <Route path="/" element={<Home />} />}
        <Route path="/profile" element={<Profile />} />
        <Route path="/task" element={<Task />} />
        <Route path="/register" element={<Register />} />
        <Route path="/work" element={<Work />} />
        <Route path="/other" element={<Other />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
