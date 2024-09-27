import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Host } from '../components/constant';
import { useNavigate } from 'react-router';

const EmployeeTable = () => {
  const [edit, setEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState({});

  const [formData, setFormData] = useState({
    id : '',
    Name: '',
    Email: '',
    Mobile: '',
    Designation: '',
    Gender: '',
    Course: [],
    Image: null,
  });

  const employeesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(`${Host}/employee-list`);
        setEmployees(res.data.employeeList);
        console.log(res.data.employeeList)
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };
    getList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        setFormData({ ...formData, Image: file });
        setErrorMessages({ ...errorMessages, Image: '' });
      } else {
        setErrorMessages({ ...errorMessages, Image: 'Only .jpg or .png files are allowed' });
      }
    } else if (type === 'checkbox') {
      const newCourse = formData.Course.includes(value)
        ? formData.Course.filter((c) => c !== value)
        : [...formData.Course, value];
      setFormData({ ...formData, Course: newCourse });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateEmployee = async () => {
    const errors = {};
    
    if (!formData.Name) errors.Name = 'Name is required';
    if (!formData.Email) errors.Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.Email)) errors.Email = 'Invalid email format';
    if (!formData.Mobile) errors.Mobile = 'Mobile number is required';
    else if (!/^\d+$/.test(formData.Mobile)) errors.Mobile = 'Mobile number should be numeric';
    if (!formData.Designation) errors.Designation = 'Designation is required';
    if (!formData.Gender) errors.Gender = 'Gender is required';
    if (!formData.Image) errors.Image = 'Image upload is required';
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        console.log(key)
        formDataToSend.append(key, formData[key]);
      });

      await axios.post(`${Host}/update-employee`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setEdit(false);
      const updatedList = await axios.get(`${Host}/employee-list`);
      setEmployees(updatedList.data.employeeList);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleEditClick = (employee) => {
    setFormData({
      id : employee._id,
      Name: employee.Name,
      Email: employee.Email,
      Mobile: employee.Mobile,
      Designation: employee.Designation,
      Gender: employee.Gender,
      Course: employee.Course,
      Image: employee.Image,
    });
    setEdit(true);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortBy = (key) => {
    const sorted = [...employees].sort((a, b) => {
      return sortOrder === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    setEmployees(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-10 p-5">
      {edit ? (
        <>
          <h2 className="text-2xl font-bold mb-5">Edit Employee</h2>
          <div className="mb-4">
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Employee Name"
              className="border p-2 rounded w-full mb-2"
            />
            {errorMessages.Name && <p className="text-red-500">{errorMessages.Name}</p>}

            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              placeholder="Employee Email"
              className="border p-2 rounded w-full mb-2"
            />
            {errorMessages.Email && <p className="text-red-500">{errorMessages.Email}</p>}

            <input
              type="text"
              name="Mobile"
              value={formData.Mobile}
              onChange={handleInputChange}
              placeholder="Employee Mobile"
              className="border p-2 rounded w-full mb-2"
            />
            {errorMessages.Mobile && <p className="text-red-500">{errorMessages.Mobile}</p>}

            <select
              name="Designation"
              value={formData.Designation}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errorMessages.Designation && <p className="text-red-500">{errorMessages.Designation}</p>}

            <div className="mb-2">
              <label className="mr-4">Gender:</label>
              <input
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === 'Male'}
                onChange={handleInputChange}
              />
              <label className="mr-4">Male</label>
              <input
                type="radio"
                name="Gender"
                value="Female"
                checked={formData.Gender === 'Female'}
                onChange={handleInputChange}
              />
              <label>Female</label>
            </div>
            {errorMessages.Gender && <p className="text-red-500">{errorMessages.Gender}</p>}

            <div className="mb-2">
              <label className="mr-4">Course:</label>
              <input
                type="checkbox"
                name="Course"
                value="MCA"
                checked={formData.Course.includes('MCA')}
                onChange={handleInputChange}
              />
              <label className="mr-4">MCA</label>
              <input
                type="checkbox"
                name="Course"
                value="BCA"
                checked={formData.Course.includes('BCA')}
                onChange={handleInputChange}
              />
              <label className="mr-4">BCA</label>
              <input
                type="checkbox"
                name="Course"
                value="BSC"
                checked={formData.Course.includes('BSC')}
                onChange={handleInputChange}
              />
              <label>BSC</label>
            </div>

            <div className="mb-4">
              <label>Image Upload (Only .jpg or .png):</label>
              <input
                type="file"
                name="Image"
                onChange={handleInputChange}
                accept="image/jpeg, image/png"
                className="border p-2 rounded w-full"
              />
              {errorMessages.Image && <p className="text-red-500">{errorMessages.Image}</p>}
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdateEmployee}>
              Update Employee
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEdit(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
        {/* Employee List Section */}
        <h1 className="text-2xl font-bold mb-5">Employee List</h1>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/create-employee')}
          >
            Create Employee
          </button>
        </div>
        <table className="min-w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Unique ID</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2" onClick={() => sortBy('Name')}>
                Name
              </th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile No</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Create Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{employee._id}</td>
                <td className="border px-4 py-2">
                  {employee.Image && (
                    <img
                      src={`${Host}/${employee.Image}`}
                      alt="Employee"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">{employee.Name}</td>
                <td className="border px-4 py-2 text-blue-500">
                  {employee.Email}
                </td>
                <td className="border px-4 py-2">{employee.Mobile}</td>
                <td className="border px-4 py-2">{employee.Designation}</td>
                <td className="border px-4 py-2">{employee.gender}</td>
                <td className="border px-4 py-2">{employee.Course}</td>
                <td className="border px-4 py-2">
                  {new Date(employee.Createdate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </>
      )}
    </div>
  );
};

export default EmployeeTable;
