import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard({ onSelectOption }) {
  return (
    <>
      {/* <!-- Left Panel --> */}
      <div className="leftPanel max-w-[230px] w-full shadow-md relative z-30 dark bg-gradient-to-r from-slate-950 via-black to-slate-950 sticky top-0">
        <div className="logo text-center px-4 py-5 mb-5 border-b border-slate-700">
          <Link to="/" className="block" aria-label="Redirect To Home">
            Home
          </Link>
        </div>
        <div className="nav text-white">
          <div onClick={() => onSelectOption("user")} className="navLink">
            <span>Users</span>
          </div>
          <div onClick={() => onSelectOption("guideline")} className="navLink">
            <span>Guidelines</span>
          </div>
          <div onClick={() => onSelectOption("app")} className="navLink">
            <span>Apps</span>
          </div>
        </div>
      </div>
      {/* <!-- Content --> */}
    </>
  );
}
