import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios"

export default function DeleteEmployeePage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [employee, setEmployee] = useState(null);
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
      console.log(id)
      const res = await axios.post(`/api/employees/${id}`);
      console.log(res.data)
      const employeeData = res.data.employee;
      // setFormData({
      //   firstName: employee.fname || '',
      //   lastName: employee.lname || '',
      //   position: employee.position || ''
      // });
      setEmployee(employeeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingEmployee(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`/api/employees/delete/${id}`);
      console.log(res.data)
      if (!res.data.success) {
        throw new Error("Failed to delete the employee data")
      }
      // Redirect to employees list page on success
      router.push('/employees');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delete Employee</h1>
          <p className="text-gray-600">Are you sure you want to delete this employee?</p>
        </div>

        {/* Confirmation Container */}
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
                  <h3 className="text-sm font-medium text-red-800">Error deleting employee</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Warning Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>

          {/* Employee Details */}
          {employee && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">First Name:</span>
                  <p className="text-sm text-gray-900">{employee.fname}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Last Name:</span>
                  <p className="text-sm text-gray-900">{employee.lname}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm font-medium text-gray-500">Position:</span>
                  <p className="text-sm text-gray-900">{employee.position}</p>
                </div>
              </div>
            </div>
          )}

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-yellow-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  This action cannot be undone. The employee will be permanently removed from the system.</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </span>
              ) : (
                'Delete Employee'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}