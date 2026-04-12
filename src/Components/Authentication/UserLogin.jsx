import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EyeIcon from "../../../public/Icons/view.png";
import { Link } from "react-router-dom";

function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordType, setPasswordType] = useState("password");

  const onSubmit = (data) => {
    window.alert(data);
  };
  return (
    <div className="md:px-6 md:py-12 w-full flex flex-col items-center justify-center">
      <h2 className="tracking-wider text-3xl font-semibold mb-6">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="outline-none h-12 border-b text-lg w-60 md:w-100 mb-1"
          placeholder="Enter username or email"
          {...register("username", {
            required: "Username or Email required.",
          })}
        />
        {errors.username && (
          <p className="text-red-700 text-sm">{errors.username.message}</p>
        )}
        <div className="relative h-12 my-6">
          <input
            type={passwordType}
            className="outline-none h-full border-b text-lg w-60 md:w-100 mb-1"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password should be 8 characters at minimum.",
              },
            })}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              setPasswordType((cur) =>
                cur === "password" ? "text" : "password",
              );
            }}
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
          >
            <img
              src={EyeIcon}
              alt="password toggle icon"
              className="h-5 w-5 object-contain"
            />
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-6 flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 outline-none cursor-pointer"
            />
            <p>Stay Signed in</p>
          </div>
          <a href="#" className="underline">
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          className="h-12 w-full bg-black text-white mb-6 cursor-pointer text-lg tracking-wider rounded-sm transition-color duration-300 ease-in-out hover:bg-white hover:text-black border"
        >
          Log In
        </button>
      </form>
      <p className="text-center">
        Don't have a account yet?{" "}
        <Link
          to={"/authentication/user-registration"}
          className="font-semibold text-blue-600"
        >
          Sign up
        </Link>{" "}
        for free.
      </p>
    </div>
  );
}

export default UserLogin;
