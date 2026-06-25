import React, { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../Context/DataContext";
import CloseIcon from "../../../public/Icons/close.png";
import { useForm } from "react-hook-form";
import { useLenis } from "lenis/react";
import { createPortal } from "react-dom";
import FileUploadIcon from '../../../public/Icons/image.png';
import { toast } from "react-toastify";
import authAPi from "../../lib/authAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MAX_SIZE = 2;
const ALLOWED_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

function ProfileEditModal() {
  const { modal, setModal, updateData, setUpdateData  } = useContext(DataContext);
  const imageRef = useRef(null);
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, reset,
  } = useForm({ 
    defaultValues: {
      dob: '',
      gender: '',
      phone : '',
      image: null,
    }
  });
  const lenis = useLenis();
  const [ imagePrev, setImagePrev ] = useState(null);

  useEffect(() => {
    if (!updateData) return;
    reset({
      dob: updateData.dob ?? '',
      gender: updateData.gender ?? '',
      phone: updateData.phone ?? '',
    });
    setImagePrev(updateData.image_url);
  }, [updateData, reset]);

  useEffect(() => {
    if(modal) {
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
  }, [lenis, modal])

  const handleIamgeChange = (event) => {
      const image = event.target.files[0];

      if (!ALLOWED_TYPES.includes(image.type)){
        toast.error("Only jpg, png,jpeg or webp file type allowed.");
        return;
      }

      if (image.size > MAX_SIZE * 1024 * 1024) {
        toast.error("Image must be less than or equal to 2MB.");
        return;
      }

      setValue('image', image);
      setImagePrev(URL.createObjectURL(image));
  }

  const handleFormSubmitSuccess = (response) => {
        toast.success(response.data.message);
        setModal('');
        setUpdateData(null);
        setImagePrev(null);
  }

  const updateProfileMutation = useMutation({
    mutationFn: ({ id, formdata }) => authAPi.post(`/profile/update/${id}`, formdata),
    onSuccess: (response) => {
      handleFormSubmitSuccess(response);
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Something went wrong. Try again.');
      setImagePrev(null);
    }
  });

  const createProfileMutation = useMutation({
    mutationFn: ({ formdata }) => authAPi.post('/profile/create', formdata),
    onSuccess: (response) => {
      handleFormSubmitSuccess(response);
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Something went wrong. Try again.');
      setImagePrev(null);
    }
  });

  const onSubmit = (data) => {
    const formdata = new FormData();
    formdata.append('dob', data.dob);
    formdata.append('gender', data.gender);
    formdata.append('phone', data.phone);
    if (data.image instanceof File) {
      formdata.append('image', data.image);
    }
    if(updateData) {
      updateProfileMutation.mutate({ id: updateData.id, formdata});
    } else {
      createProfileMutation.mutate({ formdata });
    }
  };

  if (modal !== 'profile' ) return null;

  const handleModelReset = () => {
    setModal(''); 
    setUpdateData(null);
    reset({
      'dob' : '',
      'gender' : '',
      'phone' : '',
      'image' : null
    });
  };
  return createPortal(
    <section className="fixed bg-black/60 top-0 bottom-0 left-0 right-0">
      <div className="bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md h-fit w-full md:w-100">
        <div className="relative px-6 py-12">
          <h2 className="text-3xl tracking-wide font-semibold">{ updateData ? 'Update' : 'Create'} your profile</h2>
          <button
            className="absolute top-6 right-6 cursor-pointer"
            onClick={handleModelReset}
          >
            <img
              src={CloseIcon}
              alt="close button icon"
              className="h-6 w-6 object-contain"
            />
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="contact" className="block text-lg tacking-wide mt-8 mb-2">
              Contact No:
            </label>
            <input
              id="contact"
              type="text"
              className="outline-none border-b p-2 tracking-wide" placeholder="980-0000000"
              {...register("phone", { required: "Feild Must not be empty" })}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-2">* {errors.phone.message}</p>
            )}
              <div className="mt-8">
                <label
                  htmlFor="dob"
                  className="block text-lg tacking-wide mb-2"
                >
                  Date of Birth:
                </label>
                <input
                  id="dob"
                  type="date"
                  className="outline-none border-b p-2 tracking-wide w-full"
                  {...register("dob", {
                    required: "Feild Must not be empty",
                  })}
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm mt-2">
                    * {errors.dob.message}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <label
                  htmlFor="gender"
                  className="block text-lg tacking-wide mb-2"
                >
                  Gender:
                </label>
                <select id="gender" className="outline-none border-b p-2 tracking-wide w-full" {...register('gender', { required: "Feild Must not be empty"})}>
                  <option value="" hidden>-- Select a gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-600 text-sm mt-2">
                    * {errors.gender.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-8 mt-8">
                <button type="button" className="h-24 w-24 cursor-pointer border rounded flex items-center justify-center" onClick={() => imageRef.current.click()}>
                  <img src={FileUploadIcon} alt="file upload icon" className="h-18 w-18 object-contain" />
                  <input type="file" max={1} ref={imageRef} className="hidden" onChange={handleIamgeChange} />
                </button>
                { imagePrev && <img src={imagePrev} alt="image preview" className="h-24 w-fit object-cover rounded" />}
              </div>
            <button className="mt-8 h-12 w-full cursor-pointer border text-white bg-black transition-colors duration-300 ease-in-out hover:text-black hover:bg-white tracking-wide rounded-md">{ updateData ? 'Update profile' : 'Create Profile'}</button>
          </form>
        </div>
      </div>
    </section>, document.getElementById("modalRoot"),
  );
}

export default ProfileEditModal;
