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
  return (
    <section id='user-dashboard' className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <div className='grid grid-cols-12 border-2 border-gray-400 rounded-2xl'>
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
    </section>
  )
}

export default UserDashboard