import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Context/DataContext'
import { useLenis } from 'lenis/react';
import { createPortal } from 'react-dom';
import CloseIcon from '../../../public/Icons/close.png';
import EyeIcon from '../../../public/Icons/view.png';
import { useForm } from 'react-hook-form';

function ChangePasswordModal() {
    const {passwordEdit, setPasswordEdit} = useContext(DataContext);
    const lenis = useLenis();
    const [password, setPassword] = useState("password");
    const [cPassword, setCPassword] = useState("password");
    const {register, handleSubmit, formState:{errors}, watch, reset} = useForm();

    useEffect(() => {
        if (passwordEdit) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "auto";
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = "auto";
        }

    }, [passwordEdit, lenis]);

    if (!passwordEdit) return null;

    const currPassword = watch("password", "");
    const onSubmit = (data) => {
        window.alert(data);
        reset();
    }

  return createPortal(
    <section className='fixed bg-black/60 top-0 left-0 right-0 bottom-0'>
        <div className='h-fit w-full md:w-100 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white'>
            <div className='relative px-6 py-12'>
                <button className='absolute top-6 right-6 cursor-pointer' onClick={() => setPasswordEdit(false)}><img src={CloseIcon} alt="close button icon" className='h-7 w-7 object-contain' /></button>
                <h2 className='text-center mb-6 text-xl font-semibold tracking-wide'>Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <label htmlFor="password">Enter New Password</label>
                    <div className='relative w-full h-12 mb-6'>
                        <input type={password} className='outline-none h-full pb-1 border-b  w-full ' {...register("password", {required:"Field must not be empty"})} />
                        <button onClick={(event) => {
                            event.preventDefault();
                            setPassword(curr => curr === "password" ? "text" : "password");}} className='absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer'><img src={EyeIcon} alt="eye icon" className='h-5 w-5 object-contain' /></button>
                        {errors.password && <p className='text-sm text-red-500'>* {errors.password.message}</p>}
                    </div>
                    <label htmlFor="password">Confirm Password</label>
                    <div className='relative w-full h-12 mb-6'>
                        <input type={cPassword} className='outline-none h-full pb-1 border-b  w-full ' {...register("cPassword", {required:"Field must not be empty", validate: (value) => value === currPassword || "Password donot match"})} />
                        <button onClick={(event) => {
                            event.preventDefault();
                            setCPassword(curr => curr === "password" ? "text" : "password");}} className='absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer'><img src={EyeIcon} alt="eye icon" className='h-5 w-5 object-contain' /></button>
                        {errors.cPassword && <p className='text-sm text-red-500'>* {errors.cPassword.message}</p>}
                    </div>
                    <button className='h-12 w-full border bg-black text-white cursor-pointer rounded-sm transition-colors duration-300 ease-in-out hover:bg-white hover:text-black tracking-wide text-lg'>Change Password</button>
                </form>
            </div>
        </div>
    </section>, document.getElementById("modalRoot"),
  )
}

export default ChangePasswordModal