import React from "react";

import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import FooterAdmin from "./components/FooterAdmin";
import { ToastContainer } from "react-toastify";

export default function ClassicLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-red-100 h-full min-h-screen bg-blueGray-700 ">
        <div className="relative bg-red-700 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <NavBar />
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -mt-24">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {children}
        </div>
        <FooterAdmin />
      </div>
    </>
  );
}
