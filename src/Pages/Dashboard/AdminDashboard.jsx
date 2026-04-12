import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../Components/AdminDashboard/AdminNavbar'
import CalendarIcon from '../../../public/Icons/calendar.png'
import PlusIcon from '../../../public/Icons/plus.png'
import TrendIcon from '../../../public/Icons/trend.png'
import DollarIcon from '../../../public/Icons/dollar.png'
import DeclineIcon from '../../../public/Icons/decline.png'
import CartIcon from '../../../public/Icons/shopping-bag.png'
import UserIcon from '../../../public/Icons/user.png'
import WalletIcon from '../../../public/Icons/wallet.png'
import RevenueSection from '../../Components/AdminDashboard/RevenueSection'
import BestProduct from '../../Components/AdminDashboard/BestProduct'
import StoreVisit from '../../Components/AdminDashboard/StoreVisit'
import DataContext from '../../Context/DataContext'

function AdminDashboard() {
    const { setAddCategory} = useContext(DataContext);

  return (
    <div className='bg-[#f5f5f5]'>  
    <AdminNavbar />
    <section className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-semibold tracking-wider leading-10'>Good Morning, Admin!</h2>
                <p className='text-lg text-black/75 tracking-wide'>Here's what's happening in your store today.</p>
            </div>
            <div className='flex gap-6 items-center'>
                <div className='cursor-pointer h-12 px-4 w-fit border rounded-sm bg-black text-white overflow-hidden flex items-center gap-3.5'>
                    <span>1 April,2026 - 9 April, 2026</span>
                    <button className='cursor-pointer'><img src={CalendarIcon} alt="claendar button icon" className='h-6 w-6 object-contain invert' /></button>
                </div>
                <div className='cursor-pointer h-12 px-4 w-fit rounded-sm bg-emerald-700 text-white overflow-hidden flex items-center gap-3.5'>
                    <button className='cursor-pointer'><img src={PlusIcon} alt="plus button icon" className='h-4 w-4 object-contain invert' /></button>
                    <span>Add Products</span>
                </div>
                    <div onClick={() => setAddCategory(true)} className='cursor-pointer h-12 px-4 w-fit rounded-sm bg-emerald-700 text-white overflow-hidden flex items-center gap-3.5'>
                        <button className='cursor-pointer'><img src={PlusIcon} alt="plus button icon" className='h-4 w-4 object-contain invert' /></button>
                        <span>Add Category</span>
                    </div>
            </div>
        </div>
    </section>
    <section className='max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-4 gap-6'>
        {/* card 1 */}
        <div className='h-fit w-full border-2 border-gray-200 rounded-sm bg-white px-4 py-4'>
            <div className='flex items-center justify-between mb-6'>
                <span>Total Earnings</span>
                <div className='flex gap-2 items-center'>
                    <img src={TrendIcon} alt="trending icon" className='h-4 w-4 object-contain' />
                    <span className='text-lg text-emerald-600'>+ 16.24%</span>
                </div>
            </div>
                <div className='flex items-end justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl tracking-wide font-semibold'>$5559.23K</h2>
                        <a className='underline' href='#'>View Total Earning</a>
                    </div>
                    <button className='h-12 w-12 flex items-center justify-center border rounded-md bg-emerald-500 border-emerald-500 cursor-pointer'><img src={DollarIcon} alt="dollar icon" className='h-6 w-6 object-contain invert' /></button>
                </div>
        </div>
        {/* card 2 */}
        <div className='h-fit w-full border-2 border-gray-200 rounded-sm bg-white px-4 py-4'>
            <div className='flex items-center justify-between mb-6'>
                <span>Total Order</span>
                <div className='flex gap-2 items-center'>
                    <img src={DeclineIcon} alt="decline icon" className='h-5 w-5 object-contain' />
                    <span className='text-lg text-rose-600'>- 3.57%</span>
                </div>
            </div>
                <div className='flex items-end justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl tracking-wide font-semibold'>36,894</h2>
                        <a className='underline' href='#'>View All Orders</a>
                    </div>
                    <button className='h-12 w-12 flex items-center justify-center border rounded-md bg-sky-500 border-sky-500 cursor-pointer'><img src={CartIcon} alt="dollar icon" className='h-6 w-6 object-contain invert' /></button>
                </div>
        </div>
        {/* card 3 */}
        <div className='h-fit w-full border-2 border-gray-200 rounded-sm bg-white px-4 py-4'>
            <div className='flex items-center justify-between mb-6'>
                <span>Customers</span>
                <div className='flex gap-2 items-center'>
                    <img src={TrendIcon} alt="trending icon" className='h-4 w-4 object-contain' />
                    <span className='text-lg text-emerald-600'>+ 29.08%</span>
                </div>
            </div>
                <div className='flex items-end justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl tracking-wide font-semibold'>183.3K</h2>
                        <a className='underline' href='#'>See Details</a>
                    </div>
                    <button className='h-12 w-12 flex items-center justify-center border rounded-sm bg-amber-500 border-amber-500 cursor-pointer'><img src={UserIcon} alt="user icon" className='h-6 w-6 object-contain invert' /></button>
                </div>
        </div>
        {/* card 4 */}
        <div className='h-fit w-full border-2 border-gray-200 rounded-sm bg-white px-4 py-4'>
            <div className='flex items-center justify-between mb-6'>
                <span>My Balance</span>
                <div className='flex gap-2 items-center'>
                    <span className='text-lg text-gray-500'>+ 0.00%</span>
                </div>
            </div>
                <div className='flex items-end justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl tracking-wide font-semibold'>$165.23K</h2>
                        <a className='underline' href='#'>Withdraw Balance</a>
                    </div>
                    <button className='h-12 w-12 flex items-center justify-center border rounded-sm bg-sky-500 border-sky-500 cursor-pointer'><img src={WalletIcon} alt="wallet icon" className='h-6 w-6 object-contain invert' /></button>
                </div>
        </div>
    </section>
    <RevenueSection />
    <BestProduct />
    <StoreVisit />
    </div>
  )
}

export default AdminDashboard