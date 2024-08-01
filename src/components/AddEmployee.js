import { useState } from "react";
import axios from "axios";
import { BASE_URL, PROJECT_ID, ENVIRONMENT_ID } from "../utilities/constants";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        BASE_URL,
        {
          name,
          address: {
            line1,
            city,
            country,
            zip,
          },
          email,
          phone,
        },
        {
          headers: {
            projectId: PROJECT_ID,
            environmentId: ENVIRONMENT_ID,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error?.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-center">Add Employee</h1>
        <button
          onClick={() => navigate("/")}
          className="btn bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-200 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="line1" className="block text-sm font-semibold mb-1">
              Address Line 1
            </label>
            <input
              id="line1"
              type="text"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-semibold mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-semibold mb-1"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-semibold mb-1">
              ZIP Code
            </label>
            <input
              id="zip"
              type="number"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 w-full"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
