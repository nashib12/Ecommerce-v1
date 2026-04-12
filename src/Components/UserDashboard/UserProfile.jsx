import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";

function UserProfile() {
  const { setProfileEdit, setPasswordEdit } = useContext(DataContext);

  return (
    <div>
      <h2 className="font-semibold tracking-wide text-2xl mb-6">
        Account Details
      </h2>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">Full Name:</h3>
          <p>Username</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">Username:</h3>
          <p>Username</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">
            Email Address:
          </h3>
          <p>tester123@gmail.com</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">
            Mobile Number:
          </h3>
          <p>+977 980-0000000</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">
            Date of Birth:
          </h3>
          <p className="tracking-wider">1996/01/01</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">Gender:</h3>
          <p>Male</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <button
          className="bg-[#1A9CB7] text-white h-12 w-46  text-xl cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
          onClick={() => setProfileEdit(true)}
        >
          Edit Profile
        </button>
        <button onClick={() => setPasswordEdit(true)} className="bg-[#1A9CB7] text-white h-12 w-46  cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
          Change Password
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
