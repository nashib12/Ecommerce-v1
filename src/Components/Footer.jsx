import React from 'react'
import ArrowRightImg from '../../public/Icons/paper-plane.png'
import FacebookImg from '../../public/Icons/facebook.png'
import InstagramImg from '../../public/Icons/instagram.png'
import TwitterImg from '../../public/Icons/twitter.png'
import TikTokImg from '../../public/Icons/tik-tok.png'
import PaymentLogo1 from '../../public/Images/Logo/aex.svg'
import PaymentLogo2 from '../../public/Images/Logo/paypal.svg'
import PaymentLogo3 from '../../public/Images/Logo/mastercard.svg'
import PaymentLogo4 from '../../public/Images/Logo/esewa.png'
import PaymentLogo5 from '../../public/Images/Logo/khalti.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-black w-full'>
        <div className='max-w-7xl mx-auto px-6 py-6 md:py-12 md:px-12'>
            <div className='grid grid-cols-1 gap-y-3 gap-x-0 md:grid-cols-4 md:gap-6 text-white'>
                <div>
                    <h3 className='text-2xl mb-5 uppercase tracking-wide'>Find It Fast</h3>
                    <ul>
                        <li className='mb-3 cursor-pointer'><a href="/#">About Us</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Top Searches</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Privacy Policy</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Terms And Condition</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Testimonials</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-2xl mb-5 uppercase tracking-wide'>Customer Care</h3>
                    <ul>
                        <li className='mb-3 cursor-pointer'><Link to={'/my-account'}>My Account</Link></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Track Order</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Shop</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Wishlist</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Returns/Exchnage</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-2xl mb-5 uppercase tracking-wide'>Other Business</h3>
                    <ul>
                        <li className='mb-3 cursor-pointer'><a href="/#">Partnership Program</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Associate Program</a></li>
                        <li className='mb-3 cursor-pointer'><a href="/#">Wholesale Socks</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-2xl mb-5 uppercase tracking-wide'>Newsletter</h3>
                    <div className='flex border-8 h-12 bg-white mb-3 w-full justify-between px-2'>
                        <input type="email" className='h-full outline-none text-black' placeholder='Email Address'  />
                        <button className='flex items-center justify-center cursor-pointer'><img src={ArrowRightImg} alt="Right arrow" className='h-5 w-5 object-contain' /></button>
                    </div>
                    <span className='leading-7 tracking-wide'>* By Signing up here I agree to receive Negastore email newsletter.</span>
                    <ul className='mt-6 flex gap-8'>
                        <li><a href="#"><img src={FacebookImg} alt="facebook icon" className='h-5 w-5 object-contain invert' /></a></li>
                        <li><a href="#"><img src={InstagramImg} alt="instagram icon" className='h-5 w-5 object-contain invert' /></a></li>
                        <li><a href="#"><img src={TwitterImg} alt="twitter icon" className='h-5 w-5 object-contain invert' /></a></li>
                        <li><a href="#"><img src={TikTokImg} alt="tik-tok icon" className='h-5 w-5 object-contain invert' /></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='max-w-7xl mx-auto px-6 py-6 md:px-12 border-t-2 border-gray-200 flex flex-col md:flex-row items-center gap-6 md:justify-between'>
           <div className='flex flex-col gap-2 text-white text-center md:text-start'>
            <p> &copy; &nbsp;{new Date().getFullYear()}. All rights Reserved</p>
            <p>Crafted At. <a href="https://sait.com.np/" target='blank'>S.A I.T Solution Nepal.</a></p>
           </div>
           <div className='flex flex-col gap-2 text-white text-center md:text-start'>
                <p>Payment Partners</p>
            <ul className='flex gap-6 items-center'>
                <li><img src={PaymentLogo1} alt="payment partner logo" className='h-7 w-7 object-contain' /></li>
                <li><img src={PaymentLogo2} alt="payment partner logo" className='h-6 w-6 object-contain' /></li>
                <li><img src={PaymentLogo3} alt="payment partner logo" className='h-8 w-8 object-contain' /></li>
                <li><img src={PaymentLogo4} alt="payment partner logo" className='h-10 w-16 object-contain' /></li>
                <li><img src={PaymentLogo5} alt="payment partner logo" className='h-10 w-16 object-contain' /></li>
            </ul>
           </div>
        </div>
    </footer>
  )
}

export default Footer