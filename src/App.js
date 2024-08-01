import Home from "./components/Home";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEmployee from "./components/AddEmployee";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/employee/details/:id",
    element: <EmployeeDetails />,
  },
  {
    path: "/employee/add",
    element: <AddEmployee />,
  },
]);

const App = () => {
  return (
    <div className="font-poppins">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
