import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext';

function OrderDetails({ setDashboardNavigation }) {
    const { cartDetail } = useContext(CartContext);
    const { defaultAddress } = useAuth();
    
  return (
    <div >
        <button onClick={() => setDashboardNavigation("shopping-cart")} className='h-12 w-fit px-4 cursor-pointer bg-black text-white border rounded-sm transition-colors duration-300 ease-in-out hover:bg-white hover:text-black mb-6'>Go Back</button>
        <div className='mb-6 flex items-center gap-4'>
            <p className='text-lg tracking-wide'>Cart details for <span className='text-yellow-600'>{cartDetail.productName}</span>.</p>
            <button className='text-yellow-600 w-fit h-fit rounded border px-2 py-2'>Pending</button>
        </div>
        <h2 className='text-2xl font-semibold tracking-wide mb-6'>Order Details</h2>
        <table className='table-auto w-full mb-6'>
            <thead>
                <tr className='h-14 border-b text-lg '>
                    <th>Description</th>
                    <th>Pricing Details</th>
                </tr>
            </thead>
            <tbody>
                <tr className='h-32 border-b'>
                    <td className='px-4'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold'>{ cartDetail.productName} × { cartDetail.quantity}</p>
                            <p>Size: {cartDetail.productSize}</p>
                            <p>Color: {cartDetail.productColor}</p>
                        </div>
                    </td>
                    <td className='text-lg tracking-wide px-8'>$ {cartDetail.productPrice}</td>
                </tr>
                <tr className='border-b h-16'>
                    <td className='px-4'> Payemnt Method:</td>
                    <td className='tracking-wide px-8'>Direct Bank Transfer</td>
                </tr>
                <tr className='border-b h-16'>
                    <td className='px-4'> Total:</td>
                    <td className='text-lg tracking-wide px-8'>$ {cartDetail.subTotal.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
        <div className='grid grid-cols-2 gap-12 mb-6'>
            <div className='px-4 py-4 bg-gray-100 rounded-md'>
                <h3 className='text-lg tracking-wide font-semibold mb-6'>Billing address </h3>
                <p className='text-xl'>{ defaultAddress?.address_line }</p>
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