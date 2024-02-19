import { useState, createContext } from "react";

// Init user context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // user state/context
  const [user, setUser] = useState({
    // username will return null as wanted
    // if not logged in
    username: localStorage.getItem("username"),
    posts: [],
  });

  // Return a custom component to expose User state to the children components
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
