import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from "yup";
import { baseUrl, driveUrl } from '../../api/baseUrl';
import { header, imageHeader } from '../core/helper';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { ALL_GUIDELINE, APP, LOGO } from '../../api/constApi';
import { imageType } from '../../shared/constants';

export default function AddAppPopUp({ handleClose, data, setReload}) {
    
    const [guidelines, setGuidelines] = useState([]);
    const [selectedGuidelines, setSelectedGuidelines] = useState({});

    const handleChange = (id, value) => {
        setSelectedGuidelines(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const appInitialState = {
        appid: data?.appid ? data?.appid : "",
        appName: data?.appName ? data?.appName : "",
        appLogo: data?.appLogo ? data?.appLogo : {},
        guidelines: data?.guidelines ? data?.guidelines : []
      };

      const appValidationSchema = Yup.object().shape({
        appName: Yup.string().required("App Name is required*"),
      });

      const handelAddApp = async (values) => {
        values.guidelines = Object.keys(selectedGuidelines).map(key => ({
            _id: key,
            followed: selectedGuidelines[key] === 'true'
        }));
        try {
          const payload = Object.assign({}, values);
          // return console.log(values);
          const response = await axios.post(`${baseUrl}${APP}`, payload, {headers: header});
          if (response.data?.IsSuccess) {
            setReload(true);
            handleClose(false);
            toast.success(response.data.Message);
          } else {
            toast.error(response.data.Message);
          }
        } catch (error) {
          toast.error("something Went to Wrong!!");
        }
      };

      const appFormik = useFormik({
        initialValues: appInitialState,
        validationSchema: appValidationSchema,
        onSubmit: handelAddApp,
      });
    
      const setAppInputValue = useCallback(
        (key, value) =>
          appFormik.setValues({
            ...appFormik.values,
            [key]: value,
          }),
        [appFormik]
      );

      const photoChangeHandler = async (event) => {
        const size = 2;
        let selected = event.target.files[0];
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          // maxIteration: 1
        };
        try {    
          if (selected && imageType.includes(selected.type)) {
            if (selected.size < size * 1024 * 1024) {
              const formData = new FormData();
              formData.append("file", selected);
              let uploadUrl;
    
              if (typeof selected === "object") {
                const response = await axios.post(`${baseUrl}${LOGO}`, formData, {headers: imageHeader});
                if (response.data.IsSuccess) {
                  uploadUrl = response.data.Data.url;
                }
              }
              setAppInputValue("appLogo", {
                url: uploadUrl || selected,
                type: "image",
              });
            } else {
              toast.error("File size shoup be<=2 MB");
            }
          } else {
            toast.error("PLEASE SELECT VALID IMAGE FILE.");
          }
        } catch (error) {
          toast.error(error);
        }
      };
    
    

      const getAllGuidelineList = async () => {
        try {
          const response = await axios.get(`${baseUrl}${ALL_GUIDELINE}`, {headers: header});
          if (response.data.IsSuccess) {
            setGuidelines(response.data.Data);
          } else {
            toast.error(response.data.Message);
          }
        } catch (error) { 
          toast.error("Something Went To Wrong!!");
        }
      };

      const mergeObj =  appFormik.values.guidelines.map(status => {
        const policy = guidelines.find(pol => pol._id === status._id);
        return {
          ...status,
          policyid: policy?.policyid,
          policy: policy?.policy
        };
      });
    useEffect(() => {
        getAllGuidelineList();
    }, []);
    return (
        <>
        <div className="modal-overlay">
        <div className="modal-content">
      
    <div>
         <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-[992]">
        <div className="max-w-[800px] w-full max-h-[90vh] overflow-y-auto m-auto bg-white rounded-3xl shadow-shadowbox p-5 sm:p-8">
          <h1 className="text-3xl font-play font-bold text-gray-700 dark:text-gray-200">
            Add App
          </h1>
          <form
            className="mt-6 space-y-6"
            onSubmit={appFormik.handleSubmit}
          >
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-bold font-play text-gray-600 dark:text-gray-200"
                  htmlFor="appName"
                >
                  App Name
                </label>
                <input
                  id="appName"
                  type="text"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  value={appFormik.values.appName}
                  onChange={(e) =>
                    setAppInputValue("appName", e.target.value)
                  }
                />
                <small className="text-red-500 text-xs">
                  {appFormik.errors.appName}
                </small>
              </div>
              <div className="sm:col-span-2 lg:col-span-3 hidden">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-200 mb-1">
                  App Logo
                </label>
                <div className="flex flex-wrap gap-2">
                  {appFormik.values.appLogo?.url &&
                  appFormik.values.appLogo?.url !== "" ? (
                    <>
                      <span className="w-16 h-16 border rounded-md flex items-center justify-center overflow-hidden relative group">
                        <img
                          src={driveUrl + appFormik.values.appLogo.url}
                          alt="logo img"
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                        <div
                          className="absolute bottom-0 inset-x-0 text-[10px] text-center bg-red-500 text-white cursor-pointer transition-all duration-300 translate-y-full group-hover:translate-y-0"
                        >
                          Remove
                        </div>
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                  <label
                    htmlFor="upload"
                    className="upload upload-popup w-16 h-16 border rounded-md flex items-center justify-center cursor-pointer"
                  >
                    <input
                      type="file"
                      name="images"
                      id="upload"
                      className="appearance-none hidden"
                      onChange={photoChangeHandler}
                    />
                    <span className="font-play text-4xl">+</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="guidelines-table">
      <p>Please select guidelines:</p>
      {guidelines && guidelines.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Policy</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {/* {appFormik.values.guidelines.length > 0 ? <>
              {() => mergeObj()}
              {mergeObj.map((gd) => (
              <tr key={gd._id} className="guideline-item">
                <td>{gd.policyid}</td>
                <td>{gd.policy}</td>
                <td className="guideline-options">
                  <input
                    type="radio"
                    id={`true-${gd._id}`}
                    name={`policy-${gd._id}`}
                    value="true"
                    checked={gd.followed === true}
                    onChange={() => handleChange(gd._id, true)}
                  />
                  <label htmlFor={`true-${gd._id}`}>Follow</label>
                  <input
                    type="radio"
                    id={`false-${gd._id}`}
                    name={`policy-${gd._id}`}
                    value="false"
                    checked={gd.followed === false}
                    onChange={() => handleChange(gd._id, false)}
                  />
                  <label htmlFor={`false-${gd._id}`}>Not Follow</label>
                </td>
              </tr>
            ))} */}
            {/* </> : */}
            <>{guidelines.map((gd) => (
              <tr key={gd._id} className="guideline-item">
                <td>{gd.policyid}</td>
                <td>{gd.policy}</td>
                <td className="guideline-options">
                  <input
                    type="radio"
                    id={`true-${gd._id}`}
                    name={`policy-${gd._id}`}
                    value="true"
                    checked={selectedGuidelines[gd._id] === 'true'}
                    onChange={() => handleChange(gd._id, 'true')}
                  />
                  <label htmlFor={`true-${gd._id}`}>Follow</label>
                  <input
                    type="radio"
                    id={`false-${gd._id}`}
                    name={`policy-${gd._id}`}
                    value="false"
                    checked={selectedGuidelines[gd._id] === 'false'}
                    onChange={() => handleChange(gd._id, 'false')}
                  />
                  <label htmlFor={`false-${gd._id}`}>Not Follow</label>
                </td>
              </tr>
            ))}
            </>
          </tbody>
        </table>
      ) : (
        <p>No guidelines are available to add</p>
      )}
    </div><div className="flex space-x-5 mt-6">
              <button
                className="btn btn-dark w-full py-4"
                onClick={() => handleClose(false)}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-dark w-full py-4" aria-label="Save">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>  
      </div>
      </div>
      </div>
    </>
  )
}

<style jsx>{`
  .guidelines-table {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  .guideline-options {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .guideline-options label {
    margin-left: 5px;
  }
`}</style>
