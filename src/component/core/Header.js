import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../common/Modals/Modal';
import Register from '../auth/Register';
import AnalysisPopUp from '../popUp/AnalyisPopUp';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User"));
  const token = localStorage.getItem("Token");

  const [isRegisterPopUpOpen, setIsRegisterPopUpOpen] = useState(false);
  const [isAnalysisPopUpOpen, setIsAnalysiPopUpOpen] = useState(false);

  const logout = () => {
    navigate("/");
    localStorage.clear();
  };
  
  return (
    <>
      <header className="header">
        <h1 onClick={() => navigate("/")}>AppLog</h1>
        <nav>
          <ul>
            <li>
              {user?.first_name && user?.first_name !== "" ? <span>{user?.first_name}</span> : ""}
            </li>
            <li>
            <button
                      onClick={() => setIsAnalysiPopUpOpen(true)}
                      aria-label="Analysis"
                      className="btn"
                    >
                      Analysis
                    </button>
              {token && token !== "" ? 
                <>
                  <button
                    onClick={logout}
                    aria-label="Sign Out"
                    className="btn"
                  >
                    Log Out
                  </button>
                  {user && user?.role && user?.role === 1 && (
                    <button
                      onClick={() => navigate("/al_adam")}
                      aria-label="Admin"
                      className="btn"
                    >
                      Admin
                    </button>
                  )}
                </> : 
                <button
                  onClick={() => setIsRegisterPopUpOpen(true)}
                  aria-label="Sign In"
                  className="btn"
                >
                  Sign In
                </button>
              }
            </li>
          </ul>
        </nav>
      </header>
      <Modal isOpen={isAnalysisPopUpOpen}>
        <AnalysisPopUp handleClose={setIsAnalysiPopUpOpen} />
      </Modal>
      <Modal isOpen={isRegisterPopUpOpen}>
        <Register handleClose={setIsRegisterPopUpOpen} />
      </Modal>
    </>
  )
}
