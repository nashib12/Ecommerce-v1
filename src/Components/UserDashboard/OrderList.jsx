import { useQuery } from '@tanstack/react-query'
import React from 'react'
import authAPi from '../../lib/authAxios';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const { data: orderItems = [], isPending} = useQuery({
        queryKey: ['orderList'],
        queryFn: () => authAPi.get('/order/list').then(response => response.data.data),
    });

    if (isPending) return <Loader />;

  return (
    <div>
        <h2 className="font-semibold tracking-wide text-lg md:text-2xl mb-3 md:mb-6">
            My Orders
        </h2>
        { orderItems.length === 0 ? (
            <div>
          <p className="md:text-lg">
            There is no item in your order list.{" "}
            <Link to={"/all_products/catalog"} className="text-blue-600">
              Continue Shopping
            </Link>{" "}
          </p>
        </div>
        ) : (
            <table className='table-auto w-full border-collapse' >
                <thead>
                    <tr className='h-16 text-lg bg-gray-200 text-left'>
                        <th className='px-2'>S.n.</th>
                        <th className='px-2'>Order no.</th>
                        <th className='px-2'>Product Name</th>
                        <th className='px-2'>Order Status</th>
                        <th className='px-2'>Total Amount</th>
                        <th className='px-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { orderItems.map((item, index) => (
                        <tr key={`ORDER_ITEM_${item.id}`} className='h-14 cursor-pointer border-b transition-colors duration-300 ease-in-out hover:bg-gray-100'>
                            <td className='font-semibold px-2'>{ index + 1}</td>
                            <td>{ item.order_id}</td>
                           <td className='text-wrap'>{ item.order_items.map(i => i.product_name).join(", ") }</td> 
                           <td>{ item.status === "pending" && (
                            <button className='h-fit w-fit text-sm px-2 py-1 rounded border cursor-pointer bg-green-500 text-white'>
                                Pending
                            </button>
                           )}</td>
                           <td>$ { item.total }</td>
                           <td> 
                                <button className='h-fit w-fit text-sm px-2 py-1 rounded border cursor-pointer'>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default OrderList