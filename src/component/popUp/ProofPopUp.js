import React from "react";
import { proofs } from "../core/helper";

export default function ProofPopUp({ data, handleClose }) {
  const proof = proofs.find(prf => prf?.id === data?.proofid);

  return (
    <>
      <div
        className="modal-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "1200px",
            padding: "20px",
            position: "relative",
          }}
        >
          <div className="modal-header" style={{ marginBottom: "20px" }}>
            <h1 className="modal-title" style={{ margin: 0 }}>Proof Of Claim</h1>
            <button
              className="modal-close"
              onClick={() => handleClose(false)}
              style={{
                background: "none",
                border: "none",
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
            >
              <svg
                className="w-6 h-6"
                width="24"
                height="24"
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
          <div className="modal-body" style={{ display: "flex" }}>
            <div style={{ flex: "1", paddingRight: "20px" }}>
              <img
                src={proof?.url && proof?.url !== "" ? proof?.url : "https://st.depositphotos.com/1607243/1565/i/450/depositphotos_15659541-stock-photo-approve-man.jpg"}
                alt="drive proof"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="modal-description" style={{ flex: "2", textAlign: "left" }}>
              <p>
                ADC Bank is a mobile banking application that provides users with essential banking services such as account management, fund
                transfers, bill payments, and loan applications. While it offers a range of functionalities, ADC Bank has significant security vulnerabilities that pose risks to its users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
