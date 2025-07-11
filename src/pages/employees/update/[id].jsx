import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios"

export default function UpdateEmployeePage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchingEmployee, setFetchingEmployee] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employee data on component mount
  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setFetchingEmployee(true);
      //console.log(id)
      const res = await axios.post(`/api/employees/${id}`);
      //console.log(res.data)
      const employee = res.data.employee;
      setFormData({
        firstName: employee.fname || '',
        lastName: employee.lname || '',
        position: employee.position || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingEmployee(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(formData)
      const { firstName, lastName, position } = formData
      const res = await axios.post(`/api/employees/update/${id}`, { fname: firstName, lname: lastName, position, id });
      console.log(res.data)
      // Redirect to employees list page on success
      if (res.data.success) {
        router.push('/employees');
      } else {
        throw new Error("Failed to update employee")
      }
      //router.push('/employees');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/employees');
  };

  if (fetchingEmployee) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading employee details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Employee</h1>
          <p className="text-gray-600">Edit the information below to update the employee</p>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error updating employee</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter last name"
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter position"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  'Update Employee'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}