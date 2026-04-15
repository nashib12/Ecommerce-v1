import React from "react";
import { useForm } from "react-hook-form";
import TelephoneIcon from "../../public/Icons/telephone.png";
import EmailIcon from "../../public/Icons/email.png";
import FacebookIcon from "../../public/Icons/facebook.png";
import InstagramIcon from "../../public/Icons/instagram.png";
import TikTokIcon from "../../public/Icons/tik-tok.png";
import TwitterIcon from "../../public/Icons/twitter.png";

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    window.alert(data);
  };
  return (
    <section
      id="contact-us"
      className="px-6 py-6 md:px-12 md:py-12 max-w-7xl mx-auto"
    >
      <div className="md:grid grid-cols-2 gap-12">
        {/* contact form */}
        <div className="flex justify-center w-full mb-6 md:mb-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:w-110"
          >
            <input
              type="text"
              className="outline-none py-2 border-b text-lg mb-1"
              placeholder="Enter your Full Name"
              {...register("fName", { required: "Full Name is required" })}
            />
            {errors.fName && (
              <p className="text-sm text-red-500">{errors.fName.message}</p>
            )}
            <input
              type="email"
              className="outline-none py-2 border-b text-lg mb-1 mt-6"
              placeholder="Enter your Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <input
              type="text"
              className="outline-none py-2 border-b text-lg mb-1 mt-6"
              placeholder="Enter your Phone Number"
              {...register("contactNo", {
                required: "Phone Number is required",
              })}
            />
            {errors.contactNo && (
              <p className="text-sm text-red-500">{errors.contactNo.message}</p>
            )}
            <textarea
              placeholder="Enter your Messgae"
              rows={8}
              className="border-b mt-6 outline-none text-lg"
              {...register("message")}
            ></textarea>
            <button className="mt-6 h-12 w-full cursor-pointer text-lg tracking-wide border bg-black text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
              Send Message
            </button>
          </form>
        </div>

        {/* contact detail */}
        <div className="flex justify-center w-full">
          <div className="flex flex-col w-full md:w-110 py-6">
            <h2 className="text-3xl tracking-wider font-semibold mb-6">
              Contact Us
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={TelephoneIcon}
                alt="telephone icon"
                className="h-6 w-6 object-contain"
              />
             <div className="flex flex-col md:flex-row gap-1.5">
               <a href="tel:980-0000000">+977 980-0000000</a>
              <a href="tel:980-0000001">+977 980-0000001</a>
             </div>
            </div>
            <div className="flex items-center gap-3 mb-9">
              <img
                src={EmailIcon}
                alt="email icon"
                className="h-6 w-6 object-contain"
              />
              <a href="mailto:info@megastore.com">info@megastore.com</a>
            </div>
            <div className="border h-0.5 w-full bg-black rounded-full mb-3"/>
            <h2 className="text-xl md:text-3xl tracking-wider font-semibold mb-6 md:leading-10">
              Connect with us through our Social Media Account
            </h2>
            <div className="flex items-center gap-6">
              <button className="rounded-md h-12 w-12 flex items-center justify-center cursor-pointer border-2">
                <img
                  src={FacebookIcon}
                  alt="facebook icon"
                  className="h-7 w-7 object-contain"
                />
              </button>
              <button className="rounded-md h-12 w-12 flex items-center justify-center cursor-pointer border-2">
                <img
                  src={TikTokIcon}
                  alt="tiktok icon"
                  className="h-6 w-6 object-contain"
                />
              </button>
              <button className="rounded-md h-12 w-12 flex items-center justify-center cursor-pointer border-2">
                <img
                  src={InstagramIcon}
                  alt="instagram icon"
                  className="h-6 w-6 object-contain"
                />
              </button>
              <button className="rounded-md h-12 w-12 flex items-center justify-center cursor-pointer border-2">
                <img
                  src={TwitterIcon}
                  alt="twitter icon"
                  className="h-6 w-6 object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
