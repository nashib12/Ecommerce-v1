import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DataContext from "../../Context/DataContext";
import { useLenis } from "lenis/react";
import EyeIcon from "../../../public/Icons/view.png";
import CloseIcon from "../../../public/Icons/close.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function LoginModal() {
  const { loginModal, setLoginModal } = useContext(DataContext);
  const lenis = useLenis();
  const [passwordType, setPasswordType] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    window.alert(data);
  };

  useEffect(() => {
    if (loginModal) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "auto";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "auto";
    };
  }, [loginModal, lenis]);

  if (!loginModal) return null;
  return createPortal(
    <section className="bg-black/40 fixed top-0 left-0 right-0 bottom-0 z-999">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-sm w-fit h-fit  rounded-xl">
        <div className="relative flex flex-col items-center justify-center px-6 py-6 md:py-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide mb-9">
            Sign In
          </h2>
          <button
            className="absolute top-6 right-6 cursor-pointer"
            onClick={() => setLoginModal(false)}
          >
            <img
              src={CloseIcon}
              alt="close button icon"
              className="h-8 w-8 object-contain"
            />
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="outline-none h-12 border-b text-lg w-60 md:w-100 mb-1"
              placeholder="Enter username or email"
              {...register("username", {
                required : "Username or Email required."
              })}
            />
            {errors.username && <p className="text-red-700 text-sm">{errors.username.message}</p>}
            <div className="relative h-12 my-6">
              <input
                type={passwordType}
                className="outline-none h-full border-b text-lg w-60 md:w-100 mb-1"
                placeholder="Enter your password"
                {...register("password", {
                    required: "Password is required.",
                    minLength: {
                        value: 8,
                        message : "Password should be 8 characters at minimum."
                    }
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
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-6 flex flex-col md:flex-row gap-3 justify-between">
                <div className="flex gap-2 items-center"><input type="checkbox" className="h-4 w-4 outline-none cursor-pointer" /><p>Stay Signed in</p></div>
                <a href="#" className="underline">Forgot your password?</a>
            </div>
            <button type="submit" className="h-12 w-full bg-black text-white mb-6 cursor-pointer text-lg tracking-wider rounded-sm transition-color duration-300 ease-in-out hover:bg-white hover:text-black border">Log In</button>
          </form>
            <p className="text-center">Don't have a account yet? <Link to={'/authentication/user-registration'}  className="font-semibold text-blue-600">Sign up</Link> for free.</p>
        </div>
      </div>
    </section>,
    document.getElementById("modalRoot"),
  );
}

export default LoginModal;
