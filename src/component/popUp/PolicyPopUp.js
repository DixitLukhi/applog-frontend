import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../api/baseUrl";
import { ALL_GUIDELINE } from "../../api/constApi";
import { toast } from "react-toastify";

export default function PolicyPopUp({ handleClose }) {
  
  const [guidelineList, setGuidelineList] = useState([]);

  const getGuidelineList = async () => {
    try {
      const response = await axios.get(`${baseUrl}${ALL_GUIDELINE}`);

      if (response.data.IsSuccess) {
        setGuidelineList(response.data.Data);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  }

  useEffect(() => {
    getGuidelineList();
  }, []);
  
  return (
    <>
      <div className="modal-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '800px' }}>
          <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="modal-title">RBI Guidelines</h1>
            <button className="modal-close" onClick={() => handleClose(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
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
          {guidelineList?.length > 0 ? (
            guidelineList.map((pol) => (
              <div key={pol._id} className="policy-item" style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <div>
                  <p>{pol.policyid}</p>
                  <p>{pol.policy}</p>
                </div>
              </div>
            ))
          ) : (
            "No policy added"
          )}
        </div>
      </div>
    </>
  );
}
