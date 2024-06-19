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
      <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-[992] p-5">
        <div className="max-w-[500px] w-full max-h-[calc(100vh-64px)] overflow-y-auto m-auto bg-white shadow-shadowbox rounded-md p-5 2xl:p-8 relative">
          <div className="flex items-end justify-between">
            <h1 className="text-xl 2xl:text-3xl font-play font-bold text-gray-700 dark:text-gray-200">
              For More Enquiry
            </h1>
            <span
              className="text-xs hover:font-bold hover:tracking-wider transition-all duration-300 cursor-pointer hover:rotate-180"
              onClick={() => handleClose(false)}
            >
              <svg
                className="w-6 h-6"
                width="800"
                height="800"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0F0F0F"
                  d="M20.746 3.329a1 1 0 00-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 10-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 001.414 1.415l7.294-7.295 7.294 7.295a1 1 0 001.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 000-1.414z"
                ></path>
              </svg>
            </span>
          </div>
          {guidelineList?.length > 0 ? (
                <>
                  {guidelineList.map((pol) => (
                    <>
                      <div
                        key={pol._id}
                        className="flex flex-col sm:flex-row items-end justify-between border border-black rounded-md p-5 space-y-2"
                      >
                        <div className="flex flex-col space-y-0.5">
                          <p>
                            {pol.policyid}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                "No policy added"
              )}
        </div>
      </div>
    </>
  );
}
