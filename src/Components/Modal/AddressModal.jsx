import React, { useContext, useEffect } from 'react'
import DataContext from '../../Context/DataContext'
import { useLenis } from "lenis/react";
import ClosIcon from '../../../public/Icons/close.png';
import { Controller, useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js'
import { v4 as uuidV4 } from 'uuid';

function AddressModal() {
    const { updateAddress, setUpdateAddress } = useContext(DataContext);
    const lenis = useLenis();
    const { register, handleSubmit, reset, formState:{errors}, control } = useForm();
   
    useEffect(() => {
        if (updateAddress) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "auto";
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = "auto";
        };
    }, [lenis, updateAddress]);

    if( !updateAddress ) return null;

    const onSubmit = (data) => {
        console.log({id: uuidV4() ,address : data.address, billingAddress: data.bAddress, contact: data.contact});
        reset();
    }

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-black/60'>
        <div className='px-6 py-12 bg-gray-100 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-fit'>
            <div className='relative mb-6'>
                <h2 className='text-xl font-semibold tracking'>Address Details</h2>
                <button className='absolute top-0 right-0 cursor-pointer' onClick={() => setUpdateAddress(false)}><img src={ClosIcon} alt='close button icon' className='h-7 w-7 object-contain' /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                    <label htmlFor="address">Full Address</label>
                    <input id='address' type="text" placeholder='eg: Lamjung, Gandaki Province, Nepal' className='my-2 h-11 px-4 w-full border outline-none rounded-sm' {...register("address", {required: "Field musn't be empty"})} />
                    {errors.address && <p className='text-sm text-red-600'>* {errors.address.message}</p>}
                </div>
                <div className='mb-6'>
                    <label htmlFor="bAddress">Billing Address</label>
                    <input id='bAddress' type="text" placeholder='eg: Lamjung, Gandaki Province, Nepal' className='my-2 h-11 px-4 w-full border outline-none rounded-sm' {...register("bAddress", {required: "Field musn't be empty"})} />
                    {errors.bAddress && <p className='text-sm text-red-600'>* {errors.bAddress.message}</p>}
                </div>
                <div className='mb-6'>
                    <label htmlFor="contact">Contact Details</label>
                   <div className='my-2'>
                     <Controller name='contact' control={control} rules={{ required : "Contact Info is required", validate: (value) => isValidPhoneNumber(value || "") || "Invalid phone number"}} render={({field}) => (
                        <PhoneInput value={field.value} defaultCountry='np' onChange={field.onChange} />
                    )} />
                   </div>
                   {errors.contact && <p className='text-sm text-red-600'>* {errors.contact.message}</p>}
                </div>
                <button className='w-full h-11 border rounded-md cursor-pointer bg-black text-white'>Update Address</button>
            </form>
        </div>
    </section>
  )
}

export default AddressModal