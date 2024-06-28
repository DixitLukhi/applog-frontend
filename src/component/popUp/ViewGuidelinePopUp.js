import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../api/baseUrl";
import { ALL_GUIDELINE } from "../../api/constApi";
import { toast } from "react-toastify";

export default function ViewGuidelinePopUp({ handleClose, data }) {
  
  const {policyid, policy} = data;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">{policyid}</h1>
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
              <div className="policy-item">
                  <p>{policy}</p>
              </div>
            
        </div>
      </div>
    </>
  );
}
