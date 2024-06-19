import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { header } from "../core/helper";
import { SIGNIN, SIGNUP, USER } from "../../api/constApi";
import { ToastContainer, toast } from "react-toastify";
import { addClass, removeClass } from "../../asset.js/js/script";
import { useNavigate } from "react-router-dom";

export default function Register({ handleClose }) {
  
  const navigate = useNavigate();

  const registerInitialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const loginInitialState = {
    email: "",
    password: "",
  };

  const registerValidationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("First name is required*"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Last name is required*"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required*"),
    password: Yup.string()
      .min(6, "Too Short!")
      .required("Password is required*"),
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required*"),
    password: Yup.string()
      .min(6, "Too Short!")
      .required("Password is required*"),
  });

  const handelRegister = async (values) => {
    try {
      const payload = Object.assign({}, values);
      const response = await axios.post(`${baseUrl}${SIGNUP}`, payload, {headers: header});
      if (response.data?.IsSuccess) {
				toast.success(response.data.Message);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("something Went to Wrong!!");
    }
  };
  
  const handelLogin = async (values) => {
    try {
      const payload = Object.assign({}, values);
      const response = await axios.post(`${baseUrl}${SIGNIN}`, payload);
      if (response.data?.IsSuccess) {
        localStorage.clear();
        await localStorage.setItem("Token", response.data?.Data.token);
        getUserProfile();
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("something Went to Wrong!!");
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}${USER}`, {headers : header});
      
      if (response.data?.IsSuccess) {
        console.log(response.data.Data);
        localStorage.setItem("User", JSON.stringify(response.data.Data));
        window.location.reload();
        navigate("/");
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      toast.error("Something Went to Wrong!!");
    }
  }

  const formikRegister = useFormik({
    initialValues: registerInitialState,
    validationSchema: registerValidationSchema,
    onSubmit: handelRegister,
  });

  const formikLogin = useFormik({
    initialValues: loginInitialState,
    validationSchema: loginValidationSchema,
    onSubmit: handelLogin,
  });

  const setRegisterInputValue = useCallback(
    (key, value) =>
      formikRegister.setValues({
        ...formikRegister.values,
        [key]: value,
      }),
    [formikRegister]
  );

  const setLoginInputValue = useCallback(
    (key, value) =>
      formikLogin.setValues({
        ...formikLogin.values,
        [key]: value,
      }),
    [formikLogin]
  );

  return (
    <>
      {/* <!-- Register Popup [S] --> */}
      <div
        id="LRPopup"
        className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 dark show hidden"
      >
        <span
          onClick={() => addClass("#LRPopup", "hidden")}
          className="fixed inset-0 w-screen h-screen bg-black/40 z-30 backdrop-blur-sm cursor-pointer"
        ></span>
            <div>
              <form
                className="text-xs tracking-wider space-y-4"
                onSubmit={formikLogin.handleSubmit}
              >
                <div>
                  <label className="block mb-1 text-gray-600 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) =>
                      setLoginInputValue("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) =>
                      setLoginInputValue("password", e.target.value)
                    }
                  />
                </div>
                <div className="">
                  <button
                    type="submit"
                    aria-label="Sign In"
                    className="btn btn-light w-full py-3 text-xs font-bold"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <span
                  onClick={() => {
                    addClass("#SignIn", "hidden");
                    removeClass("#SignUp", "hidden");
                  }}
                  className="cursor-pointer text-xs text-gray-500 uppercase dark:text-gray-400"
                >
                  or sign up
                </span>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
            <div id="SignUp" className="space-y-5 hidden">
              <p className="text-xl font-play text-center text-gray-600 dark:text-gray-200">
                Get Your Free Account Now.
              </p>
              <form
                className="text-xs tracking-wider space-y-4"
                onSubmit={formikRegister.handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-gray-600 dark:text-gray-200">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) =>
                        setRegisterInputValue("first_name", e.target.value)
                      }
                    />
                    <small className="text-red-500  text-xs">
                      {formikRegister.errors.first_name}
                    </small>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-600 dark:text-gray-200">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Snow"
                      className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) =>
                        setRegisterInputValue("last_name", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formikRegister.errors.last_name}
                    </small>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-600 dark:text-gray-200">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="johnsnow@example.com"
                      className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) =>
                        setRegisterInputValue("email", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formikRegister.errors.email}
                    </small>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) =>
                        setRegisterInputValue("password", e.target.value)
                      }
                    />
                    <small className="text-red-500 text-xs">
                      {formikRegister.errors.password}
                    </small>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    aria-label="Sign Up"
                    className="btn btn-light w-full py-3 text-xs font-bold"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <span
                  onClick={() => {
                    addClass("#SignUp", "hidden");
                    removeClass("#SignIn", "hidden");
                  }}
                  className="cursor-pointer text-xs text-gray-500 uppercase dark:text-gray-400"
                >
                  or sign in
                </span>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* <!-- Register Popup [E] --> */}
    </>
  );
}
