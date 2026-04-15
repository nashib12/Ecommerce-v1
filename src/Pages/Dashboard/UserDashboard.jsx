import React, { useState } from 'react'
import ProfileImg from '../../../public/Images/profile.webp'
import UserIcon from '../../../public/Icons/user.png'
import WishlistIcon from '../../../public/Icons/wishlist.png'
import LogoutIcon from '../../../public/Icons/exit.png'
import LoactionIcon from '../../../public/Icons/location.png'
import CartIcon from '../../../public/Icons/shopping-cart.png'
import UserProfile from '../../Components/UserDashboard/UserProfile'
import AddressBook from '../../Components/UserDashboard/AddressBook'
import ShoppingCart from '../../Components/UserDashboard/ShoppingCart'
import Wishlist from '../../Components/UserDashboard/Wishlist'
import { Link } from 'react-router-dom'
import OrderDetails from '../../Components/UserDashboard/OrderDetails'

function UserDashboard() {
    const [ dashboardNavigation, setDashboardNavigation ] = useState("user-profile");
    const [ dropdown, setDropdown ] = useState("profile");
  return (
    <section id='user-dashboard' className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <div className='hidden md:grid grid-cols-12 border-2 border-gray-400 rounded-2xl'>
            <div className='col-span-3 border-r border-gray-400'>
                <div className='flex flex-col items-center justify-center py-6'>
                <img src={ProfileImg} alt="profile picture default" className='h-36 w-36 object-cover rounded-full' />
                <h2 className='text-2xl font-semibold tracking-wide '>Username</h2>
                </div>
                <div className='border-t border-gray-400 px-6 pt-6 flex flex-col gap-4'>
                    <div className='flex items-center gap-3 cursor-pointer mb-6' onClick={() => setDashboardNavigation("user-profile")}>
                        <img src={UserIcon} alt="user icon" className='h-7 w-7 object-contain' />
                        <h3 className='text-2xl tracking-wide text-gray-400'>Profile</h3>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer mb-6' onClick={() => setDashboardNavigation("address-book")}>
                        <img src={LoactionIcon} alt="address icon" className='h-7 w-7 object-contain' />
                        <h3 className='text-2xl tracking-wide text-gray-400'>Address Book</h3>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer mb-6' onClick={() => setDashboardNavigation("shopping-cart")}>
                        <img src={CartIcon} alt="shopping cart icon" className='h-7 w-7 object-contain' />
                        <h3 className='text-2xl tracking-wide text-gray-400'>Shopping cart</h3>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer mb-6' onClick={() => setDashboardNavigation("wishlist")}>
                        <img src={WishlistIcon} alt="wishlist icon" className='h-7 w-7 object-contain' />
                        <h3 className='text-2xl tracking-wide text-gray-400'>My Wishlist</h3>
                    </div>
                    <Link to={'/authentication/user-login'}>
                    <div className='flex items-center gap-3 cursor-pointer mb-6'>
                        <img src={LogoutIcon} alt="logout icon" className='h-6 w-6 object-contain' />
                        <h3 className='text-2xl tracking-wide text-gray-400'>Log Out</h3>
                    </div>
                    </Link>
                </div>
            </div>
            <div className='col-span-9 px-12 py-12'>
                { dashboardNavigation === "user-profile" &&  <UserProfile />}
                { dashboardNavigation === "address-book" &&  <AddressBook />}
                { dashboardNavigation === "shopping-cart" &&  <ShoppingCart setDashboardNavigation={setDashboardNavigation} />}
                { dashboardNavigation === "wishlist" &&  <Wishlist />}
                {dashboardNavigation === "order-details" && <OrderDetails setDashboardNavigation={setDashboardNavigation} />}

            </div>
        </div>
        <div className='md:hidden border-2 border-gray-400 rounded-lg py-6'>
            <div className='flex items-center gap-3 px-2 border-b-2 border-gray-400'>
                <div className='h-20 w-20 rounded-full overflow-hidden'>
                <img src={ProfileImg} alt="user profile image" className='h-full w-full object-cover' />
                </div>
                <div>
                    <h2 className='text-lg tracking-wide font-semibold'>Username</h2>
                    <p>tester@gmail.com</p>
                </div>
            </div>
            <div className='px-6 border-b-2 border-gray-400 py-6'>
                <div className={`flex items-center gap-2 cursor-pointer ${dropdown === "profile" ? "mb-3 border-b-2 border-gray-400 pb-3" : "mb-0 border-0"}`} onClick={() => setDropdown(curr => curr === "profile" ? null : "profile")}>
                    <img src={UserIcon} alt="user icon" className='h-6 w-6  object-contain' />
                    <h3 className='tracking-wide font-semibold'>User Profile</h3>
                </div>
                {dropdown === "profile" && <UserProfile />}
            </div>
            <div className='px-6 border-b-2 border-gray-400 py-6'>
                <div className={`flex items-center gap-2 cursor-pointer ${dropdown === "address" ? "mb-3 border-b-2 border-gray-400 pb-3" : "mb-0 border-0"}`} onClick={() => setDropdown(curr => curr === "address" ? null : "address")}>
                    <img src={LoactionIcon} alt="location icon" className='h-6 w-6  object-contain' />
                    <h3 className='tracking-wide font-semibold'>Address Book</h3>
                </div>
                {dropdown === "address" && <AddressBook />}
            </div>
            <div className='px-6 border-b-2 border-gray-400 py-6'>
                <div className={`flex items-center gap-2 cursor-pointer ${dropdown === "shopping-cart" ? "mb-3 border-b-2 border-gray-400 pb-3" : "mb-0 border-0"}`} onClick={() => setDropdown(curr => curr === "shopping-cart" ? null : "shopping-cart")}>
                    <img src={CartIcon} alt="shopping cart icon" className='h-6 w-6  object-contain' />
                    <h3 className='tracking-wide font-semibold'>Shopping Cart</h3>
                </div>
                {dropdown === "shopping-cart" && <ShoppingCart setDashboardNavigation={setDashboardNavigation} />}
            </div>
            <div className='px-6 border-b-2 border-gray-400 py-6'>
                <div className={`flex items-center gap-2 cursor-pointer ${dropdown === "wishlist" ? "mb-3 border-b-2 border-gray-400 pb-3" : "mb-0 border-0"}`} onClick={() => setDropdown(curr => curr === "wishlist" ? null : "wishlist")}>
                    <img src={WishlistIcon} alt="wishlist icon" className='h-6 w-6  object-contain' />
                    <h3 className='tracking-wide font-semibold'>My Wishlist</h3>
                </div>
                {dropdown === "wishlist" && <Wishlist />}
            </div>
             <Link to={'/authentication/user-login'}>
            <div className='px-6 pt-6 flex items-center gap-2 cursor-pointer'>
                    <img src={LogoutIcon} alt="logout icon" className='h-6 w-6  object-contain' />
                    <h3 className='tracking-wide font-semibold '>Log Out</h3>
            </div>
            </Link>
        </div>
    </section>
  )
}

export default UserDashboard