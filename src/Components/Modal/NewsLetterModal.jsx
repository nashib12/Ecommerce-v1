import React, { useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import DataContext from '../../Context/DataContext';
import { useLenis } from 'lenis/react';
import { useMutation } from '@tanstack/react-query';
import api from '../../lib/axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import CloseButtonIcon from '../../../public/Icons/close.png'
import { useNavigate } from 'react-router-dom';

const NewsLetterModal = () => {

  const { newsLetterModal, setNewsLetterModal } = useContext(DataContext);
  const lenis = useLenis();
  const navigate = useNavigate();
  const { register, reset, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      'email' : '',
      'has_accepetd' : '',
    }
  });
  
  const mutateSubscription = useMutation({
    mutationFn: (data) => api.post('/newsletter/subscribe', data),
    onSuccess: (response ) => {
      toast.success("Please, check your email to confrim your subscription");
      setNewsLetterModal(false);
      reset();
      navigate(`/newsletter/verify/${response.data.token}`);
    },
    onError: () => {
      toast.error("something went wrong try again");
    }   
  });

  const onSubmit = (data) => {
    mutateSubscription.mutate(data);
  }

  useEffect(() => {
    if (newsLetterModal) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [lenis, newsLetterModal]);

  if (!newsLetterModal) return null;
  return  createPortal(
    (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-999 flex items-center justify-center'>
      <div className='bg-white rounded shadow-2xl px-6 pt-10 pb-8 w-full h-fit max-w-md absolute'  >
          <h2 className='text-xl tracking-wide font-semibold leading-8 mb-6'>Enter your <strong className='text-blue-600'>e-mail</strong> address to subscribe to our newsletter.</h2>
          <button onClick={() => {
            setNewsLetterModal(false);
            reset();
            }} className='absolute top-4 right-6 cursor-pointer'>
              <img src={CloseButtonIcon} alt="close button icon" className='h-6 w-6 object-contain' />
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label htmlFor="email" className='text-lg block mb-2'>Enter your email address <strong className='text-red-600'>*</strong></label>
              <input type="email" id='email' className={`h-12 w-full rounded outline-none border px-4 ${errors.email ? "border-red-500 text-red-500" : "border-black text-black"} `} placeholder='example@example.com' 
                {...register('email', { required: "Please enter your email address.", pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                }})} />
                { errors.email && <p className='mt-2 text-sm text-red-600'>* { errors.email.message}</p>}
            </div>
            <div className='mb-4'>
              <div className='flex gap-3'>
                <input type="checkbox" id='terms' className={`rounded outline-none border cursor-pointer ${ errors.has_accepetd ? "border-red-600" : "border-black"}`}
                  { ...register('has_accepetd',{ required: "Please accept the terms and conditions."})} />
                <label htmlFor="text" className='text-md'>I agree to <a href="#" className='text-blue-600 cursor-pointer'>Terms & conditions</a>. And agree to receive news and emails from <a href="#" className='text-gray-600'>Meagstore.</a></label>
              </div>
                { errors.has_accepetd && <p className='text-sm text-red-600 mt-2'>* { errors.has_accepetd.message}</p>}
            </div>
            <button className='h-12 w-full border rounded cursor-pointer bg-black text-white'>Subscribe to newsletter</button>
          </form>
      </div>
    </section>
    )
  , document.getElementById('modalRoot'));
}

export default NewsLetterModal