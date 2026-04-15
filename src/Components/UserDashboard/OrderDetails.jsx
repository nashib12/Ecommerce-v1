import React from 'react'
import { Link } from 'react-router-dom'

function OrderDetails({ setDashboardNavigation }) {
  return (
    <div >
        <button onClick={() => setDashboardNavigation("shopping-cart")} className='h-12 w-fit px-4 cursor-pointer bg-black text-white border rounded-sm transition-colors duration-300 ease-in-out hover:bg-white hover:text-black mb-6'>Go Back</button>
        <p className='text-lg tracking-wide mb-6'>Order <span className='text-yellow-600'>#1986</span> was placed on <span className='text-yellow-600'>April 8, 2026</span> and currently is <span className='text-yellow-600'>on hold</span>.</p>
        <h2 className='text-2xl font-semibold tracking-wide mb-6'>Order Details</h2>
        <table className='table-fixed w-full mb-6'>
            <thead>
                <tr className='h-12 border-b text-lg'>
                    <th>Description</th>
                    <th>Pricing Details</th>
                </tr>
            </thead>
            <tbody>
                <tr className='h-32 border-b'>
                    <td className='px-4'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold'>The Alpaca Waffle-Stitch Polo - Dark Wheat × 1</p>
                            <p>Size: XS</p>
                            <p>Color: Red</p>
                        </div>
                    </td>
                    <td className='text-lg tracking-wide px-8'>$180.00</td>
                </tr>
                <tr className='border-b h-16'>
                    <td className='px-4'> Subtotal:</td>
                    <td className='text-lg tracking-wide px-8'>$180.00</td>
                </tr>
                <tr className='border-b h-16'>
                    <td className='px-4'> Shipping Fee:</td>
                    <td className='text-lg tracking-wide px-8'>$10.00 (via Flat rate)</td>
                </tr>
                <tr className='border-b h-16'>
                    <td className='px-4'> Payemnt Method:</td>
                    <td className='tracking-wide px-8'>Direct Bank Transfer</td>
                </tr>
                <tr className='border-b h-16'>
                    <td className='px-4'> Total:</td>
                    <td className='text-lg tracking-wide px-8'>$190.00</td>
                </tr>
            </tbody>
        </table>
        <div className='grid grid-cols-2 gap-12 mb-6'>
            <div className='px-4 py-4 bg-gray-100 rounded-md'>
                <h3 className='text-lg tracking-wide font-semibold'>Billing address </h3>
            </div>
            <div className='px-4 py-4 bg-gray-100 rounded-md'>
                <h3 className='text-lg tracking-wide font-semibold'>Shipping address </h3>
            </div>
        </div>
        <div className='flex justify-end'>
            <Link to={'/check-out'}>
                <button className='cursor-pointer h-12 w-fit px-4 bg-black text-white border transition-colors duration-300 ease-in-out hover:text-black hover:bg-white rounded-sm'>Proceed to Checkout</button>
            </Link>
        </div>
    </div>
  )
}

export default OrderDetails