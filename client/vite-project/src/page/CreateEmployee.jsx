import axios from 'axios';
import React, { useState } from 'react';
import { Host } from '../components/constant';
import { useNavigate } from 'react-router';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Designation: '',
    gender: '',
    Course: [],
    
    Image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      Image: e.target.files[0]
    });
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        Course: [...formData.Course, value]
      });
    } else {
      setFormData({
        ...formData,
        Course: formData.Course.filter((course) => course !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log(formData.Image)
    const form = new FormData();
    form.append('Name', formData.Name);
    form.append('Email', formData.Email);
    form.append('Mobile', formData.Mobile);
    form.append('Designation', formData.Designation);
    form.append('gender', formData.gender);
    form.append('Course', formData.Course.join(', ')); // Send selected courses as a string
    form.append('Createdate', formData.Createdate);
    form.append('Image', formData.Image);

    try {
      const response = await axios.post(`${Host}/create-employee`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Employee created successfully!');
        navigate('/dashboard')
         
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create employee');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Employee</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile:</label>
          <input
            type="text"
            name="Mobile"
            value={formData.Mobile}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Designation:</label>
          <select
            name="Designation"
            value={formData.Designation}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender:</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleInputChange}
                className="form-radio"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course:</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="MCA"
                checked={formData.Course.includes('MCA')}
                onChange={handleCourseChange}
                className="form-checkbox"
              />
              <span className="ml-2">MCA</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                value="BCA"
                checked={formData.Course.includes('BCA')}
                onChange={handleCourseChange}
                className="form-checkbox"
              />
              <span className="ml-2">BCA</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                value="BSc"
                checked={formData.Course.includes('BSc')}
                onChange={handleCourseChange}
                className="form-checkbox"
              />
              <span className="ml-2">BSc</span>
            </label>
          </div>
        </div>

      

        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            name="Image"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Create Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
