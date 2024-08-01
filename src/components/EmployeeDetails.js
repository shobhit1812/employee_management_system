/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, PROJECT_ID, ENVIRONMENT_ID } from "../utilities/constants";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const getEmployeeDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          projectId: PROJECT_ID,
          environmentId: ENVIRONMENT_ID,
        },
      });
      setEmployee(response?.data);
    } catch (error) {
      console.error(error.response?.data || error?.message);
    }
  };

  const deleteEmployee = async () => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          projectId: PROJECT_ID,
          environmentId: ENVIRONMENT_ID,
        },
        data: {},
      });
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error?.message);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [id]);

  if (!employee)
    return <div className="m-5 text-center text-4xl">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          className="btn bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <button
          className="btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={deleteEmployee}
        >
          Delete
        </button>
      </div>
      <h1 className="text-center text-4xl mb-5">Employee Details</h1>
      <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
        <h2 className="text-2xl mb-2">
          <span className="font-semibold">Name:</span> {employee?.name}
        </h2>
        <p className="text-lg mb-2">
          <span className="font-semibold">Employee ID:</span> {employee?._id}
        </p>
        <div className="mb-2">
          <h3 className="font-semibold">Address:</h3>
          <p className="px-5">
            <span className="font-semibold">Line1: </span>
            {employee?.address?.line1}
          </p>
          <p className="px-5">
            <span className="font-semibold">City: </span>
            {employee?.address?.city}
          </p>
          <p className="px-5">
            <span className="font-semibold">Country: </span>
            {employee?.address?.country}
          </p>
          <p className="px-5">
            <span className="font-semibold">Zip Code: </span>
            {employee?.address?.zip}
          </p>
        </div>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {employee?.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {employee?.phone}
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
