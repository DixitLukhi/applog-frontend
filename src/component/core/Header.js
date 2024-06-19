import React, { useState } from 'react'
import Modal from '../../common/Modals/Modal';
import Register from '../auth/Register';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User"));
  const token = localStorage.getItem("Token");

  const [isRegisterPopUpOpen, setIsRegisterPopUpOpen] = useState(false);

  const logout = () => {
    navigate("/");
    localStorage.clear();
  };
  
  return (
    <>
      <header className="header">
      <h1>My Website</h1>
      <nav>
        <ul>
        <li>
        {user?.first_name && user?.first_name !== "" ? <>{user?.first_name}</> : ""}
        </li>
        <li>
        {token && token !== "" ? 
          <button
          onClick={() => {
            logout();
          }}
          aria-label="Sign Out"
          className="btn btn-light"
        >
          Log Out
        </button> : <button
          onClick={() => {
            setIsRegisterPopUpOpen(true);
          }}
          aria-label="Sign In"
          className="btn btn-light"
        >
          Sign In
        </button>
        }
        {user && user?.role && user?.role == 1 ?
          <button
          onClick={() => navigate("al_adam")}
          aria-label="Admin"
          className="btn btn-light"
        >
          Admin
        </button>
         : ""}
        </li>
        </ul>
      </nav>
    </header>
    <Modal isOpen={isRegisterPopUpOpen}>
        <Register handleClose={setIsRegisterPopUpOpen} />
      </Modal>
    </>
  )
}
