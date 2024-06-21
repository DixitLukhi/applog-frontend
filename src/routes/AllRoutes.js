import React, { lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/landingPage/Home";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserList from "../pages/admin/UserList";
import GuidelineList from "../pages/admin/GuidelineList";
import AppList from "../pages/admin/AppList";
import OneApp from "../pages/landingPage/OneApp";

function AllRoutes() {
  const { role } = JSON.parse(localStorage.getItem("User") !== null);

  const [selectedOption, setSelectedOption] = useState("user");
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedOption", option);
  };

  return (
    <BrowserRouter>
       <Routes className="main min-h-screen h-ful w-full">
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/app/:appId" element={<OneApp />} />

          <Route path="/al_adam">
          <Route
                index
                element={
                  role ? (
                    <>
                      <div className="main flex min-h-screen">
                        <AdminDashboard onSelectOption={handleSelectOption} />
                        {selectedOption === "user" ? <UserList /> : <></>}
                        {selectedOption === "guideline" ? <GuidelineList /> : <></>}
                        {selectedOption === "app" ? <AppList /> : <></>}                        
                      </div>
                    </>
                  ) : (
                    <Home />
                  )
                }
              />
          </Route>

          </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
