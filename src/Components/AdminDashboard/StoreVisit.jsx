import React, { useState } from 'react'
import ArrowDownIcon from '../../../public/Icons/down-chevron.png'
import PieChart from './PieChart';
import ReportIcon from '../../../public/Icons/file.png';
import DeleteIcon from '../../../public/Icons/delete.png';
import ConfirmIcon from '../../../public/Icons/check-mark.png';

function StoreVisit() {
    const reportArray = ["Report", "Download Report", "Export as CSV"];
    const [ option, setOption ] = useState(reportArray[0]);
    const [ dropdown, setDropDown ] = useState(false);
    const order =[1, 2, 3, 4, 5, 6];

  return (
    <section id="store-visit" className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12 grid grid-cols-5 gap-6'>
        <div className='h-fit bg-white border-2 border-gray-200 rounded-md py-4 col-span-2'> 
            <div className='px-4 border-b border-gray-200 py-3 flex items-center justify-between mb-6'>
                <h2 className='text-lg font-semibold tracking-wide'>Store Visit by Source</h2>
                <div className='relative'>
                    <button onClick={() => setDropDown(prev => !prev)} className='flex items-center justify-center h-11 w-fit px-4 gap-2 cursor-pointer'>{option}<img src={ArrowDownIcon} alt="arrow down icon" className='h-5 w-5 object-contain' /></button>
                    { dropdown && <div className='absolute top-full mt-1 right-0 bg-gray-100 rounded-sm border-2 border-gray-200 h-fit w-48'>
                        <ul>
                            { reportArray.map((item, index) => <li onClick={() => {
                                setOption(item);
                                setDropDown(false)
                            }} className='px-4 py-3 hover:bg-gray-200 cursor-pointer' key={index}>
                                    {item}
                            </li>)}
                        </ul>
                    </div>}
                </div>
            </div>
            <div className='h-70 py-3'>
            <PieChart />
            </div>
        </div>
        <div className='col-span-3 w-full py-3 bg-white border-2 border-gray-200 rounded-sm'>
            <div className='py-3 px-4 flex items-center justify-between border-b-2 border-gray-200 mb-3'>
                <h2 className='text-lg font-semibold tracking-wide'>Recent Orders</h2>
                <button className='flex items-center justify-center gap-2 px-4 w-fit h-12 cursor-pointer bg-blue-300 text-blue-900 rounded-sm'><img src={ReportIcon} alt="report icon" className='h-5 w-5 object-contain invert' />Generate Report</button>
            </div>
            <div className='py-3 px-4'>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='h-12 border'>
                            <th className='border-r'>Order Id</th>
                            <th className='border-r'>Customer</th>
                            <th className='border-r'>Product</th>
                            <th className='border-r'>Amount</th>
                            <th className='border-r'>Status</th>
                            <th className='border-r'>View Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map(item=> (
                        <tr key={item} className='h-12 border text-center'>
                            <th className='border-r'> <span className='text-blue-600'>#V1212</span></th>
                            <td className='border-r'>Alex Smith</td>
                            <td className='border-r'>Jackets</td>
                            <td className='border-r '> <span className='text-green-600'>$120</span></td>
                            <td className='border-r relative'><OrderStatus id={item} /></td>
                            <td className='border-r'><button className='cursor-pointer text-blue-600'>View Details</button></td>
                            <td className='flex items-center justify-center gap-1 py-1'><button className='cursor-pointer'><img src={ConfirmIcon} alt="order confirm icon" className='h-5 w-5 object-contain' /></button> <button className='cursor-pointer'><img src={DeleteIcon} alt="delete icon " className='h-5 w-5 object-contain' /></button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  )
}

export default StoreVisit

function OrderStatus ({ id }) {
    if( id === 1) {
     return ( <div className='text-xs bg-green-300 w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-xs text-green-600'>Paid</div>)
    } else if (id % 2 === 0) {
        return ( <div className='text-xs bg-yellow-300 w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-xs text-yellow-600'>Pending</div>)
    } else {
        return ( <div className='text-xs bg-red-300 w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-xs text-red-600'>Unpaid</div>)
    }
}