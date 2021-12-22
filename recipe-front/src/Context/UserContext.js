import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider(props) {
  const [user, setUser] = useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );
  const [scope, setScope] = useState([]);

  // update login info in session storage
  const login = (data) => {
    console.log("login,", data);
    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // clear session storage data
  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    window.location.reload();
  };

  // return current user data
  const getUser = () => {
    return user?.user ? user.user : null;
  };

  //return current user id
  const getUserId = () => {
    return user?.userId ? user.userId : null;
  };

  // login check
  const isLogin = () => {
    return user?.token ? true : false;
  };

  // return current user token
  const token = () => {
    return user?.token ? user?.token : null;
  };

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        getUser,
        isLogin,
        token,
        getUserId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
