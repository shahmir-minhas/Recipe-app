import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useUserContext();

  if (!isLogin()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
