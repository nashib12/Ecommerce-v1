import React, { useState } from "react";
import AuthBgImg from "../../../public/Images/auth-one-bg.jpg";
import EyeIcon from "../../../public/Icons/view.png";
import { useForm } from "react-hook-form";

function AdminLogin() {
  const [passwordType, setPasswordType] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    window.alert(data);
    reset();
    setPasswordType("password");
  };
  return (
    <section className="bg-[url(../../../public/Images/auth-one-bg.jpg)] bg-center bg-no-repeat bg-cover fixed top-0 left-0 right-0 bottom-0">
      <div className="bg-black/80 fixed top-0 left-0 right-0 bottom-0" />
      <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-6 h-fit w-full md:w-100 rounded-sm">
        <h2 className="text-2xl font-semibold tracking-wider leading-12 text-center">
          Welcome Back!
        </h2>
        <p className="text-xl tracking-wide mb-6 text-center">
          Sign in to your Account.
        </p>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mb-1 text-lg outline-none border rounded-sm px-4 h-10 w-full"
            placeholder="Enter Username"
            {...register("username", {
              required: "Please Enter your username.",
            })}
          />
          {errors.username && (
            <p className="text-red-600 text-sm">* {errors.username.message}</p>
          )}
          <label htmlFor="password" className="mt-6 mb-1">
            Password
          </label>
          <div className="relative h-10 mb-1">
            <input
              {...register("password", {
                required: "Please Enter your password.",
              })}
              type={passwordType}
              className="mb-1 text-lg outline-none border rounded-sm px-4 h-full w-full"
              placeholder="Enter Password"
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                setPasswordType((curr) =>
                  curr === "password" ? "text" : "password",
                );
              }}
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            >
              <img
                src={EyeIcon}
                alt="eye icon"
                className="h-5 w-5 object-contain"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm">* {errors.password.message}</p>
          )}
          <div className="mt-3 flex items-center gap-2 ml-1 mb-6">
            <input
              type="checkbox"
              id="checkbox"
              className="h-4 w-4 outline-none border"
            />
            <label htmlFor="checkbox">Remember Me</label>
          </div>
          <button className="h-10 w-full bg-black text-white cursor-pointer tracking-wide rounded-sm transition-colors duration-300 ease-in-out hover:bg-white hover:text-black border mb-6">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
