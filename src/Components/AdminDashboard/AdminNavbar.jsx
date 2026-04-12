import React, { useState } from "react";
import SearchIcon from "../../../public/Icons/search.png";
import LightModeIcon from "../../../public/Icons/sun.png";
import DarkModeIcon from "../../../public/Icons/night-mode.png";
import NotificationIcon from "../../../public/Icons/notification.png";
import UserIcon from "../../../public/Icons/user.png";
import LogoutIcon from "../../../public/Icons/exit.png";
import SettingIcon from "../../../public/Icons/setting.png";
import HelpIcon from "../../../public/Icons/help-web-button.png";
import ProfilePic from "../../../public/Images/profile.webp";

function AdminNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  return (
    <nav className="w-full bg-gray-100 border-b-2 border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 md:px-12 grid grid-cols-3 items-center">
        <h2 className="font-bold text-3xl tracking-wider">
          <span className="text-5xl">M</span>egastore
        </h2>
        <div className="flex h-10 items-center border overflow-hidden rounded-sm">
          <input
            type="text"
            className="outline-none h-full w-full px-4"
            placeholder="Search..."
          />
          <button className="flex items-center justify-center px-4 cursor-pointer h-full w-fit">
            <img
              src={SearchIcon}
              alt="search button icon"
              className="h-5 w-5 object-contain"
            />
          </button>
        </div>
        <div className="flex items-center justify-end gap-6">
          <button
            className="cursor-pointer"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <img
              src={darkMode ? DarkModeIcon : LightModeIcon}
              alt="theme toggler icon"
              className="h-7 w-7 object-contain"
            />
          </button>
          <button className="cursor-pointer">
            <img
              src={NotificationIcon}
              alt="notification button icon"
              className="h-7 w-7 object-contain"
            />
          </button>
          <div className="relative">
            <div
              onClick={() => setUserSetting((prev) => !prev)}
              className="h-12 w-12 rounded-full overflow-hidden cursor-pointer "
            >
              <img
                src={ProfilePic}
                alt="user profile picture"
                className="h-full w-full object-cover"
              />
            </div>
            {userSetting && (
              <ul className="absolute top-full right-0 mt-1 bg-gray-100 h-fit w-56 rounded-sm shadow-sm">
                <li className="flex flex-col gap-2 px-4 py-3 hover:bg-gray-200 cursor-pointer"><h4 className="font-semibold">Welcome Admin</h4><p className="text-sm">Current Balance:  <span className="text-md text-green-500">$5340.36</span></p></li>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer gap-3.5"><img src={UserIcon} alt="user icon" className="h-5 w-5 object-contain" /><span>View Profile</span></li>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer gap-3.5"><img src={SettingIcon} alt="setting button icon" className="h-5 w-5 object-contain" /><span>Settings</span></li>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer gap-3.5"><img src={HelpIcon} alt="help button icon" className="h-5 w-5 object-contain" /><span>Help</span></li>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200 cursor-pointer gap-3.5"><img src={LogoutIcon} alt="logout button icon" className="h-5 w-5 object-contain" /><span>Log Out</span></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
