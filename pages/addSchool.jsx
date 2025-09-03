import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const indianStates = [
  'Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'
].sort();

export default function AddSchool() {
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image' && value.length) formData.append(key, value[0]);
        else formData.append(key, value);
      });
      const res = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message || 'School added successfully');
        reset();
        setImagePreview(null);
        setSuccessMessage('School added successfully!');
      } else {
        alert(`Error: ${result.error || 'Unknown error occurred'}`);
        setSuccessMessage(null);
      }
    } catch (err) {
      alert(`Unexpected error: ${err.message}`);
      setSuccessMessage(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="container">
      <header>
		<Link href="/" legacyBehavior>
		  <a className="home-button" aria-label="Go to Home Page">Home</a>
		</Link>
      </header>
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="fields-grid">
          <div className="row">
            <label>Name </label>
            <div>
              <input
                placeholder="School name"
                {...register('name', { required: 'Name is required', maxLength: 100 })}
                type="text"
                maxLength={100}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
          </div>
          <div className="row">
            <label>Address </label>
            <div>
              <textarea
                placeholder="School address"
                {...register('address', { required: 'Address required', maxLength: 300 })}
                maxLength={300}
              />
              {errors.address && <p className="error">{errors.address.message}</p>}
            </div>
          </div>
          <div className="row">
            <label>City </label>
            <div>
              <input
                placeholder="City"
                {...register('city', { required: 'City required', maxLength: 50 })}
                type="text"
                maxLength={50}
              />
              {errors.city && <p className="error">{errors.city.message}</p>}
            </div>
          </div>
          <div className="row">
            <label>State </label>
            <div>
              <select
                {...register('state', { required: 'State required' })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select state
                </option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="error">{errors.state.message}</p>}
            </div>
          </div>
          <div className="row">
            <label>Contact </label>
            <div>
              <input
                placeholder="Contact number"
                {...register('contact', {
                  required: 'Contact required',
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: 'Enter valid contact (10-15 digits)',
                  },
                })}
                type="tel"
                maxLength={15}
              />
              {errors.contact && <p className="error">{errors.contact.message}</p>}
            </div>
          </div>
          <div className="row">
            <label>Email </label>
            <div>
              <input
                placeholder="Email address"
                {...register('email_id', {
                  required: 'Email required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Enter valid email',
                  },
                })}
                type="email"
                maxLength={100}
              />
              {errors.email_id && <p className="error">{errors.email_id.message}</p>}
            </div>
          </div>
          <div className="row">
            <label>School Image </label>
            <div>
              <input
                {...register('image')}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.image && <p className="error">{errors.image.message}</p>}
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="preview" />
                </div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <div className="spinner" /> Submitting...
            </span>
          ) : (
            'Add School'
          )}
        </button>
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
      <style jsx>{`
        .container {
          max-width: 650px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fcfcfc;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgb(0 0 0 / 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        header {
          margin-bottom: 1rem;
          display: flex;
          justify-content: flex-start;
        }
        .home-button {
          background: #1565c0;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 700;
          transition: background 0.3s ease;
          user-select: none;
        }
        .home-button:hover,
        .home-button:focus {
          background: #0d47a1;
        }
        h1 {
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 700;
          color: #222;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fields-grid {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .row {
          display: grid;
          grid-template-columns: 170px 1fr;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }
        label {
          font-weight: 700;
          color: #333;
          font-size: 1.05rem;
          margin-bottom: 0 !important;
        }
        input,
        textarea,
        select {
          width: 100%;
          max-width: 380px;
          border: 2px solid #ddd;
          border-radius: 8px;
          padding: 0.8rem 1rem;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          font-family: inherit;
          box-sizing: border-box;
          background: #fff;
        }
        textarea {
          min-height: 90px;
          resize: vertical;
        }
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #1565c0;
          box-shadow: 0 0 6px #1565c0aa;
        }
        .error {
          margin-top: 0.25rem;
          color: #d32f2f;
          font-weight: 600;
          font-size: 0.9rem;
          font-style: italic;
        }
        .submit-button {
          margin-top: 2rem;
          background: linear-gradient(135deg, #1e88e5, #1565c0);
          padding: 0.6rem 2.5rem;
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgb(30 136 229 / 0.4);
          transition: background 0.3s ease;
          align-self: center;
          min-width: 160px;
          text-align: center;
        }
        .submit-button:hover:enabled {
          background: linear-gradient(135deg, #1565c0, #0d47a1);
        }
        .submit-button:disabled {
          background: #90caf9;
          cursor: not-allowed;
          box-shadow: none;
        }
        .success {
          margin-top: 1.5rem;
          font-weight: 700;
          color: #2e7d32;
          text-align: center;
          width: 100%;
        }
        .image-preview {
          margin-top: 1rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 6px 12px rgb(0 0 0 / 0.1);
          max-width: 380px;
          height: 170px;
        }
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 600px) {
          .container {
            margin: 1rem;
            padding: 1rem;
          }
          .fields-grid {
            padding: 0;
          }
          .row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            margin-bottom: 1.1rem;
          }
          label {
            margin-bottom: 0.4rem !important;
          }
          input,
          textarea,
          select {
            max-width: 100%;
            min-width: 0;
            padding: 0.8rem 0.7rem;
            font-size: 1rem;
          }
          .image-preview {
            height: 170px;
            max-width: 100%;
          }
        }
        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #1565c0;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
