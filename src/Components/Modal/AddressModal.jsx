import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Context/DataContext'
import { useLenis } from "lenis/react";
import ClosIcon from '../../../public/Icons/close.png';
import { Controller, useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js'
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAPi from '../../lib/authAxios';

function AddressModal() {
    const { updateData, setUpdateData, modal, setModal } = useContext(DataContext);
    const lenis = useLenis();
    const { register, handleSubmit, reset, formState:{errors}, control, setValue } = useForm({
        defaultValues: {
            label : '',
            phone : '',
            address_line : '',
            city : '',
            state : '',
            postal_code : '',
            is_default : false,
        }
    });
    const [ isDefault, setIsDefault] = useState(false);
    
    useEffect(() => {
        if (!updateData) return;
        reset({
            'label' : updateData.label ?? '',
            'phone' : updateData.phone ?? '',
            'address_line' : updateData.address_line ?? '',
            'city' : updateData.city ?? '',
            'state' : updateData.state ?? '',
            'postal_code' : updateData.postal_code ?? '',
            'is_default' : updateData.is_default ?? false,
        });
        setIsDefault(updateData.is_default ?? false);
    }, [updateData, reset]);
   
    useEffect(() => {
        if (modal) {
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
    }, [lenis, modal]);
    const queryClient = useQueryClient();

    const handleFormSubmitSuccess = (response) => {
        toast.success(response.data.message);
        setModal('');
        setUpdateData(null);
        reset();
        setIsDefault(false);
    };

    const createAddressMutation = useMutation({
        mutationFn : ({ formdata }) => authAPi.post('/address/create', formdata),
        onSuccess: (response) => {
            handleFormSubmitSuccess(response);
            queryClient.invalidateQueries({ queryKey: ['addresses']});
        }, 
        onError: (error) => {
            toast.error( error.response?.data.message || "Something went wrong.");
        }
    });

    const updateAddressMutation = useMutation({
        mutationFn: ({ id, formdata}) => authAPi.post(`address/update/${id}`, formdata),
        onSuccess: (response) => {
            handleFormSubmitSuccess(response);
            queryClient.invalidateQueries({ queryKey: ['addresses']});
        },
        onError: (error) => {
            toast.error(error.response?.data.message || 'Something went wrong during update.');
        }
    });

    const onSubmit = (data) => {
        const formdata = new FormData();
        formdata.append('label', data.label);
        formdata.append('address_line', data.address_line);
        formdata.append('phone', data.phone);
        formdata.append('state', data.state);
        formdata.append('city', data.city);
        formdata.append('postal_code', data.postal_code);
        formdata.append('is_default', data.is_default ? 1 : 0);
        if (updateData) {
            updateAddressMutation.mutate({ id: updateData.id, formdata});
        } else {
            createAddressMutation.mutate({ formdata });
        }
    }
    if( modal !== 'address' ) return null;
    const handleModelReset = () => {
        setModal('');  
        setUpdateData(null); 
        setIsDefault(false); 
        reset({
            'label' :'',
            'address_line' : '',
            'city' : '',
            'phone' : '',
            'state' : '',
            'postal_code' : '',
            'is_default' : 0,
        });
    };

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-black/60'>
        <div className='px-6 py-8 bg-gray-100 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-fit'>
            <div className='relative mb-6'>
                <h2 className='text-xl font-semibold tracking'>{ updateData ? 'Update' : 'Add' } Address Details</h2>
                <button className='absolute top-0 right-0 cursor-pointer' onClick={handleModelReset}>
                    <img src={ClosIcon} alt='close button icon' className='h-7 w-7 object-contain' />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor="address-label">Address Label</label>
                    <input id='address-label' type="text" className='my-2 h-11 px-4 w-full border outline-none rounded-sm' {...register("label", {required: "Field should not be empty."})} />
                    {errors.label && <p className='text-sm text-red-600'>* {errors.label.message}</p>}
                </div>
                {/* <div className='mb-4'>
                    <label htmlFor="contact">Contact Details</label>
                   <div className='my-2'>
                     <Controller name='phone' control={control} rules={{ required : "Field should not be empty.", validate: (value) => isValidPhoneNumber(value || "") || "Invalid phone number"}} render={({field}) => (
                        <PhoneInput value={field.value} defaultCountry='np' onChange={field.onChange} />
                    )} />
                   </div>
                   {errors.phone && <p className='text-sm text-red-600'>* {errors.phone.message}</p>}
                </div> */}
                <div className='mb-4'>
                    <label htmlFor="contact">Contact Details</label>
                    <input type="text" className='my-2 h-11 px-4 w-full border outline-none rounded-sm' {...register('phone', { required: 'Filed should be empty'})} />
                    {errors.phone && <p className='text-sm text-red-600'>* {errors.phone.message}</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="address-line">Full Address</label>
                    <input id='address-line' type="text" className='my-2 h-11 px-4 w-full border outline-none rounded-sm' {...register("address_line", {required: "Field musn't be empty"})} />
                    {errors.address_line && <p className='text-sm text-red-600'>* {errors.address_line.message}</p>}
                </div>
                <div className='flex items-center gap-2 mb-4'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="state">State</label>
                        <input type="text" id='state' className='h-11 px-2 w-full border outline-none rounded-sm' {...register('state', { required : 'Field should not be empty.'})} />
                        { errors.state && <p className='text-sm text-red-600'>* {errors.state.message}</p>}
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="city">City</label>
                        <input type="text" id='city' className='h-11 px-2 w-full border outline-none rounded-sm' {...register('city', { required : 'Field should not be empty.'})} />
                        { errors.city && <p className='text-sm text-red-600'>* {errors.city.message}</p>}
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="postal_code">Postal Code</label>
                    <input type="text" id='postal_code' className='h-11 px-4 w-full border outline-none rounded-sm mt-2' {...register('postal_code')} />
                </div>
                <div className='mb-4 flex items-center gap-4'>
                    <label htmlFor="is_default" className='text-lg'>Set as deafult address ?</label>
                    <div className={`h-fit w-12 p-0.5 flex items-center  rounded-full border transition-colors duration-300 ease-in-out ${ isDefault ? 'bg-blue-500 border-blue-500' : 'bg-gray-400 border-gray-500'} cursor-pointer`} onClick={() => { 
                        const prev = !isDefault;
                        setIsDefault(curr => !curr);
                        setValue('is_default', prev);
                     }}>
                        <div className={`h-4 w-4 rounded-full transform transition-all duration-300 ease-in-out ${ isDefault ? 'bg-white translate-x-6' : 'bg-white/80 translate-x-0'} `} />
                    </div>
                </div>
                <button className='w-full h-11 border rounded-md cursor-pointer bg-black text-white'>{ updateData ? 'Update Address' : 'Add my address'}</button>
            </form>
        </div>
    </section>
  )
}

export default AddressModal