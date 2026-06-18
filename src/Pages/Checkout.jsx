import React, { useContext, useEffect } from 'react'
import ProductImg from '../../public/Images/ProductImg/card1.webp'
import DataContext from '../Context/DataContext'
import CartContext from '../Context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { deliveryFee } = useContext(DataContext);
    const { cartItems, calculatedTotal, subTotal, discount, couponCode, dispatch, setDiscount } = useContext(CartContext);

    useEffect(() => {
        async function checkCartStatus () {
            const payload = {
                carts: cartItems.map(item => ({
                    variantId: item.variantId,
                    quantity: item.quantity,
                    name: item.productName,
                }))
            };
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cart/checkStatus', payload);
                if (response.status === 200) {
                    toast.success(response.data.messsage);
                }
            } catch (error) {
                if(error.response?.status === 422) {
                    const validationError = error.response.data.errors;
                    toast.error(validationError.message[0]);
                }
            }
        };
        checkCartStatus();
    }, [cartItems]);
    const navigate = useNavigate();

    const handleOrder = async () => {
        const grouped = Object.values(
            cartItems.reduce((acc, { productId, variantId, quantity}) => {
                if (!acc[productId]) {
                    acc[productId] = { productId, items: []};
                }
                acc[productId].items.push({ variantId, quantity });
                return acc;
            }, {})
        );
        const payload = {
            coupon_code : couponCode,
            notes : 'This is notes',
            carts : grouped,
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create-order', payload);
            if (response.status === 200) {
                toast.success(response.data.message);
                dispatch({ type: "carts/clearCart"});
                setDiscount(0);
                navigate('/');
            }
        } catch (error) {
            if(error.response?.status === 422) {
                console.log(error);
            }
        }
    };

    if(cartItems.length === 0 || !cartItems ) return null; 
  return (
    <section id='check-out' className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <div className='grid grid-cols-12 grid-rows-2 gap-6'>
            <div className='col-span-8 shadow-sm h-56'>
                <div className='pt-6 pb-3 px-6 bg-gray-100 flex items-center justify-between'>
                    <h2 className='text-2xl font-semibold tracking-wide'>Shipping Address</h2>
                    <button className='text-lg cursor-pointer h-10 w-fit px-6 bg-black text-white transition-colors duration-300 ease-in-out border hover:bg-white hover:text-black'>Edit</button>
                </div>
                <div className='py-3 px-6'>
                    <p className='text-xl font-semibold tracking-wide mb-3'>Full name</p>
                    <p className='text-lg tracking-wide mb-3'>+977 980-0000000</p>
                    <div className='flex gap-4 items-center'>
                        <p>Suidbar Bus Park Area, Sundarbazar, Gandaki Province</p>
                        <button className='bg-[#F85606] text-white uppercase rounded-full h-7 text-sm px-4 w-fit'>Home</button>
                    </div>
                </div>
            </div>
            <div className='col-span-4 row-span-2 px-6 py-6 shadow-sm bg-gray-100 h-fit'>
                <h2 className='text-2xl font-semibold tracking-wide mb-6'>Order Detail</h2>
                <div className='flex justify-between text-gray-500 text-lg mb-3'>
                    <p>Items Total ({cartItems.length} item)</p>
                    <p>$ {subTotal.toFixed(2)}</p>
                </div>
                <div className='flex justify-between text-gray-500 text-lg mb-3'>
                    <p>Shipping Fee</p>
                    <p>$ {deliveryFee[0].flat_rate_fee}</p>
                </div>
                { discount > 0 && (
                    <div className='flex justify-between text-red-500 text-lg mb-3'>
                        <p>Discount</p>
                        <p>- $ {discount.toFixed(2)}</p>
                </div>
                )}
                <div className='flex justify-between text-gray-500 text-lg mb-1 border-t pt-6'>
                    <p>Total</p>
                    <p className='text-2xl text-[#F85606] tracking-wide'>$ {calculatedTotal.toFixed(2)}</p>
                </div>
                    <p className='text-end text-sm mb-6'>All Tax included</p>
                    <button onClick={() => handleOrder()} 
                        className=' mb-6 h-12 w-full cursor-pointer bg-black text-white border text-lg tracking-wide transition-colors duration-300 ease-in-out hover:text-black hover:bg-white rounded-sm'>Proceed to Pay</button>
                    <div className='flex justify-between items-end'>
                        <p className='text-lg'>Invoice and Contact Info</p>
                        <button className='h-9 w-fit px-4 border bg-black text-white tracking-wide transition-colors duration-300 ease-in-out hover:text-black hover:bg-white cursor-pointer'>Edit</button>
                    </div>
            </div>
            <div className='col-span-8 shadow-sm h-fit'>
                <div className='py-6 bg-gray-100 mb-6 px-6'>
                    <h2 className='text-2xl font-semibold tracking-wide'>Package Summary</h2>
                </div>
                {cartItems.map(item => (
                <div key={item.id} className='flex gap-6 justify-between mb-6 px-6'>
                    <img src={item.productImage} alt="product image" className='h-32 w-32 object-contain' />
                    <div className='flex flex-col gap-1'>
                        <p className='tracking-wide text-lg'>{item.productName} x {item.quantity}</p>
                        <p>Size: {item.productSize}</p>
                        <p>Color: {item.productColor}</p>
                    </div>
                    <p className='text-lg tracking-wide'>$ {item.subTotal}</p>
                </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Checkout