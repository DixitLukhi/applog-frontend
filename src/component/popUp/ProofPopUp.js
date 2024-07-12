import React from "react";
// import { driveUrl } from "../../api/baseUrl";

export default function ProofPopUp({ data, handleClose }) {
    const { img, desc } = data;
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Proof Of Claim</h1>
            <button className="modal-close" onClick={() => handleClose(false)}>
              <svg
                className="w-6 h-6"
                width="50"
                height="50"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0F0F0F"
                  d="M20.746 3.329a1 1 0 00-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 10-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 001.414 1.415l7.294-7.295 7.294 7.295a1 1 0 001.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 000-1.414z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="modal-body">
            {console.log(driveUrl+img)}
            <img
              className="modal-image"
              src="https://www.bleepstatic.com/images/news/tutorials/windows-11/administrator-command-prompt/access-denied.jpg"
            //   src="https://drive.google.com/file/d/1Hkmi4F6e6XnaK_Woe9wCsZaMKmYbPTyp"
              alt="Description"
            />
            <div className="modal-description">
              <p>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
