import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, PROJECT_ID, ENVIRONMENT_ID } from "../utilities/constants";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const navigate = useNavigate();

  const getData = async (newOffset) => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          projectId: PROJECT_ID,
          environmentId: ENVIRONMENT_ID,
        },
        params: {
          limit,
          offset: newOffset,
        },
      });

      const newData = response?.data?.data || [];
      setEmployeesData((prevData) => [...prevData, ...newData]);

      if (newData.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error.response?.data || error?.message);
    }
  };

  useEffect(() => {
    getData(offset);
  }, [offset]);

  const handleCardClick = (id) => {
    navigate(`/employee/details/${id}`);
  };

  const loadMoreData = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">List of Employees</h1>
        <Link to="/employee/add">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Employee
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        {employeesData.length === 0 ? (
          <h1 className="text-center text-gray-500 text-2xl">
            No Employees in the system
          </h1>
        ) : (
          employeesData.map((item) => (
            <div
              key={item?._id}
              className="p-4 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition duration-200 cursor-pointer"
              onClick={() => handleCardClick(item?._id)}
            >
              <h2 className="text-lg font-medium text-gray-700 mb-1 cursor-pointer">
                EMP_ID: {item?._id}
              </h2>
              <p className="text-lg font-semibold text-gray-700 cursor-pointer">
                Name: {item?.name}
              </p>
            </div>
          ))
        )}
      </div>
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreData}
            className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
