import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EyeImg from "../../../public/Icons/view.png";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import CloseButtonIcon from '../../../public/Icons/close.png'

function Registeration() {
  const { registeration, user} = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset, resetField
  } = useForm();
  
  const currPassword = watch("password");
  const [password, setPassword] = useState("password");
  const [cPassword, setCPassword] = useState("password");
  
  if (user) return <Navigate to={'/'} replace />
  const onSubmit = async (data) => {
    try {
      await registeration(data.name, data.email, data.password, data.password_confirmation, data.terms);
      reset();
      toast.success('Account created successfully.');
      return <Navigate to={'/'} replace />
    } catch (error) {
      toast.error(error.response?.data.message || 'Registratin error try again!!!');
      resetField('password');
      resetField('password_confirmation');
    }
  };

 
  return (
    <div className="md:px-8 md:py-12 w-full flex flex-col items-center justify-center relative">
      <h2 className="tracking-wider text-3xl font-semibold mb-6">
        User Registration
      </h2>
      <Link to={'/'}>
        <button className="absolute top-4 right-4 cursor-pointer">
          <img src={CloseButtonIcon} alt="close button icon" className="h-6 w-6 object-contain" />
        </button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="border-b outline-none py-2 text-lg h-12 w-full mb-1"
          placeholder="Enter full name"
          {...register("name", {
            required: "Full name is required",
            minLength: {
              value: 8,
              message: "Username must be 8 characters at minimum",
            },
          })}
        />
        {errors.name && <p className="text-sm text-red-600">* {errors.name.message}</p>}
        <input
          type="email"
          className="border-b outline-none py-2 text-lg h-12 w-full mb-1 mt-6"
          placeholder="Enter your email address"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        <div className="relative mt-6">
          <input
            type={password}
            className="border-b outline-none py-2 text-lg h-12 w-full mb-1"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters at minimum",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{9,}$/,
                message:
                  "Password must contain at least a uppercase, lowercase, digit and special characters.",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              setPassword((curr) =>
                curr === "password" ? "text" : "password",
              );
            }}
          >
            <img
              src={EyeImg}
              alt="passowrd toggle icon"
              className="h-5 w-5 object-contain"
            />
          </button>
        </div>
        <div className="relative mt-6">
          <input
            type={cPassword}
            className="border-b outline-none py-2 text-lg h-12 w-full mb-1"
            placeholder="Enter confirm password"
            {...register("password_confirmation", {
              required: "Confirm password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters at minimum",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{9,}$/,
                message:
                  "Password must contain at least a uppercase, lowercase, digit and special characters.",
              },
              validate: (value) =>
                value === currPassword || "Password do not match.",
            })}
          />
          {errors.password_confirmation && (
            <p className="text-sm text-red-600">{errors.password_confirmation.message}</p>
          )}
          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              setCPassword((curr) =>
                curr === "password" ? "text" : "password",
              );
            }}
          >
            <img
              src={EyeImg}
              alt="passowrd toggle icon"
              className="h-5 w-5 object-contain"
            />
          </button>
        </div>
        <div className="flex gap-2 items-center mt-3 mb-1">
          <input
            type="checkbox"
            className="h-4 w-4 outline-none"
            {...register("terms", { required: "Agree to term and condition" })}
          />
          <p className="text-sm">
            I have read and agree to{" "}
            <Link className="text-blue-600">Terms</Link> and{" "}
            <Link className="text-blue-600">Conditions</Link>.
          </p>
        </div>
        {errors.terms && (
          <p className="text-red-600 text-sm">{errors.terms.message}</p>
        )}
        <button className="h-12 w-full bg-black text-white text-lg cursor-pointer transition-colors duration-300 ease-in-out mt-6 border hover:bg-white hover:text-black">
          Register{" "}
        </button>
      </form>
      <p className="mt-3 text-lg">
        Already have a account? <Link to={'/authentication/user-login'} className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}

export default Registeration;
