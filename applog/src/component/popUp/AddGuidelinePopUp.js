import axios from 'axios';
import React, { useCallback } from 'react'
import * as Yup from "yup";
import { baseUrl } from '../../api/baseUrl';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { GUIDELINE } from '../../api/constApi';
import { header } from '../core/helper';

export default function AddGuidelinePopUp({ handleClose, data, setReload}) {

    const guidelineInitialState = {
        guidelineid: data?.guidelineid ? data?.guidelineid : "",
        policyid: data?.policyid ? data?.policyid : "RBI",
        policy: data?.policy ? data?.policy : ""
      };

      const guidelineValidationSchema = Yup.object().shape({
        policyid: Yup.string().required("Policy id is required*"),
        policy: Yup.string().required("Policy info is required*"),
      });

      const handelAddGuideline = async (values) => {
        try {
          const payload = Object.assign({}, values);
          const response = await axios.post(`${baseUrl}${GUIDELINE}`, payload, {headers: header});
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

      const guidelineFormik = useFormik({
        initialValues: guidelineInitialState,
        validationSchema: guidelineValidationSchema,
        onSubmit: handelAddGuideline,
      });
    
      const setguidelineInputValue = useCallback(
        (key, value) =>
          guidelineFormik.setValues({
            ...guidelineFormik.values,
            [key]: value,
          }),
        [guidelineFormik]
      );
  return (
    <>
    <div className="modal-overlay">
        <div className="modal-content">
      
           <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-[992]">
        <div className="max-w-[800px] w-full max-h-[90vh] overflow-y-auto m-auto bg-white rounded-3xl shadow-shadowbox p-5 sm:p-8">
          <h1 className="text-3xl font-play font-bold text-gray-700 dark:text-gray-200">
            Add Guideline
          </h1>
          <form
            className="mt-6 space-y-6"
            onSubmit={guidelineFormik.handleSubmit}
          >
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-bold font-play text-gray-600 dark:text-gray-200"
                  htmlFor="policyId"
                >
                  Policy id
                </label>
                <input
                  id="policyId"
                  type="text"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  value={guidelineFormik.values.policyid}
                  onChange={(e) =>
                    setguidelineInputValue("policyid", e.target.value)
                  }
                />
                <small className="text-red-500 text-xs">
                  {guidelineFormik.errors.policyid}
                </small>
              </div>
              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-bold font-play text-gray-600 dark:text-gray-200"
                  htmlFor="policy"
                >
                  Policy
                </label>
                <input
                  id="policy"
                  type="text"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  value={guidelineFormik.values.policy}
                  onChange={(e) =>
                    setguidelineInputValue("policy", e.target.value)
                  }
                />
                <small className="text-red-500 text-xs">
                  {guidelineFormik.errors.policy}
                </small>
              </div>
            </div>
            <div className="flex space-x-5 mt-6">
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
    </>
  )
}
