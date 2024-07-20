'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import './AddSchoolForm.css';

export default function AddSchoolForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/showSchool'); // Redirect to schools list page
      } else {
        console.error('Failed to add school');
      }
    } catch (error) {
      console.error('Error adding school:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
  
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">School Name</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "School name is required" })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1">Phone</label>
        <input
          id="phone"
          type="tel"
          {...register("phone", { required: "Phone number is required" })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
      </div>

      <div>
        <label htmlFor="address" className="block mb-1">Address</label>
        <textarea
          id="address"
          {...register("address", { required: "Address is required" })}
          className="w-full px-3 py-2 border rounded"
        ></textarea>
        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
      </div>

      <div>
        <label htmlFor="image" className="block mb-1">School Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add School
      </button>
     
    </form>
  );
}