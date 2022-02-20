import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Signup from "./components/Signup";
import EmailVerify from './components/EmailVerify'



function App() {
  const user = localStorage.getItem("token");

  return (
    <div>
      <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
        <Route path="/Home" exact element={<Modal />} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      </Routes>
    </div>
  )

}

export default App;