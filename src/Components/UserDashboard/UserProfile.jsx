import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";

function UserProfile() {
  const { setModal, setPasswordEdit, setUpdateData } = useContext(DataContext);
  const { profile, user } = useAuth();
  const handleProfileEdit = () => {
    setModal('profile');
    if (Object.keys(profile).length > 0) {
      setUpdateData(profile);
    }
  };
  if(!user) return;
  return (
    <>
    <div className="hidden md:block">
      <h2 className="font-semibold tracking-wide text-2xl mb-6">
        Account Details
      </h2>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">Full Name:</h3>
          <p>{ profile?.users?.name}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">
            Email Address:
          </h3>
          <p>{ profile?.users?.email }</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">
            Mobile Number:
          </h3>
          <p>{profile?.phone}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">
            Date of Birth:
          </h3>
          <p className="tracking-wider">{profile?.dob}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg tracking-wider">Gender:</h3>
          <p>{profile?.gender}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <button
          className="bg-[#1A9CB7] text-white h-12 w-46  text-xl cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
          onClick={handleProfileEdit}
        >
          Edit Profile
        </button>
        {/* <button onClick={() => setPasswordEdit(true)} className="bg-[#1A9CB7] text-white h-12 w-46  cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
          Change Password
        </button> */}
      
      </div>
    </div>
    {/* mobile menu start */}
    {/* <div className="md:hidden">
      <h2 className="mb-3 text-lg tracking-wide font-semibold">Account Details</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-400 flex flex-col gap-0.5 rounded-sm text-white px-2 py-1">
            <p className="font-semibold text-lg">Full Name:</p>
            <p>{ profile && profile?.users?.name }</p>
        </div>
        <div className="bg-gray-400 flex flex-col gap-0.5 rounded-sm text-white px-2 py-1 text-sm">
            <p className="font-semibold">Mobile Number:</p>
            <p>{ profile?.phone }</p>
        </div>
        <div className="bg-gray-400 flex flex-col gap-0.5 rounded-sm text-white px-2 py-1">
            <p className="font-semibold text-lg">Gender:</p>
            <p>{ profile?.gender }</p>
        </div>
        <div className="bg-gray-400 flex flex-col gap-0.5 rounded-sm text-white px-2 py-1 col-span-2">
            <p className="font-semibold text-lg">Email Address:</p>
            <p>{ profile && profile?.users?.email }</p>
        </div>
      </div>
          <button
          className="bg-[#1A9CB7] text-white h-11 w-full my-3  text-lg tracking-wider rounded-sm"
          onClick={handleProfileEdit}
        > 
          Edit Profile 
        </button>
        <button onClick={() => setPasswordEdit(true)} className="bg-[#1A9CB7] text-white h-11 w-full rounded-sm text-lg">
          Change Password
        </button>
    </div> */}
    {/* mobilemenu end */}
    </>
  );
}

export default UserProfile;
