import React from "react";
import { Outlet } from "react-router-dom";
import RegisterImg from "../../public/Images/register.jpg";

function Authentication() {
  return (
    <section
      id="authentication"
      className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12 flex items-center justify-center h-screen"
    >
      <div className="md:bg-gray-100 md:shadow-sm md:grid grid-cols-2 w-220 h-fit overflow-hidden md:rounded-4xl">
        <img
          src={RegisterImg}
          alt="registertaiuon illustration"
          className="h-full w-full object-cover"
        />
        <Outlet />
      </div>
    </section>
  );
}

export default Authentication;
