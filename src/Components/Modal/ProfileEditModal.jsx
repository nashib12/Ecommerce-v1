import React, { useContext, useEffect } from "react";
import DataContext from "../../Context/DataContext";
import CloseIcon from "../../../public/Icons/close.png";
import { useForm } from "react-hook-form";
import { useLenis } from "lenis/react";
import { createPortal } from "react-dom";

function ProfileEditModal() {
  const { profileEdit, setProfileEdit } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const lenis = useLenis();

  useEffect(() => {
    if(profileEdit) {
        lenis?.stop();
        document.body.style.overflow = "hidden";
    } else {
        lenis?.start();
        document.body.style.overflow = "auto";
    }
     return () => {
        lenis?.start();
        document.body.style.overflow = "auto";
     }
  }, [lenis, profileEdit])

  const onSubmit = (data) => {
    window.alert(data);
  };

  if (!profileEdit) return null;
  return createPortal(
    <section className="fixed bg-black/60 top-0 bottom-0 left-0 right-0">
      <div className="bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md h-fit w-full md:w-100">
        <div className="relative px-6 py-12">
          <button
            className="absolute top-6 right-6 cursor-pointer"
            onClick={() => setProfileEdit(false)}
          >
            <img
              src={CloseIcon}
              alt="close button icon"
              className="h-6 w-6 object-contain"
            />
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="fName" className="text-lg tacking-wide mb-1">
              Full Name:
            </label>
            <input
              id="fName"
              type="text"
              className="outline-none border-b py-1 tracking-wide mb-1"
              {...register("fName", { required: "Feild Must not be empty" })}
            />
            {errors.fName && (
              <p className="text-red-600 text-sm">* {errors.fName.message}</p>
            )}
            <label htmlFor="userame" className="text-lg tacking-wide mt-8 mb-1">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className="outline-none border-b py-1 tracking-wide mb-1"
              {...register("username", { required: "Feild Must not be empty" })}
            />
            {errors.username && (
              <p className="text-red-600 text-sm">* {errors.username.message}</p>
            )}
            <label htmlFor="email" className="text-lg tacking-wide mt-8 mb-1">
              Email Address:
            </label>
            <input
              id="email"
              type="email"
              className="outline-none border-b py-1 tracking-wide mb-1"
              {...register("email", { required: "Feild Must not be empty" })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">* {errors.email.message}</p>
            )}
            <label htmlFor="contact" className="text-lg tacking-wide mt-8 mb-1">
              Contact No:
            </label>
            <input
              id="contact"
              type="text"
              className="outline-none border-b py-1 tracking-wide mb-1"
              {...register("contact", { required: "Feild Must not be empty" })}
            />
            {errors.contact && (
              <p className="text-red-600 text-sm">* {errors.contact.message}</p>
            )}
            <div className="grid grid-cols-2 gap-2 mt-8">
              <div>
                <label
                  htmlFor="dob"
                  className="text-lg tacking-wide mb-1"
                >
                  Date of Birth:
                </label>
                <input
                  id="dob"
                  type="text"
                  className="outline-none border-b py-1 tracking-wide mb-1 w-full"
                  {...register("dob", {
                    required: "Feild Must not be empty",
                  })}
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm">
                    * {errors.dob.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="text-lg tacking-wide mb-1"
                >
                  Gender:
                </label>
                <input
                  id="gender"
                  type="text"
                  className="outline-none border-b py-1 tracking-wide mb-1 w-full"
                  {...register("gender", {
                    required: "Feild Must not be empty",
                  })}
                />
                {errors.gender && (
                  <p className="text-red-600 text-sm">
                    * {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
            <button className="mt-8 h-12 w-full cursor-pointer border text-white bg-black transition-colors duration-300 ease-in-out hover:text-black hover:bg-white tracking-wide rounded-md">Update Profile</button>
          </form>
        </div>
      </div>
    </section>, document.getElementById("modalRoot"),
  );
}

export default ProfileEditModal;
