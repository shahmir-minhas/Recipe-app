import React from "react";
import { Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import SignUp from "../Pages/Auth/SignUp";
import LogIn from "../Components/Auth/Login";
import { useUserContext } from "../Context/UserContext";

const Layout = (props) => {
  const { isLogin, logout, getUser } = useUserContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <React.Fragment>
      <nav className="nav-layout fs-5 d-flex justify-content-around align-items-center">
        <ul className="m-0 list-unstyled py-2 d-flex justify-content-end align-items-center">
          <li className=" mx-4">
            <Button>
              <NavLink to="/">Home</NavLink>
            </Button>
          </li>
          <li className="mx-4">
            <Button
              onClick={handleLogout}
              className={`${isLogin() ? "d-block" : "d-none"}`}
            >
              Logout
            </Button>
            <div className={`${isLogin() ? "d-none" : "d-block"}`}>
              <LogIn />
            </div>
          </li>
          <li className="mx-4">
            <div className={`${isLogin() ? "d-none" : "d-block"}`}>
              <SignUp />
            </div>
            <div className={`${isLogin() ? "d-block" : "d-none"}`}>
              <Link to="/dashboard">
                <Button className="w-100">Dashboard</Button>
              </Link>
            </div>
          </li>
        </ul>
        <div>
          <h4 className={`text-light  ${isLogin() ? "d-block" : "d-none"}`}>
            Welcome <span className="fs-3">{getUser()}!</span>
          </h4>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Layout;
